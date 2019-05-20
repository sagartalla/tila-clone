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

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { HEADER_PAGE } = languageDefinations()

const brandImages = {
  topBrands: {
    electronics: ['samsung-img', 'apple', 'sony', 'philips'],
    'home-living': ['samsung-img', 'apple', 'sony', 'philips'],
    fashion: ['christy', 'tefal', 'adidas', 'lacoste'],
  },
  trending: {
    electronics: ['samsung-img', 'apple', 'sony', 'philips'],
    'home-living': ['samsung-img', 'apple', 'sony', 'philips'],
    fashion: ['river_island', 'debenhams', 'sony', 'philips'],
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
    })
  }

  getTree(childCategory, isFirst, depth=0) {
    ++depth;
    if(depth > 2) {
      return null;
    }
    return _.map(childCategory ? childCategory.childCategories : {}, (childItem) => {
      return (
        <li className={`${styles['megamenu-sub-list']} ${depth === 2 ? styles['pl-20'] : null}`} key={childItem.id} onClick={this.props.onLinkClick}>
          <span className={`${styles['flex']}`}>
            {
              isFirst
              ?
              <SVGComponent clsName={`${styles['flex']} ${styles['megamenu-icon']}`} src="icons/messages"/>
              :
              null
            }
            <Link route={`/${country}/${language}/srp/${childItem.displayName.split(' ').join('-').toLowerCase()}?categoryTree=true&isListed=false&sid=${this.props.parentID},${childItem.id}`}>
              <a className={`${styles['level-1-item']} ${depth === 1 ? styles['fontW600'] : {}}`}>{childItem.displayName}</a>
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
      )
    })
  }


  render() {
    const { selectedCategoryTree, colorScheme, parentID } =  this.props;
    debugger;
    return (
      <div
        className={`${styles['pt-20']} ${styles['megamenu-dropdown']} ${styles[colorScheme]} ${this.state.viewAllMenu ? {} : styles['max-height']}`}
      >
        <div className={styles['top-brands-trending-wrap']}>
          <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
            <li className={`${styles['megamenu-sub-list']}`}>
              <span className={`${styles['flex']} ${styles['mb-10']}`}>
                <a className={`${styles['level-1-item']} ${styles['fontW600']}`}>{HEADER_PAGE.TOP_BRANDS}</a>
              </span>
              <ul className={`${styles['megamenu-sub-child-list']}`}>
                {brandImages.topBrands[colorScheme] &&
                brandImages.topBrands[colorScheme].length > 0 && brandImages.topBrands[colorScheme].map(image => (
                  <li className={`${styles.flex} ${styles['mb-10']} ${styles['brand-icon']}`} key={image}>
                    <img alt={image} src={`/static/img/bg-img/${image}.jpg`} className={`${styles['img-responsive']}`} />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
            <li className={`${styles['megamenu-sub-list']}`}>
              <span className={`${styles['flex']} ${styles['mb-10']}`}>
                <a className={`${styles['level-1-item']} ${styles['fontW600']}`}>{HEADER_PAGE.TRENDING}</a>
              </span>
              <ul className={`${styles['megamenu-sub-child-list']}`}>
                {brandImages.trending[colorScheme] && brandImages.trending[colorScheme].length > 0 &&
                brandImages.trending[colorScheme].map(image => (
                  <li className={`${styles.flex} ${styles['mb-10']} ${styles['brand-icon']}`} key={image}>
                    <img alt={image} src={`/static/img/bg-img/${image}.jpg`} className={`${styles['img-responsive']}`} />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <ul className={styles['megamenu-sub-drop-down']}>
          {
            this.getTree(selectedCategoryTree, true)
          }
        </ul>
        {/*<div className={styles['view-all-menu']} onClick={this.viewAllMenu}>{this.state.viewAllMenu ? 'View Less' : 'View All'}</div>*/}
      </div>
    );
  }
}


export default Menu;
