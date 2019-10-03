import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import constants from '../../../constants';
import { languageDefinations } from '../../../utils/lang';
import SVGComponent from '../../common/SVGComponet';
import { actionCreators } from '../../../store/cam/wishlist';
import { actionCreators as authActionCreators } from '../../../store/auth';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
const { PDP_PAGE } = languageDefinations();

const RecentlyViewItem = ({
  item, isLoggedIn, addToWishlistAndFetch, deleteWishlist, showLoginScreen,
}) => {
  const addToWishlist = () => {
    if (!isLoggedIn) {
      showLoginScreen();
    } else if (item.wishlistId) {
      deleteWishlist(item.wishlistId);
    } else {
      addToWishlistAndFetch({
        catalog_id: item.cid,
        variant_id: item.vid,
        product_id: item.pid,
        wishlisted_price: item.pr,
        wishlisted_currency: item.cd,
      });
    }
  };

  return (
    <div className={`${styles['pl-0']} ${styles['pr-0']}  ${styles.relative}`} key={item.id}>
      <a href={`/${lang}/pdp/${item && item.nm && item.nm.replace(/\//g, '').split(' ').join('-').toLowerCase()}/${item.tuinId ? `${item.tuinId}/` : ''}${item.id ? `${item.id}/` : ''}?pid=${item.pid}&vid=${item.vid}&cid=${item.cid}`}>
        <div className={`${styles['recentview-main-inn']} ${styles['border-r']}  ${styles['p-10-20']} ${styles.flex} ${styles['flex-colum']}`}>
          <div className={styles['recentview-main-inn-img']}>
            <img src={`${constants.mediaDomain}/${item.im}`} alt="" className="img-responsive" />
          </div>
          <div>
            <div className={`${styles['fs-12']} ${styles['rc-itm-cart']} ${styles.flex} ${styles['justify-center']}`}>
              {item.isAddedToCart &&
              <span className={`${styles['pt-5']} ${styles['pb-5']} ${styles['pl-10']} ${styles['pr-10']} ${styles['bg-light-gray']} ${styles['black-color']}`}>
                {PDP_PAGE.ITEM_IN_CART}
              </span>}
              <span>&nbsp;</span>
            </div>
            <h6 className={`${styles['fs-12']} ${styles['mb-5']} ${styles['black-color']} ${styles.elipsis}`}><span className={styles.fontW600}>{item.br}</span> - {item.nm}</h6>
            <span className={`${lang === 'ar' ? styles.flex : ''}`}>
            <span className={`${styles['fs-12']} ${styles['black-color']} ${lang === 'ar' ? styles.flex : ''}`}><span>{item.display_cur}</span><span className={`${styles.fontW600} ${styles['fs-14']} ${styles['pl-5']}`}>{item.pr} </span></span>
            <span className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}><s><span className={`${styles.fontW600} ${styles['pl-5']}`}>{item.mrp}</span></s></span>
            </span>
          </div>
        </div>
      </a>
      <a onClick={addToWishlist}>
        <SVGComponent clsName={`${styles.absolute} ${styles.pointer} ${styles['rv-wishlist-icon']}`} src={item.isWishlisted ? 'icons/wish-list/wish-list-icon-red' : 'icons/wish-list/wish-list-icon'} />
      </a>
    </div>
  );
};

// const mapStateToProps = store => ({
// });

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    deleteWishlist: actionCreators.deleteWishlist,
    addToWishlistAndFetch: actionCreators.addToWishlistAndFetch,
    showLoginScreen: authActionCreators.showLoginScreen,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(RecentlyViewItem);
