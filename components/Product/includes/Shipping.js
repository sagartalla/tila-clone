import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import GeoWidget from '../../common/GeoWidget';
import { languageDefinations } from '../../../utils/lang';
import { actionCreators, selectors } from '../../../store/product';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const { PDP_PAGE } = languageDefinations();

class Shipping extends Component {
  render(){
    const { shipping_fees, shipping_days, shippable, acceptsReturns, maxDaysToReturn } = this.props;
    return (
      <div className={`${styles['box']} ${styles['p-15']} ${styles['border-radius4']} ${styles['mt-15']} ${styles['mb-15']}`}>
        <div>
          <div className={styles['flx-spacebw-alignc']}>
            <div className={styles['pdp-deliver-list']}>
              <GeoWidget />
            </div>
            {
               true
               ?
               <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>Free deliver in <span className={styles['fontW600']}>{shipping_days}</span> Days</span>: ''
            }

          </div>
          {
            true
            ?
            <div>
              <div className={`${styles['flex']} ${styles['justify-center']} ${styles['pt-15']} ${styles['pb-15']}`}>
                <span className={styles['fs-12']}>FREE Delivery by {moment().add(shipping_days, 'days').format("ddd, hA")}</span>
              </div>
              <div className={`${styles['flx-spacebw-alignc']} ${styles['fontW600']} ${styles['warrenty-part']}`}>
                <div className={styles['flex-center']}>
                  <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/return" />
                  {
                    acceptsReturns
                    ?
                      <span>{maxDaysToReturn} Day easy return</span>
                    :
                    'Non returnable'
                  }
                </div>
                <span>|</span>
                <div className={styles['flex-center']}>
                  <SVGCompoent clsName={`${styles['secure-icon']} ${styles['mr-10']}`} src="icons/common-icon/trust-secure" />
                 <span>1 year warrenty</span>
                </div>
              </div>
            </div>
            :
            <p>Not shipping to your city.</p>

          }
        </div>
      </div>
    )
  }
}

Shipping.PropTypes = {

}

const mapStateToProps = (store) => {
  return ({});
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {},
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
