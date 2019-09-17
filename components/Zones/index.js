import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { bindActionCreators } from 'redux';

import HeaderBar from '../HeaderBar';
import RecentlyViewItem from '../Product/includes/RecentlyViewItem';
import FooterBar from '../Footer/index';
import { selectors, actionCreators } from '../../store/landing';
import { selectors as wishListSelectors } from '../../store/cam/wishlist';
import lang from '../../utils/language';
import { selectors as authSelectors } from '../../store/auth';
import { languageDefinations } from '../../utils/lang';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './zones_en.styl';
import styles_ar from './zones_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PDP_PAGE, ITEMS_ZONE } = languageDefinations();

const titles = {
  'recently-viewed': PDP_PAGE.RECENTLY_VIEWED,
};

class Zones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rv: JSON.parse(localStorage.getItem('rv')) || [],
    };
  }

  componentDidMount() {
    const { isLoggedIn, query, getRecentlyViewedAll } = this.props;
    if (isLoggedIn) {
      switch (query.zone) {
        case 'recently-viewed':
          getRecentlyViewedAll();
          break;
        default: break;
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { isLoggedIn, query, getRecentlyViewedAll } = this.props;
    if (newProps.isLoggedIn !== isLoggedIn && newProps.isLoggedIn) {
      switch (query.zone) {
        case 'recently-viewed':
          getRecentlyViewedAll();
          break;
        default: break;
      }
    }
  }

  render() {
    const {
      data, query, isLoggedIn, isAddedToCart,
    } = this.props;
    const { rv } = this.state;
    const items = isLoggedIn ? data : rv.map((item) => {
      item.isAddedToCart = isAddedToCart(item.id);
      return item;
    });
    return (
      <div>
        <HeaderBar />
        <div className="container-fluid">
          {items.length > 0 ?
            <div className={`${styles.flex} ${styles['flex-colum']} ${styles['m-20']} ${styles['bg-white']}`}>
              <div className={`${styles['p-15']} ${styles['pl-40']} ${styles['border-b']}`}>
                <h2 className={`${styles['m-0']} ${styles.fontW600} ${styles['fs-20']}`}>{titles[query.zone]}</h2>
              </div>
              <div className={`${styles.flex} ${styles['flex-wrp']}`}>
                {items.map(item => (
                  <div className={`${styles['border-b']}`} style={{ width: '20%' }}>
                    <RecentlyViewItem item={item} isLoggedIn={isLoggedIn} />
                  </div>))}
              </div>
            </div> :
            <div className={`${styles['p-20']} ${styles['t-c']} ${styles['default-shadow']} ${styles.flex} ${styles['flex-colum']} ${styles['mr-20']} ${styles['ml-20']} ${styles['mt-50']} ${styles['mb-50']} ${styles['bg-white']}`}>
              <div className={`${styles['thick-gry-clr']}`}>
                {ITEMS_ZONE.NO_RECENTLY_VIEWED}
              </div>
              <div className={`${styles.fontW600}`}>
                {ITEMS_ZONE.BEGIN_SHOPPING}
              </div>
            </div>
          }
        </div>
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isLoggedIn: authSelectors.getLoggedInStatus(store),
  isAddedToCart: listingId => wishListSelectors.getCartStatus(store, listingId),
  data: selectors.getZonedItems(store),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRecentlyViewedAll: actionCreators.getRecentlyViewedAll,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Zones);
