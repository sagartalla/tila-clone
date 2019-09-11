import React, { Component } from 'react';
import { Grid, Col, Modal } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decode, encode, addUrlProps, replaceInUrlQuery } from 'react-url-query';
import { actionCreators, selectors } from '../../store/search';
import HeaderBar from '../HeaderBar/index';
import FooterBar from '../Footer/index';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchDetailsBar from './SearchDetailsBar';
import SearchResults from './SearchResults';
import SelectBrands from '../Search/CategoriesAndFacets/CheckboxFacet/SelectBrand';
import Brand from './Brand';
import dynamic from 'next/dynamic';
import Cookie from 'universal-cookie';
import { Router } from '../../routes';
import { languageDefinations } from '../../utils/lang';
import AppliedFilters from './SearchDetailsBar/includes/AppliedFilters';
// import CompareWidget from '../common/CompareWidget';
import lang from '../../utils/language';

import LoadingBar from '../common/Loader/skeletonLoader';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './search_en.styl';
import styles_ar from './search_ar.styl';

const { SEARCH_PAGE } = languageDefinations();

const CompareWidget = dynamic(import('../common/CompareWidget'));

const cookies = new Cookie();

const language = cookies.get('language') || 'en';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const oldY = 0;
let tempSideBarTop = null;
let tempContainerTop = null;
let relativeTop = null;
let searchContainer = null;
let sidebarPosition = null;
let footerContainer = null;
// const onClickMenuHandle = (e) => {
//   const target = e.currentTarget;
//   setTimeout(() => {
//     const top = target.offsetHeight - window.innerHeight + 10;
//     if(top > 0) {
//       target.style.top = `-${top}px`;
//     } else {
//       target.style.top = '65px';
//     }
//   },500);
// }

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarPositionClass: '',
      containerStyle: {},
      showModal: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.upScroll = this.upScroll.bind(this);
    this.downScroll = this.downScroll.bind(this);
    this.showBrandsModal = this.showBrandsModal.bind(this);
    this.onFilterData = this.onFilterData.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.props.hideSearchBarFitlers();
    window.removeEventListener('scroll', this.handleScroll);
  }

  upScroll() {
    sidebarPosition = sidebarPosition || document.getElementById('sidebar-position');
    footerContainer = footerContainer || document.getElementById('footer-container');
    const wh = window.innerHeight;
    const { height: sideBarHeight, top: sideBarTop } = sidebarPosition.getBoundingClientRect();
    const { top: footerTop } = footerContainer.getBoundingClientRect();
    const sidebarBottom = sideBarTop + sideBarHeight;
    tempSideBarTop = null;
    tempContainerTop = null;
    if (relativeTop) {
      this.setState({
        containerStyle: {},
      });
      relativeTop = null;
    }
    if (parseInt(sidebarBottom) <= wh) {
      this.setState({
        sideBarPositionClass: wh >= parseInt(footerTop) ? 'footer-bottom' : (sidebarBottom <= wh) ? 'fixed-bottom' : '',
      });
    } else {
      this.setState({
        sideBarPositionClass: '',
      });
    }
  }

  downScroll() {
    searchContainer = searchContainer || document.getElementById('search-container');
    sidebarPosition = sidebarPosition || document.getElementById('sidebar-position');
    const { top: containerTop } = searchContainer.getBoundingClientRect();
    if (!tempSideBarTop) {
      tempSideBarTop = parseInt(sidebarPosition.getBoundingClientRect().top);
    }
    if (!tempContainerTop) {
      tempContainerTop = containerTop;
    }
    if (!relativeTop) {
      relativeTop = parseInt(Math.abs(tempSideBarTop - containerTop));
      this.setState({
        containerStyle: { top: relativeTop - 25 },
        sideBarPositionClass: 'relative',
      });
    }
    if (containerTop >= 0) {
      this.setState({
        containerStyle: {},
        sideBarPositionClass: '',
      });
      return;
    }
    if (parseInt(Math.abs(containerTop - tempContainerTop)) > (parseInt(Math.abs(tempSideBarTop)))) {
      this.setState({
        containerStyle: {},
        sideBarPositionClass: 'fixed-top',
      });
    }
  }

  showBrandsModal = (filter, filterItems, selectedItems) => () => {
    this.setState({
      showModal: true,
      filteredItems: filterItems,
      filter,
      selectedItems,
    });
  }

  selectedCheckbox = selectedValues => () => {
    this.setState({
      selectedItems: selectedValues || [],
    });
  }

  closePopup = () => {
    const { selectedItems } = this.state;
    this.setState({
      showModal: false,
    });
  }

  onFilterData(value) {
    const { filter } = this.state;
    const items = filter.children.filter(item => item.name.toLowerCase().indexOf(value) > -1);
    this.setState({
      filteredItems: items,
    });
  }

  querySearch = (e) => {
    let dataSearchQuery = e.currentTarget.dataset.querysearch;
    Router.pushRoute(`/${language}/search?q=${dataSearchQuery}&disableSpellCheck=true&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  handleScroll(e) {
    // sidebarPosition = sidebarPosition || document.getElementById('sidebar-position');
    // const {height: sideBarHeight} = sidebarPosition.getBoundingClientRect();
    // if(sideBarHeight < window.innerHeight - 123) {
    //   this.setState({
    //     containerStyle: {},
    //     sideBarPositionClass: 'sticky-top'
    //   })
    //   return;
    // }
    // if (oldY < window.scrollY) {
    //   this.upScroll(e);
    // } else {
    //   this.downScroll();
    // }
    // oldY = window.scrollY;
  }
  render() {
    const {
      query, optionalParams, isBrandPage, loaderProps, spellCheckResp, categoryQuery, results,
    } = this.props;
    const {
      sideBarPositionClass, containerStyle, showModal, filteredItems, selectedItems, filter,
    } = this.state;
    const { loadComponent, pathname } = loaderProps;
    const finalQuery = query || categoryQuery;    
    return (
      <div>
        <HeaderBar />
        {
          isBrandPage
          ?
            <Brand />
          :
           null
        }
        <div className={`${styles['header-filter']} ${styles['flex-center']} ${styles['p-10-0']}`}>
        <div className={spellCheckResp ? `${styles['flex-center']} ${styles['search-val-part']} ${styles['pl-15']} ${styles.width25}` : `${styles['flex-center']} ${styles['search-val-part']} ${styles['pl-15']} ${styles.width15}`}>
                  <h4 className={spellCheckResp ? `${styles['meta-info']} ${styles['mt-0']} ${styles['mb-0']} ${styles['pr-10']} ${styles['fs-14']} ${styles['fontW300']}`: `${styles['mt-0']} ${styles['mb-0']} ${styles['pr-10']} ${styles['fs-14']} ${styles['fontW300']}`}>
                    {
                      spellCheckResp ?
                      <a href="javascript: void(0)" onClick={this.querySearch} className={`${styles['black-color']} ${styles['fontW600']}`} data-querysearch={spellCheckResp[query]}>
                        <b className={`${styles['fs-16']} ${styles['search-ellipsis']}`}>{`${spellCheckResp[query]}`}</b>
                        <span className={`${styles['fs-10']} ${styles['textColor']}`}>({ SEARCH_PAGE.AUTO_CORRECTED }):</span>
                      </a>
                      :
                      <div className={`${styles['no-h1']} ${styles['fs-14']} ${styles['search-ellipsis']}`} title={finalQuery}>{finalQuery && this.capitalize(finalQuery.split('-').join(' '))}<span className={styles['fontW300']}>:</span></div>
                    }
                    <span className={`${styles['pl-5']} ${styles['fs-14']}`}>{ results.totalCount.toLocaleString('en') } { SEARCH_PAGE.SEARCH_ITEMS }</span>
                  </h4>
                  {
                    spellCheckResp &&
                    <h4 className={`${styles['pl-10']} ${styles['fs-14']} ${styles['sple-check-prt']}`}>
                      <span>{ SEARCH_PAGE.YOUR_ENTERED }: </span>
                      <a href="javascript: void(0)" onClick={this.querySearch} className={`${styles['fontW600']} ${styles['lgt-blue']}`} data-querysearch={finalQuery && finalQuery.split('-').join(' ')}>
                        {finalQuery && this.capitalize(finalQuery.split('-').join(' '))}
                      </a>
                    </h4>
                  }
                </div>
        <div className={spellCheckResp ? `${styles['search-results']} ${styles['applied-filters-padding']} ${styles.width75} ${styles.relative}` : `${styles['search-results']} ${styles['applied-filters-padding']} ${styles.width85} ${styles.relative}`}>
         <NoSSR>
                <AppliedFilters />
              </NoSSR>
              </div>
              </div>
        <LoadingBar loadComponent={loadComponent} pathname={pathname} >
          <Grid id="search-container" className={`${styles['pt-60']} ${styles.relative} ${styles['search-container-wrap']}`}>
            <Col md={2} id="sidebar-position" className={`${styles['filter-panel']} ${styles['float-l']} ${styles['border-radius4']} ${styles['bg-white']} ${styles['p-0']} ${styles[sideBarPositionClass]}`} style={containerStyle}>
              <NoSSR>
                <CategoriesAndFacets search={query} showPopup={showModal} showBrandsModal={this.showBrandsModal} selectedCheckbox={this.selectedCheckbox} clearSelectedItem={this.clearSelectedItem} />
              </NoSSR>

            </Col>
            <div>
              <Modal
                show={showModal}
                onHide={this.closePopup}
                dialogClassName="custom-modal"
                className="facets-brands-modal"
                backdropStyle={{ opacity: 0 }}
              >
                <div
                  className={`${styles.absolute} ${styles['bg-white']} ${styles.brandsmodal} `}
                >
                {showModal && <SelectBrands showPopup={showModal} closePopup={this.closePopup} filteredItems={filteredItems} selectedItems={selectedItems} onFilterData={this.onFilterData} filter={filter} />}
                </div>
              </Modal>
            </div>
            <Col md={10} className={`${styles['search-results']} ${styles['fl-rt']} ${styles['pr-0']}`}>
              <SearchDetailsBar optionalParams={optionalParams} />
              <SearchResults search={query.q} />
            </Col>
          </Grid>
          <CompareWidget />
          <FooterBar />
        </LoadingBar>        
      </div>
    );
  }
}

const mapStateToProps = store => ({
  spellCheckResp: selectors.getSpellCheckResponse(store),
  optionalParams: selectors.optionParams(store),
  getFacetfilters: selectors.getFacetfilters(store),
  spellCheckResp:selectors.getSpellCheckResponse(store),
  categoryQuery:selectors.getCategorySearchQuery(store),  
  query: selectors.getQuery(store),
  results: selectors.getSearchResutls(store), 
  appliedFilters: selectors.getAppliedFitlers(store),   
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    hideSearchBarFitlers: actionCreators.hideSearchBarFitlers,
    getSearchResults: actionCreators.getSearchResults,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

