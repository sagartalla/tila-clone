import React, { Component } from 'react';
import { Link } from '../../../routes';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

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
      <li className={`${styles['category-list']} `}>
        <div className={`${styles['category-list-title']} ${styles['black-color']} ${styles['fontW600']} ${styles['p-10-20']} ${styles['flx-spacebw-alignc']}`}>
          {filter.name}
          <SVGCompoent clsName={`${styles['expand-icon']}`} src="icons/common-icon/down-arrow-circle" />
        </div>
        <ul className={`${styles['category-sub-list']} ${styles['pl-20']} ${styles['lne-ht2']}`}>
          {
            filter.children.slice(0, this.state.maxRows).map((category) => {
              return (
                <li key={category.id} className={styles['main-sub-list']}>
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