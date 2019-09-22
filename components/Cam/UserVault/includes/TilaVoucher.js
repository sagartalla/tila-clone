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
    const popover = (
        <Popover id="popover-positioned-right" >
          hjkhkjhkj
        </Popover>
      );
    return (
        <div className={`${styles['flex']} ${styles['flex-colum']}`}>
            <Col md={12} sm={12} xs={12}>
            <Col md={6} sm={6} xs={6} className={`${styles['tila-credit']}`}>
                <div className={`${styles['tila-credit-wrap']} ${styles['tila-credit-left']} ${styles.flex} ${styles['align-center']} ${styles['justify-center']} ${styles['mt-20']}`}>
                    <div className={`${styles.label} ${styles['fs-16']} ${styles['fontW600']}`}>{VAULT_PAGE.YOUR_TILA_CREDIT_BALANCE_IS} &nbsp; &nbsp;</div>
                    <div className={`${styles['amount-wrap']} ${styles['align-baseline']}`}>
                    <div className={`${styles['currency']} ${styles['fs-12']}`}>{props.tilaCredit.currency_code} &nbsp;</div>
                    <div className={`${styles.amount} ${styles['fs-30']} ${styles['fontW300']}`}>{props.tilaCredit.display_value}</div>
                    </div>
                </div>
            </Col>
            <Col md={6} sm={6} xs={6} className={`${styles['tila-credit']}`}>
                <div className={`${styles['tila-credit-wrap']} ${styles['tila-credit-right']} ${styles.flex} ${styles['align-center']} ${styles['justify-center']} ${styles['mt-20']}`}>
                    <div className={`${styles.label} ${styles['fs-16']} ${styles['fontW600']}`}>{VAULT_PAGE.YOUR_REDEEMABLE_BALANCE_IS} &nbsp; &nbsp;</div>
                    <div className={`${styles['amount-wrap']} ${styles['align-baseline']}`}>
                    <div className={`${styles['currency']} ${styles['fs-12']}`}>{props.tilaCredit.currency_code} &nbsp;</div>
                    <div className={`${styles.amount} ${styles['fs-30']} ${styles['fontW300']}`}>{props.tilaCredit.display_value}</div>
                    </div>
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
                        Date
                    </Col>
                    <Col md={3}>
                        Description
                    </Col>
                    <Col md={2}>
                        Added
                    </Col>
                    <Col md={2}>
                        Used
                    </Col>
                    <Col md={2}>
                        Balance
                    </Col>
                </Row>
                {transactions.map((transaction, index) => {
                    const { created_date, transaction_description, transaction_type, amount, balance } = transaction;
                    const date_arr = created_date.split('.')[0];
                    const date = moment(date_arr).tz('Asia/Riyadh').format('MMM D, YYYY')
                    const time = moment(date_arr).tz('Asia/Riyadh').format('hh:mm A')
                    return (
                        <div className={styles['bodyRow']} key={index}>
                            <Row className={`${styles['m-0']}`}>
                                <Col md={3}>
                                    {`${date}, ${time}`}
                                </Col>
                                <Col md={3}>
                                    {transaction_description}
                                </Col>
                                <Col md={2}>
                                    {transaction_type === 'CREDIT' ? amount.display_value : ''}
                                </Col>
                                <Col md={2}>
                                    {transaction_type === 'DEBIT' ? amount.display_value : ''}
                                </Col>
                                <Col md={2} className={`${styles['flex-center']}`}>
                                    {balance.display_value}
                                    {/* <div className={`${styles['flex-center']} ${styles['voucher-inn']}`}>
                                 <SVGComponent clsName={`${styles['status-icon']} ${styles['ml-10']}`} src="icons/common-icon/warning" />
                                 <div className={`${styles['voucher-item']} ${styles['tool-tip']}`}>asasasa</div>                                 
                                 </div> */}
                                 <OverlayTrigger
                                    placement="top"
                                    overlay={popover}
                                >
                                    <span className={`${styles['ml-10']}`}>
                                     <SVGComponent clsName={`${styles['status-icon']}`} src="icons/common-icon/warning" />
                                     </span>
                                </OverlayTrigger>
                                 {/* <SVGComponent clsName={`${styles['status-icon']}`} src="icons/common-icon/bg-tick-mark" />}*/}
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
