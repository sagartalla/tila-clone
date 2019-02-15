import React, { Component } from 'react';
import _ from 'lodash';

import Leaves from './Leaves';
import SVGComponent from '../../../common/SVGComponet';
import routes, { Link } from '../../../../routes';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');
import {languageDefinations} from '../../../../utils/lang';
const{HEADER_PAGE} = languageDefinations()

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.viewAllMenu = this.viewAllMenu.bind(this);
    this.getTree = this.getTree.bind(this);
  }

  viewAllMenu() {
    this.setState({
      viewAllMenu: !this.state.viewAllMenu
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
            <Link route={`/srp/${childItem.displayName}-${childItem.id}?categoryTree=true&isListed=true`}>
              <a className={`${styles['level-1-item']} ${depth === 1 ? styles['fontW600'] : {}}`}>{childItem.displayName}</a>
            </Link>
          </span>
          {
            childItem.childCategories
            ?
            <Leaves items={childItem.childCategories} parent={childItem} />
            :
            null
          }
        </li>
      )
    })
  }


  render() {
    const { selectedCategoryTree, colorScheme } =  this.props;
    console.log(colorScheme);
    return (
      <div
        className={`${styles['pt-40']} ${styles['megamenu-dropdown']} ${styles[colorScheme]} ${this.state.viewAllMenu ? {} : styles['max-height']}`}
        >
        <div className={styles['top-brands-trending-wrap']}>
          <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
            <li className={`${styles['megamenu-sub-list']}`}>
              <span className={`${styles['flex']} ${styles['mb-10']}`}>
                <a className={`${styles['level-1-item']} ${styles['fontW600']}`}>{HEADER_PAGE.TOP_BRANDS}</a>
              </span>
              {colorScheme ?
                <ul className={`${styles['megamenu-sub-child-list']}`}>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/samsung-img.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/apple.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/sony.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/philips.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/microsoft.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                </ul>
                :
                <ul className={`${styles['megamenu-sub-child-list']}`}>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/christy.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/tefal.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/adidas.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/lacoste.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                </ul>
              }
            </li>
          </ul>
          <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
            <li className={`${styles['megamenu-sub-list']}`}>
              <span className={`${styles['flex']} ${styles['mb-10']}`}>
                <a className={`${styles['level-1-item']} ${styles['fontW600']}`}>{HEADER_PAGE.TRENDING}</a>
              </span>
              {colorScheme ?
                <ul className={`${styles['megamenu-sub-child-list']}`}>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/samsung-img.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/apple.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/sony.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/philips.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/microsoft.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                </ul>
                :
                <ul className={`${styles['megamenu-sub-child-list']}`}>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/river_island.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/debenhams.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/sony.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                  <li className={`${styles['flex']} ${styles['mb-10']} ${styles['brand-icon']}`}>
                    <img src="/static/img/bg-img/_philips.jpg" className={`${styles['img-responsive']}`} />
                  </li>
                </ul>
              }
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
