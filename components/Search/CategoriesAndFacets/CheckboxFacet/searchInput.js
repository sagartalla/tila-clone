import React, { useState } from 'react'
import lang from '../../../../utils/language';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';
import SVGCompoent from '../../../common/SVGComponet';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const RenderFilterBar = ({ onFilterData, placeName, className }) => {
  const[inputVal,handleChange] = useState('')
  const onChangeData = (e) => {
    handleChange(e.currentTarget.value)
    onFilterData(e.currentTarget.value)
  }
  return (
    <div className={`${styles['search-header']} ${className} ${styles['flex']}`}>
      <SVGCompoent
        src="icons/search/search-icon"
        clsName={`${styles['icon-search']} ${styles['ml-5']}`}
      />
      <input
        type='text'
        onChange={onChangeData}
        placeholder={placeName}
        value={inputVal}
        style={{
          width: '180px',
          border: '1px solid #c8c7cc',
    }}
        className={`${styles['pl-18']}`}
      />
    </div>
  )
}

export default RenderFilterBar
