import React from 'react';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/common/ToggleBtn/ToggleBtn');

const ToggleBtn = props => {
  return (
    <div>
        <input className={`${styles['HideOOS']}`} onClick={props.handleClick} id="Toggle" type="checkbox" checked={props.excludeOOS === 'true'}/>
        <label className={`${styles['Switch']}`} for="Toggle">
            <div className={`${styles['Toggle']}`}></div>
        </label>
    </div>
  )
};

export default ToggleBtn;
