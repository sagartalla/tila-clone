import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import routes from '../../routes';
import publicUrls from '../../constants';
import { Link } from '../../routes';
import { selectors, actionCreators } from '../../store/megamenu';
import SVGComponent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');

//TODO make it SEO friendly

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

class MegaMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      viewAllMenu: false
    }
    this.onHoverCurry = this.onHoverCurry.bind(this);
    this.onHoverOut = this.onHoverOut.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onHoverOutDelayed = this.onHoverOutDelayed.bind(this);
    this.onExpandedHover = this.onExpandedHover.bind(this);
    this.viewAllMenu = this.viewAllMenu.bind(this);
  }

  componentDidMount() {
    //TODO: should be fetched on the server side
    this.props.getMegamenu();
  }

  getTree(childCategory, isFirst, depth=0) {
    ++depth;
    console.log('depth', depth);
    if(depth > 2) {
      return null;
    }
    return _.map(childCategory ? childCategory.childCategories : {}, (childItem) => {
      return (
        <li className={`${styles['megamenu-sub-list']} ${depth === 2 ? styles['pl-20'] : null}`} key={childItem.id} onClick={this.onLinkClick}>
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

  onHoverCurry(item) {
    return () => {
      this.setState({
        ...this.state,
        selectedCategory: item.id,
        colorScheme: (item.displayName || '').split(' ').join('').toLowerCase().replace('&', '-'),
      });
    }
  }

  onExpandedHover() {
    this.expandedHover = true;
  }

  onLinkClick() {
    this.setState({
      selectedCategory: null,
      viewAllMenu: false
    });
    this.expandedHover = false;
  }

  onHoverOut() {
    this.setState({
      selectedCategory: null,
      viewAllMenu: false
    });
    this.expandedHover = false;
  }

  onHoverOutDelayed() {
    setTimeout(() => {
      if(!this.expandedHover){
        this.setState({
          selectedCategory: null,
          viewAllMenu: false
        })
      }
    });
  }

  getLandingPageLink(name) {
    if(name === 'Electronics') {
      return '/landing/electronics';
    }
    if(name === 'Fashion') {
      return '/landing/fashion';
    }
    if(name === 'Lifestyle' || name === 'Home & Living') {
      return '/landing/Lifestyle';
    }
  }

  viewAllMenu() {
    this.setState({
      viewAllMenu: !this.state.viewAllMenu
    })
  }

  render() {
    const { megamenu, query={} } = this.props;
    const { category } = query;
    const { selectedCategory } = this.state;
    // const selectedCategory = 2653;
    const selectedCategoryTree = _.find(megamenu, { id: selectedCategory });
    return (
      <div>
        <nav className={`${styles['megamenu-wrapper']} ${styles['flx-spacebw-alignc']} ${styles[this.state.colorScheme]}`}>
          <ul className={styles['mb-0']}>
            {
              _.map(megamenu, (item) => {
                return (
                  <li key={item.id} onMouseOver={this.onHoverCurry(item)} onMouseLeave={this.onHoverOutDelayed} className={`${styles[`${(item.displayName || '').split(' ').join('').toLowerCase().replace('&', '-')}-item`]} ${(!selectedCategoryTree && this.getLandingPageLink(item.displayName)) === `/landing/${category}` ? styles['active-menu-item']: {}}`}>
                    <div>
                      {/* <Link route={`/category/${item.displayName}-${item.id}?categoryTree=true&isListed=true`}> */}
                      <Link route={this.getLandingPageLink(item.displayName)}>
                        <a>{item.displayName}</a>
                      </Link>
                    </div>
                  </li>
                );
              })
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
            <div
              onMouseOver={this.onExpandedHover}
              onMouseLeave={this.onHoverOut}
              className={`${styles['pt-40']} ${styles['megamenu-dropdown']} ${styles['box']} ${styles['box-space']} ${styles[this.state.colorScheme]} ${this.state.viewAllMenu ? {} : styles['max-height']}`}
              >
              <div className={styles['top-brands-trending-wrap']}>
                <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
                  <li className={`${styles['megamenu-sub-list']}`}>
                    <span className={`${styles['flex']} ${styles['mb-10']}`}>
                      <a className={`${styles['level-1-item']} ${styles['fontW600']}`}>Top Brands</a>
                    </span>
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
                  </li>
                </ul>
                <ul className={`${styles['top-brands-wrap']} ${styles['megamenu-sub-drop-down']}`}>
                  <li className={`${styles['megamenu-sub-list']}`}>
                    <span className={`${styles['flex']} ${styles['mb-10']}`}>
                      <a className={`${styles['level-1-item']} ${styles['fontW600']}`}>Trending</a>
                    </span>
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
                  </li>
                </ul>
              </div>
              <ul className={styles['megamenu-sub-drop-down']}>
                {
                  this.getTree(selectedCategoryTree, true)
                }
              </ul>
              <div className={styles['view-all-menu']} onClick={this.viewAllMenu}>{this.state.viewAllMenu ? 'View Less' : 'View All'}</div>
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
    megamenu: selectors.getMegamenu(store),
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getMegamenu: actionCreators.getMegamenu,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);
