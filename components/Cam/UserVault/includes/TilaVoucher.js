import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/cam/userVault';
import { Col, Row } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang/';

import lang from '../../../../utils/language';

import styles_en from '../uservault_en.styl';
import styles_ar from '../uservault_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const { VAULT_PAGE } = languageDefinations();

const TilaVoucher = (props) => {
    const {transactions} = props;
    return (
        <div>
            <div className={`${styles['broad']}`}>
                <span>
                    <strong>
                        {VAULT_PAGE.VOUCHER_HISTORY}
                    </strong>
                </span>
                <div className={styles['gift-voucher']}>
                    <button className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`}>
                        ADD TILA GIFT VOUCHER
                    </button>
                </div>
            </div>
            <Row className={`${styles['titleRow']}`} >
                <Col md={2}>
                    Date
                </Col>
                <Col md={4}>
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
            <div className={styles['bodyRow']}>
                <Row>
                    <Col md={2}>
                        create_date
                    </Col>
                    <Col md={4}>
                        huha
                    </Col>
                    <Col md={2}>
                        huha
                    </Col>
                    <Col md={2}>
                        huha
                    </Col>
                    <Col md={2}>
                        balance
                    </Col>
                </Row>
            </div>
            {transactions.length>0 ? transactions.map((transaction) => {
                const { transaction_description, transaction_type, amount} = transaction; //have to destructure create_date and balance, once api response is integrated with it.
                console.log(transaction);
                return (
                    <div className={styles['bodyRow']}>
                        <Row>
                            <Col md={2}>
                                create_date
                            </Col>
                            <Col md={4}>
                                {transaction_description}
                            </Col>
                            <Col md={2}>
                                {transaction_type==='CREDIT' ? amount : ''}
                            </Col>
                            <Col md={2}>
                                {transaction_type==='DEBIT' ? amount : ''}
                            </Col>
                            <Col md={2}>
                                balance
                            </Col>
                        </Row>
                    </div>
                )
            }) : null}
        </div>
    )
};

export default TilaVoucher;