import React from 'react';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './ToggleBtn_en.styl';
import styles_ar from './ToggleBtn_ar.styl';

import lang from '../../../utils/language';

// import Theme from '../helpers/context/theme';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const ToggleBtn = props => {
  return (
    <div>
        <input className={`${styles['HideOOS']}`} onClick={props.handleClick} id="Toggle" type="checkbox" defaultChecked={props.checked}/>
        <label className={`${styles['Switch']}`} htmlFor="Toggle">
            <div className={`${styles['Toggle']}`}></div>
        </label>
    </div>
  )
};

export default ToggleBtn;
