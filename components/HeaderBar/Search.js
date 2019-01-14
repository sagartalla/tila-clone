import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUrlProps, UrlQueryParamTypes, pushInUrlQuery } from 'react-url-query';
import _ from 'lodash';
import { actionCreators, selectors } from '../../store/search';
import { Router } from '../../routes';
import SVGComponent from '../common/SVGComponet';

import { mergeCss } from '../../utils/cssUtil';
import {Modal} from 'react-bootstrap';
import DragDropUpload from '../common/DragDropUpload';
const styles = mergeCss('components/HeaderBar/header');

const urlPropsQueryConfig = {
  searchText: { type: UrlQueryParamTypes.string, queryParam: 'search', }
};

class Search extends Component {

  constructor(props) {
    super(props);
    const { query, isCategoryTree, choosenCategoryName,searchText } = props;
    this.state = {
      query: query ? query : isCategoryTree ? choosenCategoryName : '',
      openImagesearch: false
    };
    this.submitQuery = this.submitQuery.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.imageSearch = this.imageSearch.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this)
    this.fetchSuggestions = _.debounce(this.fetchSuggestions.bind(this), 300);
  }

  submitQuery(e) {
    e.preventDefault();
    // const { isCategoryTree } = this.props;
    digitalData.page.pageInfo['onsiteSearchTerm'] = this.state.query
    this.fireCustomEventClick(); 
    const flushFilters = true;
    this.setState({
      searchInput: false
    });
    Router.pushRoute(`/srp?search=${this.state.query}&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
  }
  imageSearch() {
    this.setState({openImagesearch:true})
  }
  handleHide() {
    this.setState({openImagesearch:false})
  }
  handleUploadImage(file) {
    this.props.fetchImageSearchData(file)
    Router.pushRoute(`/srp`);
  }
  onChangeSearchInput(e) {       
    
    this.setState({
      query: e.target.value,
      searchInput: true
    }, () => {
      this.fetchSuggestions();
    });
  }

  fetchSuggestions(e) {
    this.props.fetchSuggestions({key: this.state.query});
  }

  fireCustomEventClick() {
    var event = new CustomEvent('event-internalSearch-click');
    document.dispatchEvent(event);
  }
  componentWillReceiveProps(nextProps) { 
    const { isCategoryTree, choosenCategoryName, query: queryProp } = nextProps;
    const { query, searchInput } = this.state;
    this.setState({
      query: searchInput ? query : isCategoryTree ? choosenCategoryName : queryProp,
      //query: isCategoryTree ? choosenCategoryName : searchInput ? query : queryProp,
      suggestions: nextProps.suggestions
    });
  }

  setSearchText(e) {
    this.setState({
      query: e.target.textContent,
      suggestions: null
    }, () => {
      this.submitQuery(e);
    });
  }

  render() {
    const { suggestions,openImagesearch } = this.state;
    return (
      <div className={styles['search-wrapper']}>
        <form onSubmit={this.submitQuery}>
          <input
            className={styles['search-input']}
            placeholder="Search your fav item..."
            onChange={this.onChangeSearchInput}
            value={this.state.query}
           />
          <div onClick={this.imageSearch}>IMG</div>
          <button type="submit" className={styles['search-btn']}><SVGComponent clsName={`${styles['searching-icon']}`} src="icons/search/search-white-icon" /></button>
          <ul className={styles['search-suggestions']}>
            {
              suggestions
                ?
                suggestions.map((s) => {
                  return <li onClick={this.setSearchText} key={s.data_edgengram}>{s.data_edgengram}</li>
                })
                :
                null
            }
          </ul>
        </form>
        
        
          <Modal
            {...this.props}
            show={openImagesearch}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
        >
         <Modal.Body>
           <DragDropUpload
            uploadCallback = {this.handleUploadImage}
           />
         </Modal.Body>
        </Modal>
        
        
      </div>
    )
  }
}

Search.propTypes = {
  getSearchResults: PropTypes.func,
  searchText: PropTypes.string,
  onChangeSearchText: PropTypes.func,
}


const mapStateToProps = (store) => ({
    query: selectors.getQuery(store),
    isCategoryTree: selectors.getIsCategoryTree(store),
    choosenCategoryName: selectors.getChoosenCategoryName(store),
    optionalParams: selectors.optionParams(store),
    suggestions: selectors.getSuggestions(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults: actionCreators.getSearchResults,
      fetchSuggestions: actionCreators.fetchSuggestions,
      fetchImageSearchData:actionCreators.fetchImageSearchData
    },
    dispatch,
  );

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Search));
