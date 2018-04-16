import { Grid } from 'react-bootstrap';
import HeaderBar from '../HeaderBar/index';
import styles from './search.styl';
import CategoriesAndFacets from './CategoriesAndFacets';
import SearchResults from "./SearchResults";

const Search = () => (
  <div>
    <HeaderBar />
    <Grid>
      <div className={styles['filter-panel']}>
        <CategoriesAndFacets />
      </div>
      <div className={styles['search-results']}>
        <SearchResults />
      </div>
    </Grid>
  </div>
)

export default Search;