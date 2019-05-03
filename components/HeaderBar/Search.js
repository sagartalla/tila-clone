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

import CustomToggle from './CustomToggle';

import styles_en from './header_en.styl';
import styles_ar from './header_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;
const { SEARCH_PAGE } = languageDefinations();

const urlPropsQueryConfig = {
  searchText: { type: UrlQueryParamTypes.string, queryParam: 'search' },
};

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Search extends Component {
  constructor(props) {
    super(props);
    const {
      query, isCategoryTree, choosenCategoryName, searchText,
    } = props;
    let finalQuery = query || (isCategoryTree ? choosenCategoryName : '');
    finalQuery = finalQuery.split('-').join(' ');
    this.state = {
      suggestions: [],
      query: finalQuery,
      openImagesearch: false,
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
      toast.error(SEARCH_PAGE.MAXIMUN_TEXT_EXCEEDED);
      return;
    }
    this.setState({
      query: e.target.value.replace(/^\s+/g, ''),
      searchInput: true,
    }, () => {
      this.fetchSuggestions();
    });
  }

  setSearchText(e) {
    this.setState({
      query: e.target.textContent,
      suggestions: [],
    }, () => {
      this.submitQuery(e);
    });
  }

  submitQuery(e) {
    e.preventDefault();
    if (!this.state.query) return false;
    // const { isCategoryTree } = this.props;
    digitalData.page.pageInfo.onsiteSearchTerm = this.state.query;

    // const flushFilters = true;

    this.fireCustomEventClick();

    this.setState({
      searchInput: false,
    });

    Router.pushRoute(`/${country}/${language}/srp?search=${this.state.query}&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
  }

  imageSearch() {
    this.setState({ openImagesearch: true });
  }

  handleHide() {
    this.setState({ openImagesearch: false });
  }

  handleUploadImage(file) {
    this.props.fetchImageSearchData(file);
    this.setState({
      openImagesearch: false,
    }, () => Router.pushRoute(`/${country}/${language}/srp`));
  }

  fetchSuggestions() {
    this.props.fetchSuggestions({ key: this.state.query.trim() });
  }

  fireCustomEventClick = () => {
    const event = new CustomEvent('event-internalSearch-click');
    document.dispatchEvent(event);
  }

  render() {
    const {
      suggestions, openImagesearch, query,
    } = this.state;
    return (
      <div className={styles['search-wrapper']}>
        <form onSubmit={this.submitQuery}>

          <Dropdown id="search-toggle" className={`${styles['cart-inn']} ${styles.width100}`}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <input
                className={styles['search-input']}
                placeholder={SEARCH_PAGE.SEARCH_YOUR_FAV_ITEM}
                onChange={this.onChangeSearchInput}
                value={query}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles.width100} ${styles['p-0']} ${styles['m-0']}`}>
              {suggestions.length > 0 &&
                suggestions.map((s, index) => (
                  <MenuItem className={styles['search-suggestion']} onClick={this.setSearchText} eventKey={index + 1}>
                    <a className={`${styles['black-color']}`}>
                      <span>{s.data_edgengram}</span>
                    </a>
                  </MenuItem>))
              }
            </Dropdown.Menu>
          </Dropdown>

          <div className={`${styles['search-btn']} ${styles['r-40']}`} onClick={this.imageSearch}>
           <SVGComponent clsName={`${styles['searching-icon']}`} src="icons/camera"/>
          </div>
          <button type="submit" className={styles['search-btn']}><SVGComponent clsName={`${styles['searching-icon']}`} src="icons/search/search-white-icon" /></button>
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
  searchText: PropTypes.string.isRequired,
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
