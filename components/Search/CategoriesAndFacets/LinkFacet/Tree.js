import React from 'react';

import Branch from './Branch';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

// const MaxItems = 3;

const Tree = ({
  filter, first, sid, categoryQuery,
}) => {
  let queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sidParams = urlParams.get('sid');
  return (
    <ul className={`${styles['category-sub-list']} ${sidParams && sid ? sidParams.length <= sid.length ? styles['pl-20'] : styles['p-0'] : styles['pl-20']} ${styles['lne-ht2']}`}>
      {
        filter
          ?
          filter.children.map((category) => {
            queryString = queryString.replace(/facets=.*?\&/, '');
            if (queryString.indexOf('sid') !== -1) {
              queryString = queryString.replace(/sid=.*/, `sid=${sid ? `${sid},` : ''}${category.id}`);
            } else {
              queryString = `${queryString}&sid=${sid ? `${sid},` : ''}${category.id}`;
            }
            if (queryString.indexOf('categoryFacet') === -1) {
              queryString = `${queryString}&categoryFacet=true`;
            }
            if (queryString.indexOf('categoryTree') !== -1) {
              queryString = queryString.replace(/categoryTree=.*?\&/, '');
            }

            return (
              <Branch
                first={first}
                category={category}
                queryString={queryString}
                categoryQuery={categoryQuery}
                isFromCategoryTree={urlParams.has('categoryTree')}
                sidParams={sidParams && sidParams.split(',')}
                sid={`${first ? '' : `${sid},`}${category.id}`}
              />
            );
          })
          :
          null
      }
      {/* {
        this.state.isMoreButtonRequired ?
          <li onClick={this.toggleMore}>
            <a>{this.state.maxRows === filter.children.length ? '- show less' : ' + show more'}</a>
          </li>
          : null
      } */}
    </ul>
  );
};

export default Tree;
