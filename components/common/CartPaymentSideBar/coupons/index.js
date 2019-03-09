import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import { languageDefinations } from '../../../../utils/lang/';
import { mergeCss } from '../../../../utils/cssUtil';

const { COUPON_OFFERS } = languageDefinations();

const styles = mergeCss('components/common/CartPaymentSideBar/coupons/index');


class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerms: false,
      termsOfUse: '',
      howToUse: '',
      showHowToUse: false,
    };
  }
  handleChild = (e) => {
    e.stopPropagation();
  }
 showTerms = data => () => {
   this.setState({
     showTerms: true,
     termsOfUse: data.tc,
   });
 }
 showHowtoUse = data => () => {
   this.setState({
     showHowToUse: true,
     howToUse: data.how_to_use,
   });
 }
 closeTerms = () => {
   this.setState({
     showTerms: false,
     showHowToUse: false,
   });
 }
 enterCouponCode = (e) => {
   this.setState({
     couponCode: e.target.value,
   });
 }
 render() {
   const { couponData } = this.props;
   const {
     showTerms, termsOfUse, howToUse, showHowToUse, couponCode,
   } = this.state;
   return (
     <div>
       <div className={styles.couponApply}>
         <Input
           placeholder=" Enter Coupon Code"
           style={{
            width: '350px', height: '60px', border: '0',
          }}
           onChange={this.enterCouponCode}
           val={couponCode}
         />
         <Button className={`${styles.buttonStyle} ${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles.width35} ${styles['m-10']}`} btnText="Apply" BtnClickHandler={this.handleSubmit} />
       </div>
       <div>
         {couponData.map(data =>
            (
              (moment(data.ends_on).toDate().getTime() >= moment().toDate().getTime()) &&
              <div className={styles.couponDiv}>
                <div className={`${styles.flex}`}>
                  <div className={data.offer_sub_type === 'LISTING' ? `${styles.couponCodeListing}` : data.offer_sub_type === 'BANK' ? `${styles.couponCodeBank}` : `${styles.couponCodeCategory}`}>
                    <div className={`${styles['align-end']} ${styles.flex}`}><div className={`${styles['fs-10']} ${styles.textColor} `}>{data.offer_currency}</div>&nbsp;{data.coupon_code}</div>
                  </div>
                  <div className={data.offer_sub_type === 'LISTING' ? `${styles.listingColor} ${styles.couponOffer} ` : data.offer_sub_type === 'BANK' ? `${styles.bankColor} ${styles.couponOffer}` : `${styles.categoryColor} ${styles.couponOffer}`}>{data.offer_sub_type}</div>
                </div>
                <div className={`${styles.wordBreak} ${styles['p-5']}`}>{data.description}</div>
                <div className={`${styles['p-5']} ${styles['flex-center']} ${styles['justify-between']} ${styles.flex}`}>
                  <div className={`${styles['lgt-blue']} ${styles.pointer} ${styles.flex}`} onClick={this.showTerms(data)}>{COUPON_OFFERS.VIEW_TERMS}
                    <div className={styles.border} />
                  </div>
                  <div className={`${styles['lgt-blue']} ${styles.pointer}`} onClick={this.showHowtoUse(data)}>{COUPON_OFFERS.HOW_TO_USE}</div>
                  {data.applied ?
                    <div className={`${styles.flex}`}>
                      <img src="/static/img/icons/common-icon/green-tick.svg" alt="checked" />
                      <div className={`${styles.applied} ${styles['p-10']}`}>{COUPON_OFFERS.APPLIED}</div>
                    </div>
                  : <Button className={`${styles['fp-btn-default']}`} btnText={COUPON_OFFERS.APPLY} BtnClickHandler={this.handleApply} />}
                </div>
              </div>
          ))}
       </div>
       <Modal
           show={showTerms}
           onHide={this.closeTerms}
           className={styles.modalClassName}
         >
           <Modal.Body>
             {termsOfUse}
           </Modal.Body>
           <div className={`${styles['justify-end']} ${styles['p-30']} ${styles.flex}`}><button className="btn btn-primary" style={{ backgroundColor: '#45689a', width: '15%' }} onClick={this.closeTerms}>
               {COUPON_OFFERS.OK}
                                                                                          </button>
             </div>
         </Modal>
       <Modal
           show={showHowToUse}
           onHide={this.closeTerms}
           className={styles.modalClassName}
         >
           <Modal.Body>
             {howToUse}
           </Modal.Body>
           <div className={`${styles['justify-end']}  ${styles['p-30']} ${styles.flex}`}><button className="btn btn-primary" style={{ backgroundColor: '#45689a', width: '15%' }} onClick={this.closeTerms}>
               {COUPON_OFFERS.OK}
                                                                                           </button>
             </div>
         </Modal>
     </div>
   );
 }
}

Coupon.propTypes = {
  couponData: PropTypes.instanceOf(Array),
};

Coupon.defaultProps = {
  couponData: [],
};

export default Coupon;
