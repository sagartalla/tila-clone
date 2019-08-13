import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
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
// import CompareWidget from '../common/CompareWidget';
import lang from '../../utils/language';

import LoadingBar from '../common/Loader/skeletonLoader';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './search_en.styl';
import styles_ar from './search_ar.styl';

const CompareWidget = dynamic(import('../common/CompareWidget'));

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
      selectedVal: null,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.upScroll = this.upScroll.bind(this);
    this.downScroll = this.downScroll.bind(this);
    this.showBrandsModal = this.showBrandsModal.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
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
      selectedVal: null,
      filter,
      selectedItems,
    });
  }

  selectedCheckbox = (selectedValues) => () => {
    this.setState({
      selectedItems: selectedValues || [],
    });
  }

  closePopup = () => {
    this.setState({
      showModal: false,
    });
  }

  applyFilters = () => {
    debugger;
    const { submitQuery } = this.state;
    this.submitQuery(submitQuery);
    this.closePopup();
  }

  submitQuery(params) {
    this.props.getSearchResults(this.props.getFacetfilters(params));
  }

  searchBrands = (value) => () => {
    this.setState({
      selectedVal: value,
    });
  }
  
  onChangeFilter = (value) => (e) => {
    const { filter } = this.state;
    console.log(value);
    debugger;
      const newSelectedItem = [...this.state.selectedItems];
      if (e.target.checked) {
        newSelectedItem.push(value.name);
      } else {
        newSelectedItem.splice(newSelectedItem.indexOf(value.name), 1);
      }
      this.setState({
        selectedItems: newSelectedItem,
      });
      this.onChangeHandle(value, e, filter);
  }

  onChangeHandle = (value, e, filter) => () => {
    debugger;
    const { facets } = this.props;
      debugger;
      const params = facets;
      params[filter.attributeName] = params[filter.attributeName] || [];
      digitalData.filter.leftnavfilters = `${filter.attributeName}:${value.name}`;
      if (e.target.checked) {
        debugger;
        params[filter.attributeName].push(value.name);
      } else {
        params[filter.attributeName] = params[filter.attributeName].filter((item) => item !== value.name)
        if (!params[filter.attributeName].length) { delete params[filter.attributeName]; }
      }
      this.setState({
        submitQuery: params,
      });
      this.props.onChangeFacets(params);
    };


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
      query, optionalParams, isBrandPage, loaderProps,
    } = this.props;
    const { sideBarPositionClass, containerStyle, showModal, filteredItems, selectedItems, selectedVal } = this.state;
    const { loadComponent, pathname } = loaderProps;

    console.log('submitQuery', this.state.submitQuery);

    return (
      <div>
        <HeaderBar />
        {
          isBrandPage
          ?
            <Grid className={`${styles['pt-20']} ${styles.relative}`}>
              <Brand />
            </Grid>
          :
           null
        }
        <LoadingBar loadComponent={loadComponent} pathname={pathname} >
          <Grid id="search-container" className={`${styles['pt-20']} ${styles.relative} ${styles['search-container-wrap']}`}>
            <Col md={2} id="sidebar-position" className={`${styles['filter-panel']} ${styles['float-l']} ${styles['border-radius4']} ${styles['bg-white']} ${styles['p-0']} ${styles[sideBarPositionClass]}`} style={containerStyle}>
              <NoSSR>
                <CategoriesAndFacets search={query} showPopup={showModal} showBrandsModal={this.showBrandsModal} selectedCheckbox={this.selectedCheckbox} selectedVal={selectedVal} clearSelectedItem={this.clearSelectedItem} />
              </NoSSR>
            </Col>
            <div className={`${styles.absolute} ${styles['bg-white']} ${styles.brandsmodal} `}>
              {showModal && <SelectBrands showPopup={showModal} closePopup={this.closePopup} filteredItems={filteredItems} selectedItems={selectedItems} onFilterData={this.searchBrands} onChangeFilter={this.onChangeFilter} applyFilters={this.applyFilters} />}
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
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    hideSearchBarFitlers: actionCreators.hideSearchBarFitlers,
    getSearchResults: actionCreators.getSearchResults,  
  },
  dispatch,
);

function mapUrlToProps(url, props) {
  return {
    facets: decode(d => JSON.parse(d || '{}'), url.facets),
  };
}

const mapUrlChangeHandlersToProps = props => ({
  onChangeFacets: value => replaceInUrlQuery('facets', encode((e) => JSON.stringify(e || {}), value)),
});

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(Search));

