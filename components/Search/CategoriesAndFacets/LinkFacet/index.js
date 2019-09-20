import React from 'react';
import { Panel } from 'react-bootstrap';

import SVGCompoent from '../../../common/SVGComponet';
import { Router } from '../../../../routes';

import Tree from './Tree';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const LinkFacet = ({ filter, categoryQuery }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const sidParams = urlParams.get('sid');
  
  const showAll = () => {
    urlParams.delete('sid');
    urlParams.delete('categoryFacet');
    Router.pushRoute(`/${lang}/search?${urlParams.toString()}`);
  };

  return (
    <li className={`${styles['category-list']} `}>
      <Panel.Heading className={styles['category-list-head']}>
        <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles.fontW600} ${styles['flx-spacebw-alignc']}`}>
          <span className={styles['flt-lbl']}>{filter.name}</span>
          <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body collapsible className={`${styles['border-b']}`}>
        {sidParams &&
          <div onClick={showAll} className={`${styles.pointer} ${styles['pl-20']} ${styles['fs-12']}`}>
            <span>{'> '}</span>
            <span>All Categories</span>
          </div>
        }
        {
          filter
            ?
              <Tree filter={filter} first categoryQuery={categoryQuery} />
            :
            null
        }
      </Panel.Body>
    </li>
  );
};

export default LinkFacet;
