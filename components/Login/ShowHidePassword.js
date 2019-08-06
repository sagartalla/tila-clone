import React from 'react';
import SVGComponent from '../common/SVGComponet';
import { languageDefinations } from '../../utils/lang';
import lang from '../../utils/language';
import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const { LOGIN_PAGE } = languageDefinations();


const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const ShowHidePassword = (props) => {
    const { hide, hideToggle, hideContent } = props;
    return (
            <div onClick={hideToggle} className={`${styles.passwordeye}`}>
                <div className={`${styles['password-eye-icon']}`}>
                    <SVGComponent src={hide ? "icons/profile/eye-show" : "icons/profile/eye-hide"}/>
                </div>&nbsp;
                <span>{hideContent ? '' : `${hide ? LOGIN_PAGE.SHOW : LOGIN_PAGE.HIDE} ${LOGIN_PAGE.PASSWORD}`}</span>
            </div>
    );
}


export default ShowHidePassword;