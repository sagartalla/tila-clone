import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();

class OffersAndDiscounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { configJson, handleOffersDiscountsTab } = this.props;
    return (
      <div className={`${styles['box']} ${styles['mb-20']} ${styles['relative']} ${styles['pay-offers-discounts']}`}>
        <SVGComponent clsName={`${styles['payment-icon']} ${configJson.done ? 'done' : ''} ${configJson.progress ? 'payment-active' : ''}`} src="icons/common-icon/offers-copons" />
        <div className={`${configJson.basic || configJson.done ? '' : 'hide'} ${styles['flex-center']}`}>
          <Col md={12} sm={12} xs={12} className={styles['pl-0']}>
            <h4 className={styles['m-0']}>{PAYMENT_PAGE.OFFERS_DISCOUNTS}</h4>
            <small>{PAYMENT_PAGE.OFFERS_DISCOUNTS}</small>
          </Col>
        </div>

        <div className={`${configJson.progress ? '' : 'hide'} ${styles['pb-5']} ${styles['pt-5']} ${styles['offers-show-part']}`}>
          <h4 className={`${styles['mt-0']} ${styles['mb-0']}  ${styles['pb-20']} ${styles['title']}`}>{PAYMENT_PAGE.OFFERS_DISCOUNTS}</h4>
          <div className={`${styles['visa-master-part']}`}>
            <h4 className={`${styles['m-0']} ${styles['pb-20']} ${styles['pt-20']} ${styles['lgt-blue']}`}>{`${PAYMENT_PAGE.OFFERS_ON} ${PAYMENT_PAGE.VISA},${PAYMENT_PAGE.MASTER}  & ${PAYMENT_PAGE.OTHER_CARDS}`}</h4>
            <div className={`${styles['debit-cards-list']} ${styles['relative']} ${styles['pt-20']} ${styles['flex-center']} ${styles['justify-center']} ${styles['pb-30']}`}>
              <Col md={4} xs={12} className={styles['pl-0']}>
                <div className={styles['flex']}>
                  <input type="radio" className={`${styles['radio-btn']}`} name="offer" />
                  <label className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['flex-center']} ${styles['pl-5']}`}> <span>{PAYMENT_PAGE.PAY_WITH}</span> <span className={`${styles['flex']} ${styles['pl-5']} ${styles['pr-5']}`}><SVGComponent clsName={`${styles['pay-cart-icon']}`} src="icons/cards-icons-list/bg-visa-icon" /></span> <span>{`${PAYMENT_PAGE.AND} ${PAYMENT_PAGE.GET_EXTRA} 5% ${PAYMENT_PAGE.OFF}`}</span> </label>
                </div>
              </Col>
              <Col md={4} xs={12} className={styles['pl-0']}>
                <div className={styles['flex']}>
                  <input type="radio" className={`${styles['radio-btn']}`} name="offer" />
                  <label className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['flex-center']} ${styles['pl-5']}`}> <span>{PAYMENT_PAGE.PAY_WITH}</span> <span className={`${styles['flex']} ${styles['pl-5']} ${styles['pr-5']}`}><SVGComponent clsName={`${styles['pay-cart-icon']}`} src="icons/cards-icons-list/bg-master-icon" /></span>  <span>{`${PAYMENT_PAGE.AND} ${PAYMENT_PAGE.GET_EXTRA} 10% ${PAYMENT_PAGE.OFF}`}</span> </label>
                </div>
              </Col>
              <Col md={4} xs={12} className={styles['pl-0']}>
                <div className={styles['flex']}>
                  <input type="radio" className={`${styles['radio-btn']}`} name="offer" />
                  <label className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['flex-center']} ${styles['pl-5']}`}> <span>{PAYMENT_PAGE.PAY_WITH}</span> <span className={`${styles['flex']} ${styles['pl-5']} ${styles['pr-5']}`}><SVGComponent clsName={`${styles['pay-cart-icon']}`} src="icons/cards-icons-list/bg-mastro-icon" /></span>  <span>{`${PAYMENT_PAGE.AND} ${PAYMENT_PAGE.GET_EXTRA} 15% ${PAYMENT_PAGE.OFF}`}</span> </label>
                </div>
              </Col>
              <span className={`${styles['absolute']} ${styles['flex-center']} ${styles['justify-center']} ${styles['or-part']}`}>{PAYMENT_PAGE.OR}</span>
            </div>
          </div>
          <div>
            <h4 className={`${styles['m-0']} ${styles['pb-20']} ${styles['pt-20']} ${styles['lgt-blue']}`}>{PAYMENT_PAGE.CREDIT_CARDS}</h4>
            <div className={`${styles['debit-cards-list']} ${styles['credit-cards-list']} ${styles['relative']} ${styles['pt-20']} ${styles['flex-center']} ${styles['pb-30']}`}>
              <Col md={4} className={styles['pl-0']}>
                <div className={styles['flex']}>
                  <input type="radio" className={`${styles['radio-btn']}`} name="credit_card" />
                  <label className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['flex-center']} ${styles['pl-5']} ${styles['mb-0']}`}>{`ABCD  ${PAYMENT_PAGE.AND} ${PAYMENT_PAGE.GET_EXTRA} 18% ${PAYMENT_PAGE.OFF}`}</label>
                </div>
              </Col>
              <Col md={4} className={styles['pl-0']}>
                <div className={styles['flex']}>
                  <input type="radio" className={`${styles['radio-btn']}`} name="credit_card" />
                  <label className={`${styles['fs-12']} ${styles['thick-gry-clr']} ${styles['flex-center']} ${styles['pl-5']} ${styles['mb-0']}`}> NCB Bank and 100 AED cashback </label>
                </div>
              </Col>
              <span className={`${styles['absolute']} ${styles['flex-center']} ${styles['justify-center']} ${styles['or-part']}`}>{PAYMENT_PAGE.OR}</span>
            </div>
          </div>
          <div className={`${styles['flex']} ${styles['flex-colum']} ${styles['pb-20']} ${styles['emi-table']}`}>
            <h4 className={`${styles['m-0']} ${styles['pb-20']} ${styles['pt-20']} ${styles['lgt-blue']}`}>{`${PAYMENT_PAGE.EMI}-${PAYMENT_PAGE.CREDIT_CARD}`}</h4>
            <Col md={12} className={`${styles['pl-0']} ${styles['pr-0']}`}>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <th>{PAYMENT_PAGE.CREDIT_CARDS}</th>
                    <th>3 Months</th>
                    <th>6 Months</th>
                    <th>9 Months</th>
                    <th>12 Months</th>
                  </tr>
                  <tr>
                    <td>ABCD</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                  </tr>
                  <tr>
                    <td>NCB BANK</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                  </tr>
                  <tr>
                    <td>HDFC</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                  </tr>
                  <tr>
                    <td>ICICI</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                    <td>200 AED</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </div>
        </div>
        <div className={`${configJson.progress ? '' : 'hide'} ${styles['pb-5']} ${styles['pt-15']} ${styles['pl-35']} ${styles['flex']} ${styles['m-pd-l-0']} ${styles['offers-bottom']}`}>
          <Col md={12} xs={12} className={`${styles['pl-0']} ${styles['m-pd-r-0']}`}>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['mr-20']} ${styles['cont-btn']}`} onClick={handleOffersDiscountsTab}>
              {PAYMENT_PAGE.CONTINUE_CAPS}
              </button>
            <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['skip-btn']}`} onClick={handleOffersDiscountsTab}>
              {PAYMENT_PAGE.SKIP_STEP}
              </button>
          </Col>
        </div>
      </div>
    );
  }
}

export default OffersAndDiscounts;
