import React from 'react';
import Btn from '../common/Button';
import { Col } from 'react-bootstrap';
import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Login/login');

const VerifyStatus = (props) => {
    let resetLink = "Reset password link sent to your registered email ID";
    return (
        <div>
            {props.validation==='True' ? 
            <>
            <div className={styles['reset-link']}>
                {resetLink}
            </div>
            <h3>Please click on email link to reset password.</h3>
            <span className={styles['bg-light-gray']}><small>Note: If you do not receive your email within five minutes<br/>check your spam folder.</small></span>
            <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText='DONE, THANKS' BtnClickHandler={()=>{props.resetLogin()}} />
            </Col>
            </>
            :
            <>
            <div>
                <div className={styles['invalid-email']}>
                    {props.forgotPasswordStatus}
                </div>
                <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                    <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText='TRY AGAIN' BtnClickHandler={()=>{props.switchState()}} />
                </Col>
            </div>
            </>
            }
        </div>
    );
}

export default VerifyStatus;
