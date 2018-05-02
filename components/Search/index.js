import React from 'react';
import { Grid } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';

import HeaderBar from '../HeaderBar/index';
import styles from './search.styl';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchResults from './SearchResults';

const Search = () => (
  <div>
    <HeaderBar />
    <Grid>
      <div className={styles['filter-panel']}>
        <NoSSR>
          <CategoriesAndFacets />
        </NoSSR>
      </div>
      <div className={styles['search-results']}>
        <SearchResults />
      </div>
    </Grid>
  </div>
);

export default Search;
