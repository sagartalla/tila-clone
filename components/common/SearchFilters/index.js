import React, {Fragment} from 'react';
import { languageDefinations } from '../../../utils/lang';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './searchFilter_en.styl';
import styles_ar from './searchFilter_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { SEARCH_PAGE } = languageDefinations();

const SearchFilters = () => (
  <Fragment>
    <div className={`${styles['flex-center']} ${styles['pr-25']} ${styles['ipad-pr-15']}  ${styles['fullfill-part']}`}>
      <label className={`${styles['switch']} ${styles['m-0']}`}>
        <input className={styles['switch-check']} type="checkbox" />
        <span className={`${styles['slider']}`}></span>
      </label>
      <span className={styles['pl-10']}>{SEARCH_PAGE.FULFILLED_BY_TILA}</span>
    </div>
    <div className={`${styles['flex-center']} ${styles['pr-25']} ${styles['ipad-pr-15']} ${styles['all-deals-part']}`}>
      <label className={`${styles['switch']} ${styles['m-0']}`}>
        <input className={styles['switch-check']} type="checkbox" />
        <span className={`${styles['slider']}`}></span>
      </label>
      <span className={styles['pl-10']}>{SEARCH_PAGE.ALL_DEALS}</span>
    </div>
  </Fragment>
);

export default SearchFilters;
