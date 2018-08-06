import React, { Component } from 'react';
import routes, { Link } from '../../../../routes';
import { selectors, actionCreators } from '../../../../store/megamenu';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

const MaxItems = 5;

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
              <Link route={`/srp/${item.displayName}-${item.id}?categoryTree=true&isListed=true`}>
                <a className={`${styles['level-1-item']}`}>{item.displayName}</a>
              </Link>
            </li>
          ) : null)
        }
        {
          this.state.isMoreButtonRequired
          ?
          <li>
            <Link route={`/srp/${parent.displayName}-${parent.id}?categoryTree=true&isListed=true`}>
              <a className={`${styles['level-1-item']}`}>View All</a>
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
