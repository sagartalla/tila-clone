import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/search';
import HeaderBar from '../HeaderBar/index';
import FooterBar from '../Footer/index';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchDetailsBar from './SearchDetailsBar';
import SearchResults from './SearchResults';
import CompareWidget from '../common/CompareWidget';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './search_en.styl';
import styles_ar from './search_ar.styl';


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

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
  componentWillUnmount() {
    this.props.hideSearchBarFitlers();
  }

  render() {
    const { query, optionalParams } = this.props;
    return (
      <div>
        <HeaderBar />
        <Grid className={styles['pt-20']}>
          <Col md={2} className={`${styles['filter-panel']} ${styles['float-l']} ${styles['border-radius4']} ${styles['bg-white']} ${styles['p-0']}`}>
            <NoSSR>
              <CategoriesAndFacets />
            </NoSSR>
          </Col>
          <Col md={10} className={`${styles['search-results']}`}>
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
