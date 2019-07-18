import React, { Component } from 'react';
import Cookie from 'universal-cookie';

import routes, { Link } from '../../../../routes';
import { selectors, actionCreators } from '../../../../store/megamenu';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../header_en.styl';
import styles_ar from '../../header_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

import {languageDefinations} from '../../../../utils/lang'
const {HEADER_PAGE}=languageDefinations()
const MaxItems = 4;

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Leaves extends Component {
  constructor(props) {
    super(props);
    const { items } = props;
    this.state = {
      maxRows: MaxItems,
      isMoreButtonRequired: items.length > MaxItems,
    };
  }

  toggleItems = (e) => {
    e.stopPropagation();
    const { items } = this.props;
    const { maxRows } = this.state;
    this.setState({
      maxRows: maxRows === MaxItems ? items.length : MaxItems,
    });
  }

  render() {
    const { maxRows, isMoreButtonRequired } = this.state;
    const { items, parentID, parent } = this.props;
    return (
      <ul className={`${styles['megamenu-sub-child-list']} ${styles['pl-20']}`}>
        {
          items.slice(0, maxRows).map(item => (item ? (
            <li key={item.id} className={`${styles['pt-5']} ${styles['pb-5']}`}>
              <Link route={`/${country}/${language}/search?q=${item.displayName.split(' ').join('-').toLowerCase()}?categoryTree=true&isListed=false&sid=${parentID},${item.id}`}>
                <a className={`${styles['level-1-item']}`}>{item.displayName}</a>
              </Link>
            </li>
          ) : null))
        }
        {
          isMoreButtonRequired
          ?
            <li>
              <Link route={`/${country}/${language}/search?q=${parent.displayName.split(' ').join('-').toLowerCase()}?categoryTree=true&isListed=false&sid=${this.props.parentID}`}>
                <a className={`${styles['level-1-item']}`}>
                  {HEADER_PAGE.VIEW_ALL}
                </a>
              </Link>
            </li>
          :
          null
        }
      </ul>
    );
  }
}

export default Leaves;
