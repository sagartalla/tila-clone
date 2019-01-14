import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators,selectors } from '../../store/search';

import HeaderBar from '../HeaderBar/index';
import FooterBar from '../Footer/index';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchDetailsBar from './SearchDetailsBar';
import SearchResults from './SearchResults';
import { Router } from '../../routes';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

const onClickMenuHandle = (e) => {
  const target = e.currentTarget;
  setTimeout(() => {
    const top = target.offsetHeight - window.innerHeight + 10;
    console.log('top', top);
    if(top > 0) {
      target.style.top = `-${top}px`;
    } else {
      target.style.top = '65px';
    }
  },500);
}

class Search extends Component {
  constructor(props) {
    super(props)
    this.querySearch = this.querySearch.bind(this)
  }
  componentWillUnmount() {
    this.props.hideSearchBarFitlers();
  }
  querySearch(e) {
    let dataSearchQuery = e.target.dataset.querysearch;
    Router.pushRoute(`/srp?search=${dataSearchQuery}&${Object.entries(this.props.optionalParams).map(([key, val]) => `${key}=${val}`).join('&')}`);
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <HeaderBar />
        {
          this.props.spellCheckResp && <div><b>Did you Mean</b><span onClick={this.querySearch} data-querysearch={this.props.spellCheckResp[this.props.query.search]}>{this.props.spellCheckResp[this.props.query.search]}</span></div>
        }
        <Grid className={styles['pt-20']}>
          <Col md={2} onClick={onClickMenuHandle} className={`${styles['filter-panel']} ${styles['border-radius4']} ${styles['bg-white']} ${styles['p-0']}`}>
            <NoSSR>
              <CategoriesAndFacets />
            </NoSSR>
          </Col>
          <Col md={10} className={`${styles['search-results']} ${styles['p-0']}`}>
            <SearchDetailsBar />
            <SearchResults />
          </Col>
        </Grid>
        <FooterBar />
      </div>
    )
  }
};
const mapStateToProps = (store) => ({
  spellCheckResp:selectors.getSpellCheckResponse(store),
  optionalParams: selectors.optionParams(store)
});
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			hideSearchBarFitlers: actionCreators.hideSearchBarFitlers
		},
		dispatch,
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
