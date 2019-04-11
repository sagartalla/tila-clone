import React from 'react';
import Btn from '../common/Button';
import { Col } from 'react-bootstrap';
import { mergeCss } from '../../utils/cssUtil';
import { languageDefinations } from '../../utils/lang';
const styles = mergeCss('components/Login/login');
const { EMAIL_VERIFICATION } = languageDefinations();

const VerifyStatus = (props) => {
    let resetLink = EMAIL_VERIFICATION.RESET_PASSWORD_LINK_SENT;
    return (
        <div>
            {props.showInput ?
            <>
            <div className={styles['reset-link']}>
                {resetLink}

                <div className={`${styles['lgt-blue']} ${styles.pointer}`} onClick={props.sendLink}>{EMAIL_VERIFICATION.RESEND_THE_LINK}</div>
            </div>
            <h3>{EMAIL_VERIFICATION.PLEASE_CLICK_ON_EMAIL_LINK}</h3>
            <span className={styles['bg-light-gray']}><small>{EMAIL_VERIFICATION.IF_YOU_DO_NOT_RECEIVE_YOUR_EMAIL}<br/>{EMAIL_VERIFICATION.CHECK_YOUR_SPAM_FOLDER}</small></span>
            <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText={EMAIL_VERIFICATION.DONE_THANKS} onClick={()=>{props.resetLogin()}} />
            </Col>
            </>
            :
            <>
            <div>
                <div className={styles['invalid-email']}>
                    {props.forgotPasswordStatus}
                </div>
                <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                    <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText={EMAIL_VERIFICATION.TRY_AGAIN} onClick={()=>{props.switchState()}} />
                </Col>
            </div>
            </>
            }
        </div>
    );
}

export default VerifyStatus;
