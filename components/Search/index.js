import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/search';

import HeaderBar from '../HeaderBar/index';
import FooterBar from '../Footer/index';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchDetailsBar from './SearchDetailsBar';
import SearchResults from './SearchResults';

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

  componentWillUnmount() {
    this.props.hideSearchBarFitlers();
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <Grid>
          <div onClick={onClickMenuHandle} className={`${styles['filter-panel']} ${styles['border-radius4']} ${styles['bg-white']}`}>
            <NoSSR>
              <CategoriesAndFacets />
            </NoSSR>
          </div>
          <div className={styles['search-results']}>
            <SearchDetailsBar />
            <SearchResults />
          </div>
        </Grid>
        <FooterBar />
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			hideSearchBarFitlers: actionCreators.hideSearchBarFitlers
		},
		dispatch,
	);
};

export default connect(null, mapDispatchToProps)(Search);
