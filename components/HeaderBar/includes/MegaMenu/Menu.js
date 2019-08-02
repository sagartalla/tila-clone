import React, { Component } from 'react';
import Cookie from 'universal-cookie';
import _ from 'lodash';

import Leaves from './Leaves';
import SVGComponent from '../../../common/SVGComponet';
import { Link } from '../../../../routes';

import { languageDefinations } from '../../../../utils/lang';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../header_en.styl';
import styles_ar from '../../header_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


const { HEADER_PAGE } = languageDefinations();

const brandImages = {
  topBrands: {
    '#00C7B1': [
      {
        value: 'Samsung',
        link: `/${lang}/brand/samsung`,
      },
      {
        value: 'Apple',
        link: `/${lang}/brand/apple`,
      },
      {
        value: 'Sony',
        link: `/${lang}/brand/sony`,
      },
      {
        value: 'Philips',
        link: `/${lang}/brand/philips`,
      },
    ],
    '#EF6079': [
      {
        value: 'Pampers',
        link: `/${lang}/brand/Pampers`,
      },
      {
        value: 'Gucci',
        link: `/${lang}/brand/Gucci`,
      },
      {
        value: 'Diesel',
        link: `/${lang}/brand/diesel`,
      },
      {
        value: 'CalkinKlien',
        link: `/${lang}/brand/Calvin Klien`,
      },
    ],
    '#888B8D': [
      {
        value: 'Armani-exchange',
        link: `/${lang}/brand/Armani-exchange`,
      },
      {
        value: 'Nike',
        link: `/${lang}/brand/nike`,
      },
      {
        value: 'Levis',
        link: `/${lang}/brand/levis`,
      },
      {
        value: 'Fossil',
        link: `/${lang}brand/fossil`,
      },
    ],
  },
  trending: {
    '#00C7B1': [
      {
        value: 'Baseus',
        link: `/${lang}/brand/baseus`,
      },
      {
        value: 'JOYROOM',
        link: `/${lang}/brand/joyroom`,
      },
      {
        value: 'LDNIO',
        link: `/${lang}/brand/ldino`,
      },
      {
        value: 'Microsoft',
        link: `/${lang}/brand/microsoft`,
      },
    ],
    '#EF6079': [
      {
        value: 'BVLgari-1',
        link: `/${lang}/brand/bvlgari`,
      },
      {
        value: 'DavidOff',
        link: `/${lang}/brand/davidoff`,
      },
      {
        value: 'Prada',
        link: `/${lang}/brand/prada`,
      },
      {
        value: 'NYX',
        link: `/${lang}/brand/nyx`,
      },
    ],
    '#888B8D': [
      {
        value: 'RayBan',
        link: `/${lang}/brand/ray-ban`,
      },
      {
        value: 'Reebok',
        link: `/${lang}/brand/Reebok`,
      },
      {
        value: 'Tomford',
        link: `/${lang}/brand/Tomford`,
      },
      {
        value: 'Roberto Bianci',
        link: `/${lang}/brand/roberto bianci`,
      },
    ],
  },
};

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.viewAllMenu = this.viewAllMenu.bind(this);
    this.getTree = this.getTree.bind(this);
  }

  viewAllMenu() {
    this.setState({
      viewAllMenu: !this.state.viewAllMenu,
    });
  }

  getTree(childCategory, isFirst, depth = 0, itemColor) {
    ++depth;
    if (depth > 2) {
      return null;
    }
    return _.map(childCategory ? childCategory.childCategories : {}, childItem => (
      <li className={`${styles['megamenu-sub-list']} ${depth === 2 ? styles['pl-20'] : null}`} key={childItem.id} onClick={this.props.onLinkClick}>
          <span className={`${styles.flex}`}>
            {
              isFirst
              ?
                <SVGComponent clsName={`${styles.flex} ${styles['megamenu-icon']}`} src="icons/messages" />
              :
              null
            }
            <Link route={`/${language}/clp/${childItem.displayName.replace(/\//g, '').split(' ').join('-').toLowerCase()}?categoryTree=true&isListed=false&sid=${this.props.parentID},${childItem.id}`}>
              <a className={`${styles['level-1-item']} ${depth === 1 ? styles['fontW600'] : {}}`} style={{color: `${itemColor}`}}>{childItem.displayName}</a>
            </Link>
          </span>
          {
            childItem.childCategories
            ?
              <Leaves items={childItem.childCategories} parent={childItem} parentID={`${this.props.parentID},${childItem.id}`} />
            :
            null
          }
        </li>
    ));
  }


  render() {
    const { selectedCategoryTree, itemColor, parentID } = this.props;
    console.log('item color : ', itemColor);
    console.log('brandImages  : ', brandImages);
    return (
      <div
        className={`${styles['pt-20']} ${styles['megamenu-dropdown']} ${this.state.viewAllMenu ? {} : styles['max-height']}`}
      >
        <div className={styles['top-brands-trending-wrap']}>
          <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
            <li className={`${styles['megamenu-sub-list']}`}>
              <span className={`${styles.flex} ${styles['mb-10']}`}>
                <a className={`${styles['level-1-item']} ${styles.fontW600}`} >{HEADER_PAGE.TOP_BRANDS}</a>
              </span>
              <ul className={`${styles['megamenu-sub-child-list']}`}>
                {brandImages.topBrands[itemColor] &&
                brandImages.topBrands[itemColor].length > 0 && brandImages.topBrands[itemColor].map(image => (
                  <li className={`${styles.flex} ${styles['mb-10']} ${styles['brand-icon']}`} key={image.value}>
                    <a href={image.link}><img alt={image.value} src={`/static/img/bg-img/${image.value}.png`} className={`${styles['img-responsive']}`} /></a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
            <li className={`${styles['megamenu-sub-list']}`}>
              <span className={`${styles.flex} ${styles['mb-10']}`}>
                <a className={`${styles['level-1-item']} ${styles.fontW600}`}>{HEADER_PAGE.TRENDING}</a>
              </span>
              <ul className={`${styles['megamenu-sub-child-list']}`}>
                {brandImages.trending[itemColor] && brandImages.trending[itemColor].length > 0 &&
                brandImages.trending[itemColor].map(image => (
                  <li className={`${styles.flex} ${styles['mb-10']} ${styles['brand-icon']}`} key={image.value}>
                    <a href={image.link}><img alt={image.value} src={`/static/img/bg-img/${image.value}.png`} className={`${styles['img-responsive']}`} /></a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <ul className={styles['megamenu-sub-drop-down']}>
          {
            this.getTree(selectedCategoryTree, true, 0, itemColor)
          }
        </ul>
        {/* <div className={styles['view-all-menu']} onClick={this.viewAllMenu}>{this.state.viewAllMenu ? 'View Less' : 'View All'}</div> */}
      </div>
    );
  }
}


export default Menu;
