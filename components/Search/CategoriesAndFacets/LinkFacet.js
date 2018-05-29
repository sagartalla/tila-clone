import React, { Component } from 'react';
import { Link } from '../../../routes';
import styles from '../search.styl';

const MaxItems = 3;

class LinkFacet extends Component {
  constructor(props){
    super(props);
    const { filter } = props;
    this.state = {
      maxRows: MaxItems,
      isMoreButtonRequired: filter.children.length > MaxItems,
    };
    this.toggleMore = this.toggleMore.bind(this);
  }

  toggleMore() {
    const { filter } = this.props;
    this.setState({
      maxRows: this.state.maxRows === filter.children.length ? MaxItems : filter.children.length
    });
  }

  componentWillReceiveProps() {
    const { filter } = this.props;
    this.setState({
      isMoreButtonRequired: filter.children.length > MaxItems,
    });
  }

  render() {
    const { filter } = this.props;
    return (
      <li className={`${styles['category-list']} ${styles['lne-height2']}`}>
        <div className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['pl-10']}`}>{filter.name}</div>
        <ul className={styles['category-sub-list']}>
          {
            filter.children.slice(0, this.state.maxRows).map((category) => {
              return (
                <li key={category.id}>
                  <Link route={`/${category.canonicalId}-${category.id}/${window.location.search}`}>{category.name}</Link>
                  <ul className={`${styles['category-sub-order-list']} ${styles['pl-15']}`}>
                    {
                      category.children.map((subcategory) => {
                        return (
                          <li key={subcategory.id} className={styles['category-sub-list-inn']}>
                            <Link route={`/${category.canonicalId}-${category.id}/${subcategory.canonicalId}-${subcategory.id}/${window.location.search}`}>{subcategory.name}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              );
            })
          }
          {
            this.state.isMoreButtonRequired ? <li onClick={this.toggleMore}><a>{this.state.maxRows === filter.children.length ? '- show less' : ' + show more'}</a></li> : null
          }
        </ul>
      </li>
    );
  }
}

export default LinkFacet;