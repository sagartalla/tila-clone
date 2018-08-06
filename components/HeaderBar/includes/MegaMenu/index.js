import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import routes, { Link } from '../../../../routes';
import publicUrls from '../../../../constants';
import { selectors, actionCreators } from '../../../../store/megamenu';
import SVGComponent from '../../../common/SVGComponet';
import Menu from './Menu';
import SubMenu from './SubMenu';
import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/HeaderBar/header');


//TODO make it SEO friendly

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
  }

  componentDidMount() {
    //TODO: should be fetched on the server side
    this.props.getMegamenu();
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

  render() {
    const { megamenu, query={} } = this.props;
    const { category } = query;
    // const { selectedCategory } = this.state;
    const selectedCategory = 3245;
    // const selectedCategory = 3234;
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
          </div>
        </nav>
        {
          selectedCategoryTree
            ?
            <div
              className={styles['megamenu-event-wrapper']}
              onMouseOver={this.onExpandedHover}
              onMouseLeave={this.onHoverOut}
            >
            {
              selectedCategoryTree.displayName === "Fashion"
                ?
                <SubMenu
                  subMenuItems={selectedCategoryTree.childCategories}
                  onLinkClick={this.onLinkClick}
                />
                :
                <Menu
                  selectedCategoryTree={selectedCategoryTree}
                  colorScheme={this.state.colorScheme}
                  onLinkClick={this.onLinkClick}
                />
            }
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