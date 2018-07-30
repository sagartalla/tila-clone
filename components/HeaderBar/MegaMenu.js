import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import publicUrls from '../../constants';
import { Link } from '../../routes';
import { selectors, actionCreators } from '../../store/megamenu';
import SVGComponent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

//TODO make it SEO friendly

class MegaMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null
    }
    this.onHoverCurry = this.onHoverCurry.bind(this);
    this.onHoverOut = this.onHoverOut.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
  }

  componentDidMount() {
    //TODO: should be fetched on the server side
    this.props.getMegamenu();
  }

  getTree(childCategory, isFirst, depth=0) {
    ++depth;
    return _.map(childCategory ? childCategory.childCategories : {}, (childItem) => (
      <li className={`${styles['megamenu-sub-list']} ${depth === 4 ? styles['pl-10'] : {}}`} key={childItem.id} onClick={this.onLinkClick}>
        <span className={`${styles['flex']}`}>
          {/* {
            isFirst
            ?
            <SVGComponent clsName={`${styles['flex']} ${styles['megamenu-icon']}`} src={childCategory.icon}/>
            :
            null
          } */}
          <Link route={`/${childItem.displayName}-${childItem.id}?categoryTree=true&isListed=true`}>
            <a className={`${styles['level-1-item']} ${depth === 2 ? styles['fontW600'] : {}}`}>{childItem.displayName}</a>
          </Link>
        </span>
        <ul className={`${styles['megamenu-sub-child-list']} ${styles['pl-0']}`}>
          {
            childItem.isLeaf ? null : this.getTree(childItem, false, depth)
          }
        </ul>
      </li>
    ))
  }

  onHoverCurry(id) {
    return () => {
      this.setState({
        ...this.state,
        selectedCategory: id
      });
    }
  }

  onLinkClick() {
    this.setState({
      selectedCategory: null
    });
  }

  onHoverOut() {
    this.setState({
      selectedCategory: null
    });
  }

  getLandingPageLink(name) {
    if(name === 'Electronics') {
      return '/landing/electronics';
    }
    if(name === 'Fashion') {
      return '/landing/fashion';
    }
    if(name === 'Lifestyle') {
      return '/landing/Lifestyle';
    }
  }

  render() {
    const { megamenu } = this.props;
    const { selectedCategory } = this.state;
    const selectedCategoryTree = _.find(megamenu, { id: selectedCategory });
    return (
      <div>
        <nav className={`${styles['megamenu-wrapper']} ${styles['flx-spacebw-alignc']}`}>
          <ul className={styles['mb-0']}>
            {
              _.map(megamenu, (item) => (
                <li key={item.id} onMouseOver={this.onHoverCurry(item.id)}>
                  <div>
                    {/* <Link route={`/category/${item.displayName}-${item.id}?categoryTree=true&isListed=true`}> */}
                    <Link route={this.getLandingPageLink(item.displayName)}>
                      <a className={styles['level-1-item']}>{item.displayName}</a>
                    </Link>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className={`${styles['float-r']} ${styles['fs-12']}`}>
            <span className={`${styles['pl-5']} ${styles['pr-5']}`}>
              <a href={publicUrls.sellerPlatform} target="_blank" className={styles['black-color']}>Sell with Tila</a>
            </span>
            {/* <span className={`${styles['pl-5']} ${styles['pr-5']}`}>|</span>
            <span className={`${styles['pl-5']} ${styles['pr-5']}`}>
              <a href={publicUrls.customerHelp} target="_blank" className={styles['black-color']}>Customer Care</a>
            </span> */}
          </div>
        </nav>
        {
          selectedCategoryTree
            ?
            <div onMouseLeave={this.onHoverOut} className={`${styles['megamenu-dropdown']} ${styles['box']} ${styles['box-space']}`}>
              <ul className={styles['megamenu-sub-drop-down']}>
                {
                  this.getTree(selectedCategoryTree, true)
                }
              </ul>
            </div>
            :
            null
        }

      </div>
    );
  }
}


const mapStateToProps = (store) => {
  return ({
    megamenu: selectors.getMegamenu(store)
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getMegamenu: actionCreators.getMegamenu },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);
