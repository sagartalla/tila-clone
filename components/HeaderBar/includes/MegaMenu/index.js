import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'react-bootstrap';
import _ from 'lodash';
// import Cookie from 'universal-cookie';
import { Link } from '../../../../routes';
import { selectors, actionCreators } from '../../../../store/megamenu';
import Menu from './Menu';

import { languageDefinations } from '../../../../utils/lang';
import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../header_en.styl';
import styles_ar from '../../header_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

// const cookies = new Cookie();

// const language = cookies.get('language') || 'ar';
// const country = cookies.get('country') || 'SAU';

const { HEADER_PAGE } = languageDefinations();
// TODO make it SEO friendly

let timeoutCount = null;

class MegaMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      viewAllMenu: false,
    };
    this.onHoverCurry = this.onHoverCurry.bind(this);
    this.onHoverOut = this.onHoverOut.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onHoverOutDelayed = this.onHoverOutDelayed.bind(this);
    this.onExpandedHover = this.onExpandedHover.bind(this);
  }

  componentDidMount() {
    // TODO: should be fetched on the server side
    this.props.getMegamenu();
  }

  onHoverCurry = item => () => {
    if (this.state.selectedCategory !== item.id) {
      timeoutCount && clearTimeout(timeoutCount);
      timeoutCount = setTimeout(() => {
        this.setState({
          ...this.state,
          selectedCategory: item.id,
          itemColor: item.itemColor,
          hoverItem: item.id,
        });
      }, 300);
    }
  }

  onExpandedHover() {
    this.expandedHover = true;
  }

  onLinkClick(e) {
    this.props.track({
      eventName: 'MEGA_MENU',
      tree: e.target.innerHTML,
    });
    this.setState({
      selectedCategory: null,
      viewAllMenu: false,
    });
    this.expandedHover = false;
  }

  onHoverOut() {
    this.setState({
      selectedCategory: null,
      viewAllMenu: false,
      itemColor: null,
      hoverItem: null,
    });
    this.expandedHover = false;
  }

  onHoverOutDelayed(id) {
    return () => {
      timeoutCount && clearTimeout(timeoutCount);
      timeoutCount = setTimeout(() => {
        if (!this.expandedHover) {
          this.setState({
            selectedCategory: null,
            viewAllMenu: false,
            itemColor: null,
            hoverItem: null,
          });
        }
      }, 600);
    };
  }

  getLandingPageLink(id) {
    if (id === 'CWZ') {
      return 'electronics';
    }
    if (id === 'GLS') {
      return 'fashion';
    }
    if (id === 'JZG') {
      return 'lifestyle';
    }
  }

  render() {
    const { megamenu, query = {} } = this.props;
    const { category } = query;
    const {
      selectedCategory,
      itemColor,
      hoverItem,
    } = this.state;
    // const selectedCategory = 3245;
    // const selectedCategory = 3234;
    // const selectedCategory = 848;
    const selectedCategoryTree = _.find(megamenu, { id: selectedCategory });

    return (
      <div>
        <Grid className={`${styles['pl-0']}`}>
          <nav className={`${styles['megamenu-wrapper']} ${styles['flx-spacebw-alignc']}`}>
          <ul className={`${styles['mb-0']} ${styles.flex}`}>
            {
              _.map(megamenu, (item) => (
                  <li key={item.id}
                    onMouseEnter={this.onHoverCurry(item)}
                    onMouseLeave={this.onHoverOutDelayed(item.id)}
                    className={`${(hoverItem === item.id) ? styles['active-menu-item'] : ''}`}
                    style={ (itemColor && hoverItem === item.id) ? { borderBottom: `4px solid ${itemColor}` } : {} }
                    >
                    <div>
                      {/* <Link route={`/category/${item.displayName}-${item.id}?categoryTree=true&isListed=true`}> */}
                      <Link route={`/${lang}/${this.getLandingPageLink(item.sid)}`}>
                        <a>{item.displayName}</a>
                      </Link>
                    </div>
                  </li>
                ))
            }
          </ul>
          {/* <div className={`${styles['float-r']} ${styles['fs-12']}`}>
            <span className={`${styles['pl-5']} ${styles['pr-5']}`}>
              <a href={publicUrls.sellerPlatform} target="_blank" className={styles['black-color']}>{HEADER_PAGE.SELL_WITH_TILA}</a>
            </span>
          </div>*/}
        </nav>
        </Grid>
        {
          selectedCategoryTree
            ?
              <div
              className={`${styles['megamenu-event-wrapper']}`}
              onMouseOver={this.onExpandedHover}
              onMouseLeave={this.onHoverOut}
            >
              {
              <Grid className={styles['megamenu-event-container']}>
                  <Menu
                    selectedCategoryTree={selectedCategoryTree}
                    parentID={selectedCategory}
                    itemColor={itemColor}
                    onLinkClick={this.onLinkClick}
                  />
                </Grid>
            }
            </div>
            :
            null
        }
      </div>
    );
  }
}


const mapStateToProps = (store) => ({
    megamenu: selectors.getMegamenu(store),
  });

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      getMegamenu: actionCreators.getMegamenu,
      track: actionCreators.track,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);
