import React from 'react';

import styles from './ToggleBtn.styl';
const ToggleBtn = props => {
  return (
    <div>
        <input className={`${styles['HideOOS']}`} onClick={props.handleClick} id="Toggle" type="checkbox" checked={props.checked}/>
        <label className={`${styles['Switch']}`} for="Toggle">
            <div className={`${styles['Toggle']}`}></div>
        </label>
    </div>
  )
};

export default ToggleBtn;
