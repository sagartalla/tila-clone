import React, {Fragment} from 'react';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';
const styles = mergeCss('components/common/SearchFilters/searchFitler');
const { SEARCH_PAGE } = languageDefinations();

const SearchFilters = () => (
  <Fragment>
    <div className={`${styles['flex-center']} ${styles['pr-25']} ${styles['fullfill-part']}`}>
      <label className={`${styles['switch']} ${styles['m-0']}`}>
        <input className={styles['switch-check']} type="checkbox" />
        <span className={`${styles['slider']}`}></span>
      </label>
      <span className={styles['pl-10']}>{SEARCH_PAGE.FULFILLED_BY_TILA}</span>
    </div>
    <div className={`${styles['flex-center']} ${styles['pr-25']} ${styles['all-deals-part']}`}>
      <label className={`${styles['switch']} ${styles['m-0']}`}>
        <input className={styles['switch-check']} type="checkbox" />
        <span className={`${styles['slider']}`}></span>
      </label>
      <span className={styles['pl-10']}>{SEARCH_PAGE.ALL_DEALS}</span>
    </div>
  </Fragment>
);

export default SearchFilters;
