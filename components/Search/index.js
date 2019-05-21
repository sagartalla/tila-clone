import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookie from 'universal-cookie';
import { languageDefinations } from '../../utils/lang';
import { actionCreators, selectors } from '../../store/search';
import HeaderBar from '../HeaderBar/index';
import FooterBar from '../Footer/index';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchDetailsBar from './SearchDetailsBar';
import SearchResults from './SearchResults';
import CompareWidget from '../common/CompareWidget';
import { Router } from '../../routes';


import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './search_en.styl';
import styles_ar from './search_ar.styl';

const { SEARCH_PAGE } = languageDefinations();

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let oldY = 0;
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
      containerStyle: {}
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.upScroll = this.upScroll.bind(this);
    this.downScroll = this.downScroll.bind(this);
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
    if(relativeTop) {
      this.setState({
        containerStyle: {}
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
    const {top: containerTop} = searchContainer.getBoundingClientRect();
    if(!tempSideBarTop) {
      tempSideBarTop = parseInt(sidebarPosition.getBoundingClientRect().top);
    }
    if(!tempContainerTop) {
      tempContainerTop = containerTop;
    }
    if (!relativeTop) {
      relativeTop = parseInt(Math.abs(tempSideBarTop - containerTop));
      this.setState({
        containerStyle: {top: relativeTop - 25},
        sideBarPositionClass: 'relative'
      });
    }
    if(containerTop >= 0) {
      this.setState({
        containerStyle: {},
        sideBarPositionClass: ''
      });
      return;
    }
    if (parseInt(Math.abs(containerTop - tempContainerTop)) > (parseInt(Math.abs(tempSideBarTop)))) {
      this.setState({
        containerStyle: {},
        sideBarPositionClass: 'fixed-top'
      });
    }
  }

  handleScroll(e) {
    sidebarPosition = sidebarPosition || document.getElementById('sidebar-position');
    const {height: sideBarHeight} = sidebarPosition.getBoundingClientRect();
    if(sideBarHeight < window.innerHeight - 123) {
      this.setState({
        containerStyle: {},
        sideBarPositionClass: 'sticky-top'
      })
      return;
    }
    if (oldY < window.scrollY) {
      this.upScroll(e);
    } else {
      this.downScroll();
    }
    oldY = window.scrollY;
  }
  render() {
    const { query, optionalParams } = this.props;
    const { sideBarPositionClass, containerStyle } = this.state;
    return (
      <div>
        <HeaderBar />
        <Grid id="search-container" className={`${styles['pt-20']} ${styles.relative}`}>
          <Col md={2} id="sidebar-position" className={`${styles['filter-panel']} ${styles['float-l']} ${styles['border-radius4']} ${styles['bg-white']} ${styles['p-0']} ${styles[sideBarPositionClass]}`} style={containerStyle}>
            <NoSSR>
              <CategoriesAndFacets />
            </NoSSR>
          </Col>
          <Col md={10} className={`${styles['search-results']} ${styles['fl-rt']}`}>
            <SearchDetailsBar optionalParams={optionalParams} />
            <SearchResults search={query.search} />
          </Col>
        </Grid>
        <CompareWidget />
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  spellCheckResp: selectors.getSpellCheckResponse(store),
  optionalParams: selectors.optionParams(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    hideSearchBarFitlers: actionCreators.hideSearchBarFitlers,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
