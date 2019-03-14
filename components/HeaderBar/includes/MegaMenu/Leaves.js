import React, { Component } from 'react';
import Cookie from 'universal-cookie';

import routes, { Link } from '../../../../routes';
import { selectors, actionCreators } from '../../../../store/megamenu';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');
import {languageDefinations} from '../../../../utils/lang'
const {HEADER_PAGE}=languageDefinations()
const MaxItems = 5;

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Leaves extends Component {
  constructor(props) {
    super(props);
    const { items } = this.props;
    this.state = {
      maxRows: MaxItems,
      isMoreButtonRequired: items.length > MaxItems,
    }
  }

  render() {
    const {items, parent} = this.props;
    return (
      <ul className={`${styles['megamenu-sub-child-list']} ${styles['pl-20']}`}>
        {
          items.slice(0, this.state.maxRows).map((item) => item ? (
            <li key={item.id} className={`${styles['pt-5']} ${styles['pb-5']}`}>
              <Link route={`/${country}/${language}/srp/${item.displayName.split(' ').join('-').toLowerCase()}?categoryTree=true&isListed=false&sid=${this.props.parentID},${item.id}`}>
                <a className={`${styles['level-1-item']}`}>{item.displayName}</a>
              </Link>
            </li>
          ) : null)
        }
        {
          this.state.isMoreButtonRequired
          ?
          <li>
            <Link route={`/${country}/${language}/srp/${parent.displayName.split(' ').join('-').toLowerCase()}?categoryTree=true&isListed=false&sid=${this.props.parentID},${item.id}`}>
              <a className={`${styles['level-1-item']}`}>{HEADER_PAGE.VIEW_ALL}</a>
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
