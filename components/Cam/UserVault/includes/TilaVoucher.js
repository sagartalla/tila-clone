import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';
import moment from 'moment';
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
    return (
        <div>
            {transactions.length > 0 ?
            <div>
                <div className={`${styles['broad']}`}>
                    <span className={styles['pl-15']}>
                        <strong>
                            {VAULT_PAGE.VOUCHER_HISTORY}
                        </strong>
                    </span>
                    {/* <div className={styles['gift-voucher']}>
                        <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`}>
                            ADD TILA GIFT VOUCHER
                        </button>
                    </div> */}
                </div>
                <Row className={`${styles['titleRow']} ${styles['m-0']}`} >
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
                    const date = moment(date_arr).format('MMM D, YYYY')
                    const time = moment(date_arr).format('hh:mm A')
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
                                <Col md={2}>
                                    {balance.display_value}
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
