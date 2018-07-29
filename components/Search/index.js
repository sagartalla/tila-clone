import React from 'react';
import { Grid } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';

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

const Search = () => (
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
);

export default Search;
