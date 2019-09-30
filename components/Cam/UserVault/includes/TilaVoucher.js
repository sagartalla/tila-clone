import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import moment from 'moment-timezone';
import { OverlayTrigger, Modal, Popover } from 'react-bootstrap';
import lang from '../../../../utils/language';
import SVGComponent from '../../../common/SVGComponet';
import styles_en from '../uservault_en.styl';
import styles_ar from '../uservault_ar.styl';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { VAULT_PAGE } = languageDefinations();

const TilaVoucher = (props) => {
    const { transactions } = props;

  const alertPopover = (
        <Popover id="popover-positioned-right" className={`${styles['balancepopover']}`}>
          <div className={`${styles['fs-12']}`}>{VAULT_PAGE.AMOUNT_CAN_BE_REDEEMED}</div>
        </Popover>
      );

//  const successPopover = (
//         <Popover id="popover-positioned-right" className={`${styles['balancepopover']}`}>
//           <div className={`${styles['fs-12']}`}>{VAULT_PAGE.THIS_IS_YOUR_REDEMABLE_BALANCE}</div>
//         </Popover>
//       );

 const redeemPopover = (
        <Popover id="popover-positioned-right">
            <div className={`${styles['fs-12']}`}>{VAULT_PAGE.REDEEM_YOUR_BALANCE_NOW}</div>
        </Popover>
        );

 const expiryPopover = (no_of_days_to_expire) => (
        <Popover id="popover-positioned-right">
            <span className={`${styles['fs-12']}`}>
                    <span>{no_of_days_to_expire === 0 ? VAULT_PAGE.EXPIRING : VAULT_PAGE.EXPIRING_IN} </span>
                    <span>{`${no_of_days_to_expire === 0 ? VAULT_PAGE.EXPIRING_TODAY : no_of_days_to_expire === 1 ? `${no_of_days_to_expire} ${VAULT_PAGE.DAY}` : `${no_of_days_to_expire} ${VAULT_PAGE.DAYS}`}`}</span></span>
        </Popover>
        );
    return (
        <div className={`${styles['flex']} ${styles['flex-colum']}`}>
            <Col md={12} sm={12} xs={12}>
            <Col md={6} sm={6} xs={6} className={`${styles['tila-credit']}`}>
                <div className={`${styles['tila-credit-wrap']} ${styles.flex} ${styles['align-center']} ${styles['justify-center']} ${styles['mt-20']}`}>
                    <div className={`${styles.label} ${styles['fs-16']} ${styles['fontW600']}`}>{VAULT_PAGE.YOUR_TILA_CREDIT_BALANCE_IS} &nbsp; &nbsp;</div>
                    <div className={`${styles['amount-wrap']} ${styles['align-baseline']}`}>
                    <div className={`${styles['currency']} ${styles['fs-12']}`}>{props.totalAmount.currency_code} &nbsp;</div>
                    <div className={`${styles.amount} ${styles['fs-30']} ${styles['fontW300']}`}>{props.totalAmount.display_value}</div>
                    </div>
                </div>
            </Col>
            <Col md={6} sm={6} xs={6} className={`${styles['tila-credit']}`}>
                <div className={`${styles['tila-redeemable-wrap']} ${styles.flex} ${styles['align-center']} ${styles['justify-center']} ${styles['mt-20']}`}>
                    <div className={`${styles.label} ${styles['fs-16']} ${styles['fontW600']}`}>{VAULT_PAGE.YOUR_REDEEMABLE_BALANCE_IS} &nbsp; &nbsp;</div>
                    <div className={`${styles['amount-wrap']} ${styles['align-baseline']}`}>
                    <div className={`${styles['currency']} ${styles['fs-12']}`}>{props.redeemableBalance.currency_code} &nbsp;</div>
                    <div className={`${styles.amount} ${styles['fs-30']} ${styles['fontW300']}`}>{props.redeemableBalance.display_value}</div>
                    </div>
                    <OverlayTrigger
                        placement="top"
                        overlay={redeemPopover}
                    >
                        <span className={`${styles.relative} ${styles.margin} ${styles['checkout-quat']} ${styles['fs-12']} ${styles['flex-center']} ${styles['justify-around']}`}>
                      <span className={`${lang === 'en' ? '' : styles['flip-questionmark']}`}>?</span>
                      </span>
                        </OverlayTrigger>
                </div>
            </Col>
            </Col>
            {transactions.length > 0 ?
            <div className={`${styles['mt-30']}`}>
                    <span className={`${styles['pl-15']} ${styles['fs-16']} ${styles['fontW600']}`}>
                            {VAULT_PAGE.VOUCHER_HISTORY}
                    </span>
                    {/* <div className={styles['gift-voucher']}>
                        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`}>
                            ADD TILA GIFT VOUCHER
                        </button>
                    </div> */}
                <Row className={`${styles['titleRow']} ${styles['m-0']} ${styles['mt-10']}`} >
                    <Col md={3}>
                        {VAULT_PAGE.DATE}
                    </Col>
                    <Col md={3}>
                        {VAULT_PAGE.DESCRIPTION}
                    </Col>
                    <Col md={2}>
                      {VAULT_PAGE.ADDED}
                    </Col>
                    <Col md={2}>
                    {VAULT_PAGE.USED}
                    </Col>
                    <Col md={2}>
                    {VAULT_PAGE.BALANCE}
                    </Col>
                </Row>
                {transactions.map((transaction, index) => {
                    const { created_date, transaction_description, transaction_type, amount, balance, status, future_reedemable, expired, no_of_days_to_expire } = transaction;
                    const date_arr = created_date.split('.')[0];
                    const date = moment(date_arr).tz('Asia/Riyadh').format('MMM D, YYYY')
                    const time = moment(date_arr).tz('Asia/Riyadh').format('hh:mm A')
                    return (
                        <div className={styles['bodyRow']} key={index}>
                            <Row className={`${styles['m-0']} ${styles['flex-center']}`}>
                                <Col md={3} className={transaction_type === 'CREDIT' && status === 'ACTIVE' && !expired && future_reedemable && no_of_days_to_expire < 6 ? `${styles['thick-red-clr']}` : ''}>
                                    {`${date}, ${time}`}
                                </Col>
                                <Col md={3} className={transaction_type === 'CREDIT' && status === 'ACTIVE' && !expired && future_reedemable && no_of_days_to_expire < 6 ? `${styles['thick-red-clr']}` : ''}>
                                    {transaction_description}
                                </Col>
                                <Col md={2} className={`${styles['flex-center']} ${transaction_type === 'CREDIT' && status === 'ACTIVE' && !expired && future_reedemable && no_of_days_to_expire < 6 ? `${styles['thick-red-clr']}` : ''}`}>
                                    {transaction_type === 'CREDIT' ?
                                    <div className={`${styles.width55}`}>{amount.display_value}</div>
                                    : ''}
                                    {transaction_type === 'CREDIT' ?
                                 (status === 'ACTIVE' || status === 'INACTIVE') && !future_reedemable && !expired &&
                                 <OverlayTrigger
                                    placement="top"
                                    overlay={alertPopover}
                                >
                                    <span className={`${styles['ml-10']}`}>
                                     {<SVGComponent clsName={`${styles['status-icon']}`} src={"icons/common-icon/warning"}/>}
                                     </span>
                                </OverlayTrigger> : ''}
                                {/* {transaction_type === 'CREDIT' ?
                                status === 'ACTIVE' && future_reedemable &&
                                <OverlayTrigger
                                    placement="top"
                                    overlay={successPopover}
                                >
                                    <span className={`${styles['ml-10']}`}>
                                     {<SVGComponent clsName={`${styles['status-icon']}`} src={"icons/common-icon/bg-tick-mark" }/>}
                                     </span>
                                 </OverlayTrigger> : ''} */}
                                 {transaction_type === 'CREDIT' && !expired && status === 'ACTIVE' && no_of_days_to_expire < 6 ?
                                  <OverlayTrigger
                                  placement="top"
                                  overlay={expiryPopover(no_of_days_to_expire)}
                              >
                                  <span className={`${styles['ml-10']}`}>
                                   {<SVGComponent clsName={`${styles['status-icon']}`} src={"icons/common-icon/expiry" }/>}
                                   </span>
                               </OverlayTrigger> : ''}
                                </Col>
                                <Col md={2}>
                                    {transaction_type === 'DEBIT' ? amount.display_value : ''}
                                </Col>
                                <Col md={2} className={`${styles['flex-center']}`}>
                                    <div className={`${styles.width55}`}>{balance.display_value}</div>
                                    {transaction_type === 'CREDIT' && expired ? <div className={`${styles.fontW600}`}>({VAULT_PAGE.EXPIRED})</div> : ''}                                    
                                </Col>
                            </Row>
                        </div>
                    );
                }) }
            </div>
            :
            // <div className={`${styles['vault-card-body']} ${styles['p-20-40']}`}>
            //     <h4 className={`${styles['pb-5']} ${styles['fontW300']} ${styles['lgt-blue']}`}>No voucher history</h4>
            // </div>
            <div className={`${styles['no-vocher-icon']} ${styles['align-center']} ${styles['flex-col']} ${styles['black-color']}`}>
                <div className={`${styles['no-wishlist-icon-inn']} ${styles['flex']}`}>
                    <SVGComponent clsName={`${styles['no-cards-list-icon']}`} src="icons/common-icon/no-cars-vocher" />
                    {/* <h3 className={`${styles['fs-26']} ${styles['t-c']} ${styles['pt-40']}`}>{VAULT_PAGE.NO_VOCHER_LABEL}</h3> */}
                </div>
            </div>
            }
        </div>
    )
};

export default TilaVoucher;
