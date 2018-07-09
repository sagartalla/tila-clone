import React from 'react';
import { Grid } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';

import HeaderBar from '../HeaderBar/index';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchDetailsBar from './SearchDetailsBar';
import SearchResults from './SearchResults';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

const Search = () => (
  <div>
    <HeaderBar />
    <Grid>
      <div className={`${styles['filter-panel']} ${styles['border-radius4']} ${styles['bg-white']}`}>
        <NoSSR>
          <CategoriesAndFacets />
        </NoSSR>
      </div>
      <div className={styles['search-results']}>
        <SearchDetailsBar />
        <SearchResults />
      </div>
    </Grid>
  </div>
);

export default Search;
