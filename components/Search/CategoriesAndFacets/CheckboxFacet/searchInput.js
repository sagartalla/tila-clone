import React, { useState } from 'react'
import lang from '../../../../utils/language';
import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../search_en.styl';
import styles_ar from '../../search_ar.styl';
import SVGCompoent from '../../../common/SVGComponet';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const RenderFilterBar = ({ onFilterData, placeName }) => {
  const[inputVal,handleChange] = useState('')
  const onChangeData = (e) => {
    handleChange(e.currentTarget.value)
    onFilterData(inputVal)
  }
  return (
    <div className={`${styles['search-header']} ${styles['flex']}`}>
      <SVGCompoent
        src="icons/search/search-icon"
        clsName={`${styles['icon-search']}`}
      />
      <input
        type='text'
        onChange={onChangeData}
        placeholder={placeName}
        value={inputVal}
        className={`${styles['pl-18']}`}
      />
    </div>
  )
}

export default RenderFilterBar
