import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Dropdown, MenuItem } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import _ from 'lodash';

import { languageDefinations } from '../../utils/lang/';
import { actionCreators, selectors } from '../../store/search';
import { Router } from '../../routes';
import SVGComponent from '../common/SVGComponet';
import DragDropUpload from '../common/DragDropUpload';
import lang from '../../utils/language';
import SearchContext from '../helpers/context/search';
import ToastContent from '../common/ToastContent';
import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';



const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { SEARCH_PAGE } = languageDefinations();

const urlPropsQueryConfig = {
  searchText: { type: UrlQueryParamTypes.string, queryParam: 'search' },
};

const cookies = new Cookie();

const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';

class Search extends Component {
  constructor(props) {
    super(props);
    const {
      query, isCategoryTree, choosenCategoryName,
    } = props;
    let finalQuery = query || (isCategoryTree ? choosenCategoryName : '');
    finalQuery = finalQuery.split('-').join(' ');
    this.state = {
      suggestions: [],
      query: finalQuery,
      openImagesearch: false,
      searchPosition: '',
    };
    this.submitQuery = this.submitQuery.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.imageSearch = this.imageSearch.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.fetchSuggestions = _.debounce(this.fetchSuggestions.bind(this), 300);
  }

  componentWillReceiveProps(nextProps) {
    const { isCategoryTree, choosenCategoryName, query: queryProp } = nextProps;
    const { query, searchInput } = this.state;
    if (this.props.query !== nextProps.query) {
      this.setState({
        searchInput: false,
      });
    }
    const finalQuery = searchInput ? query : isCategoryTree ? choosenCategoryName : queryProp;
    this.setState({
      query: finalQuery ? finalQuery.split('-').join(' ') : '',
      // query: isCategoryTree ? choosenCategoryName : searchInput ? query : queryProp,
      suggestions: nextProps.suggestions || [],
    });
  }

  onChangeSearchInput(e) {
    const numberOfCharacters = /^[\s\S]{0,200}$/;
    if (!numberOfCharacters.test(e.target.value)) {
      toast(
        <ToastContent
          msg={SEARCH_PAGE.MAXIMUN_TEXT_EXCEEDED}
          msgType='error'
        />
      )
      return;
    }
    this.setState({
      query: e.target.value.replace(/^\s+/g, ''),
      searchInput: true,
      autoSearchValue: '',
    }, () => {
      this.fetchSuggestions();
    });
  }

  setSelectionRange = () => {
    const { query } = this.state;
    const input = document.getElementById('text-box');
    input.focus();
    input.setSelectionRange(query && query.length, query && query.length);
  }
  setSearchText(e) {
    const searchPosition = e.currentTarget.getAttribute('index');
    this.setState({
      query: e.target.textContent,
      suggestions: [],
      searchPosition,
    }, () => {
      this.submitQuery(e);
    });
  }


  handleSearch = (e) => {
    const { suggestions, query } = this.props;
    if (e.keyCode === 9 || e.keyCode === 39) {
      this.setState({
        query: suggestions && suggestions.length > 0 ? suggestions[0].data_edgengram : query,
      });
    }
  }
  mouseOver = (e) => {
    const searchValue = e.target.getAttribute('data');
    this.setState({
      query: searchValue,
      autoSearchValue: searchValue,
    });
  }

  submitQuery(e) {
    const { searchPosition } = this.state;
    e && e.preventDefault();
    if (!this.state.query) return false;
    // const { isCategoryTree } = this.props;
    digitalData.page.pageInfo.onsiteSearchTerm = this.state.query;

    // const flushFilters = true;

    this.fireCustomEventClick();

    // this.setState({
    //   searchInput: false,
    // });
    window.scrollTo(0, 0);
    Router.pushRoute(`/${language}/search?q=${encodeURIComponent(this.state.query.trim())}&qs=${searchPosition ? true : false}&POS=${searchPosition ? searchPosition : null}&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
  }

  imageSearch() {
    this.setState({ openImagesearch: true });
  }

  handleHide() {
    this.setState({ openImagesearch: false });
  }

  handleUploadImage(file) {
    this.props.fetchImageSearchData(file).then(() => {
      this.submitQuery();
    });
    this.setState({
      openImagesearch: false,
    });
  }


  fetchSuggestions() {
    this.props.fetchSuggestions({ key: this.state.query && this.state.query.trim() });
  }

  fireCustomEventClick = () => {
    const event = new CustomEvent('event-internalSearch-click');
    document.dispatchEvent(event);
  }

  render() {
    const {
      suggestions, openImagesearch, query, autoSearchValue, searchInput,
    } = this.state;
    return (
      <div className={styles['search-wrapper']}>
        <form onSubmit={this.submitQuery}>
          <Dropdown id="search-toggle" className={`${styles['cart-inn']} ${styles.width93}`}>
            <Dropdown.Toggle id="dropdown-custom-components">
              <div className={styles.overlap} tabIndex="0" onFocus={this.setSelectionRange}>
                {(query && query.length) < 2 ? '' : (autoSearchValue || (suggestions.length > 0 && query.toLowerCase() === suggestions[0].data_edgengram.slice(0, query.length).toLowerCase() ? (query.concat(suggestions[0].data_edgengram.substring(query.length))) : ''))}
              </div>
              <SearchContext.Consumer>
                {context => (
                  <input
                    className={styles['search-input']}
                    id="text-box"
                    autoComplete="off"
                    placeholder={SEARCH_PAGE.SEARCH_YOUR_FAV_ITEM}
                    onChange={this.onChangeSearchInput}
                    value={(context === 'search') || searchInput ? query : ''}
                    onKeyDown={this.handleSearch}
                    maxLength={80}
                  />
              )}
              </SearchContext.Consumer>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.width100} ${styles['p-0']} ${styles['m-0']} ${(suggestions && suggestions.length > 0) ? styles['main-search-drp'] : null}`}>
              {suggestions.length > 0 &&
                suggestions.map((s, index) => (
                  <MenuItem key={index} className={styles['search-suggestion']} onClick={this.setSearchText} data={s.data_edgengram} onFocus={this.mouseOver} index={index} eventKey={index + 1}>
                    <a className={`${styles['black-color']}`}>
                      <span>{s.data_edgengram}</span>
                    </a>
                  </MenuItem>))
              }
            </Dropdown.Menu>
          </Dropdown>

          <div className={`${styles['search-btn-img']} ${styles['r-40']}`} onClick={this.imageSearch}>
            <SVGComponent clsName={`${styles['searching-icon']}`} src="icons/camera" />
          </div>
          <button type="submit" className={styles['search-btn']}><SVGComponent clsName={`${styles['searching-icon']}`} src="icons/search/header-search-icon" /></button>
        </form>
        <Modal
          {...this.props}
          show={openImagesearch}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Body>
            <DragDropUpload
              uploadCallback={this.handleUploadImage}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Search.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
  onChangeSearchText: PropTypes.func.isRequired,
};


const mapStateToProps = store => ({
  query: selectors.getQuery(store),
  isCategoryTree: selectors.getIsCategoryTree(store),
  choosenCategoryName: selectors.getChoosenCategoryName(store),
  optionalParams: selectors.optionParams(store),
  suggestions: selectors.getSuggestions(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
      fetchSuggestions: actionCreators.fetchSuggestions,
      fetchImageSearchData: actionCreators.fetchImageSearchData,
    },
    dispatch,
  );

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Search));
