import React from 'react';
import Cookies from 'universal-cookie';

import SVGComponent from '../../common/SVGComponet';
import { Link } from '../../../routes';

import lang from '../../../utils/language';

import { languageDefinations } from '../../../utils/lang';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './sidebar_en.styl';
import styles_ar from './sidebar_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const { CAM } = languageDefinations();

const List = props => props.data.map((val, id) => {
  const { query } = props;
  const { tabDetails } = query;
  const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
  return (
  <div className={styles['list-container']} key={id.toString()}>
    {val.data.map((itemVal, itemIndex) => {
      return (
        <Link route={`/${country}/${language}${itemVal.href}`} key={itemVal.display}>
          {/* TODO can be next client side routes */ }
          <a style={{display:'block'}}>
          <div className={`${`/${country}/${language}${itemVal.href}` === `/${country}/${language}/cam/${tab}` ? styles['active'] : {}} ${styles['list-items-container']} ${styles['light-gry-clr']} ${styles['flex-center']}`} key={itemIndex.toString()}>
            <div className={`${styles['list-item-left']} ${styles['pr-10']}`}>
              <SVGComponent src={itemVal.icon} />
            </div>
            <div className={`${styles['list-items']} ${styles['fs-14']}`}>{CAM[itemVal.display]}</div>
            {/* {
              itemVal.count
              ?
              <div className={`${styles['list-common']} ${styles['flex']} ${styles['justify-center']} ${styles['align-center']}`}>
                <div className={`${styles['count-container']} ${styles['fs-12']}`}>{itemVal.count}</div>
              </div>
              :
            null
            } */}

          </div>
          </a>
        </Link>
        );
      })}
  </div>
)});

export default List;
