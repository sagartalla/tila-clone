import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import SVGCompoent from '../SVGComponet';
import { selectors, actionCreators } from '../../../store/compare';
import { Router } from '../../../routes';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './compareWidget_en.styl';
import styles_ar from './compareWidget_ar.styl';
import { languageDefinations } from '../../../utils/lang/';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const { COMPARE_WIDGET, CART_PAGE } = languageDefinations();
class CompareWidget extends React.Component {

  componentDidMount() {
    this.props.getCompareCount();
  }

  removeData = ({ currentTarget }) => {
    this.props.removeCompareData(currentTarget.getAttribute('data-id'));
  }

  showComparePage = () => {
    Router.pushRoute(`/${language}/compare`);
  }

  render() {
    const { cmpData, removeAll } = this.props;
    return (cmpData.products.length > 0 &&
      <div className={styles['compare-fixed']}>
        <div className={styles['compare-container']}>
          <div className={styles['compare-icon-com']} onClick={this.showComparePage}>
            <a className={styles['compare-icon-holder']} href="javascript: void(0)">
              <SVGCompoent clsName={`${styles['compare-icon']}`} src="icons/compare" />
              <span className={`${styles['pl-5']} ${styles['fs-10']}`}><span className={styles['pr-5']}>{COMPARE_WIDGET.COMPARE}</span><span className={`${styles['comp-length']}`}>{cmpData.products.length}</span></span>
            </a>
          </div>
          <div className={styles['compare-items']}>
            <div style={{ width: `${cmpData.products.length * 160}px` }} className={`${styles['flex-center']} ${styles['justify-around']} ${styles['ht-210']}`}>
              {cmpData.products.map((data) => {
                const { catalogObj = {}, displayName } = data;
                return (
                  <div className={styles.item} key={data.productId}>
                    <div className={styles['item-image']}>
                      <img className={styles.image} src={data.src} alt="" />
                    </div>
                    <div className={styles['item-label']}>
                      <a title={data.displayName} className={`${styles.ellips} ${styles.width100} ${styles['black-color']} ${styles['fs-12']}`} href={`/${language}/pdp/${displayName ? displayName.split(' ').join('-').toLowerCase(): ''}/c/${catalogObj.catalog_id}/p/${catalogObj.product_id}/l/${catalogObj.listing_id}/v/${catalogObj.variant_id ? `${catalogObj.variant_id}` : ''}`}>
                        {data.displayName}
                      </a>
                    </div>
                    <div data-id={data.productId} onClick={this.removeData} className={styles.close}>
                      <span>x</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {
              cmpData.products.length > 1 &&
              <a onClick={removeAll} className={`${styles['fs-12']} ${styles['black-color']} ${styles['flex']} ${styles['justify-center']} ${styles['pt-15']}`}>{ CART_PAGE.REMOVE }</a>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  cmpData: selectors.getCmpData(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCompareCount: actionCreators.getCompareCount,
    removeCompareData: actionCreators.removeCompareData,
    removeAll: actionCreators.removeAll,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CompareWidget);
