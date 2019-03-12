import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import ProductPrice from '../includes/ProductPrice';
import GeoWidget from '../../common/GeoWidget';
import { languageDefinations } from '../../../utils/lang';
import { actionCreators, selectors } from '../../../store/product';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';
import { Modal } from "react-router-modal";
const styles = mergeCss('components/Product/product');

const { PDP_PAGE } = languageDefinations();

class Shipping extends Component {
  state = {
    showModal: false,
  }
  showModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }
  render() {
    const { shippingInfo, offerInfo } = this.props;
    const { shipping_fees, shipping_days, shippable, acceptsReturns, maxDaysToReturn, isPreview } = shippingInfo;
    return (
      <div className={`${styles['box']} ${styles['border-radius4']} ${styles['mt-5']} ${styles['mb-10']} ${styles['ipad-delivery-address-part']} ${styles['free-delivery-part']}`}>
        <div className={`${styles['shipping-details-part']} ${styles['p-5']} ${styles['flex']} ${styles['justify-center']}`}>
          <span className={styles['fs-12']}>{PDP_PAGE.FREE_DELIVERY_BY} <span className={styles['fontW600']}>{moment().add(shipping_days, 'days').format("ddd, hA")}</span> </span>
          {/* {
              shippable
                ?
                <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>{PDP_PAGE.FREE_DELIVERY_IN}<span className={styles['fontW600']}>{shipping_days}</span>{PDP_PAGE.DAYS}</span> : ''
            } */}
        </div>
        <div className={`${styles['p-15']}`}>
          <div className={styles['flx-spacebw-alignc']}>
            <div className={styles['pdp-deliver-list']}>
              <GeoWidget  hideLabel={true} />
            </div>
            <div className={`${styles['radio-btn-group']}`}>
              <input type="radio" id="free-no-cost" name="selector" />
              <label for="free-no-cost">
                <span className={styles['fs-12']}>FREE</span>
                <span className={styles['fs-10']}>No extra cost</span>
              </label>
              <input type="radio" id="cost-option-two" name="selector" />
              <label for="cost-option-two">
                <span className={styles['fs-12']}>EXPRESS</span>
                <span className={styles['fs-10']}>+12.76 AED</span>
              </label>
              <input type="radio" id="cost-option-three" name="selector" />
              <label for="cost-option-three">
                <span className={styles['fs-12']}>SAME DAY</span>
                <span className={styles['fs-10']}>+15 AED</span>
              </label>
            </div>
          </div>
          {
            shippable
              ?
              <div>
                <div className={`${styles['flx-spacebw-alignc']} ${styles['fontW600']} ${styles['p-5']} ${styles['fs-12']} ${styles['warrenty-part']}`}>
                  <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                    <SVGCompoent clsName={`${styles['return-icon']} ${styles['mr-10']}`} src="icons/common-icon/return" />
                    {
                      acceptsReturns
                        ?
                        <span>{maxDaysToReturn} {PDP_PAGE.DAY} {PDP_PAGE.EASY_RETURN}</span>
                        :
                        `${PDP_PAGE.NON_RETURNABLE}`
                    }
                  </div>
                  {this.props.warranty ?
                  <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                      <SVGCompoent clsName={`${styles['trust-icon']}`} src="icons/common-icon/trust-secure" /> &nbsp;
                      <span>
                        <a onClick={this.showModal}>
                          {this.props.warranty.duration + " " + this.props.warranty.duration_unit + " " + PDP_PAGE.WARRANTY}
                        </a>
                      </span>
                      {
                        this.state.showModal ?
                          // <div className={styles['tool-tip']}>
                          <Modal className={`react-router-modal__modal ${styles['p-20']}`} onBackdropClick={this.closeModal}>
                            <div>
                              <h3>Summary</h3>
                              {this.props.warranty.summary}
                              <p>
                                <strong>Covers : </strong>
                                {this.props.warranty.covered}<br/>
                                <strong>Not Covers : </strong>
                                {this.props.warranty.not_covered}
                              </p>
                            </div><br/>
                          </Modal>
                          : null
                      }
                  </div>
                  :
                  <div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                    <span>{PDP_PAGE.NO_WARRANTY}</span> 
                  </div>
                  }
                </div>
              </div>
              :
              <p className={`${styles['flex']} ${styles['pt-15']} ${styles['justify-center']}`}>{PDP_PAGE.NO_SHIPPING_CITY}</p>

          }
        </div>
        {
          !isPreview && <ProductPrice offerInfo={offerInfo} />
        }
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
