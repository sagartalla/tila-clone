import React, { Component } from 'react';
import { Panel, Heading, Body, Title } from 'react-bootstrap';

import { Link } from '../../../../routes';
import SVGCompoent from '../../../common/SVGComponet';


import Tree from './Tree';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class LinkFacet extends Component {

  render() {
    const { filter } = this.props;
    return (
      <li className={`${styles['category-list']} `}>
        <Panel.Heading className={styles['category-list-head']}>
          <Panel.Title toggle className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
            {filter.name}
            <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible className={`${styles['border-b']}`}>
          {
            filter
              ?
              <Tree filter={filter} first={true} />
              :
              null
          }
        </Panel.Body>
      </li>
    );
  }
}

export default LinkFacet;
