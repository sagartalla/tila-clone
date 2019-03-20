import React from 'react'
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

const RenderVariants = ({ variantData, onSelectedVariant, isvisible, OncloseVariant }) => {
  const selectProductSize = (listingId, index) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectedVariant(listingId,index)
  }
  return(
      <div className={`${styles['product-sizeDisplay']} ${isvisible ? styles['product-showsizeDisplay'] : ''}`} >
        <div className={`${styles['product-displayHeader']} ${styles['fs-14']} ${styles['flex']} ${styles['justify-spacebetween']} ${styles['align-center']}`}>
          <h4>{`Please Select productSize`}</h4>
          <div className={`${styles['fs-22']} ${styles['mr-5']} ${styles['pointer']}`} onClick={OncloseVariant}>x</div>
        </div>
        <div className={`${styles['product-sizeContainer']}`}>
        {
        variantData.map((data,index) => {
          return (
            <div key={'productSize_'+index} onClick={data.productAvailable ? selectProductSize(data.listingId[0],index) : null}
              className={`${styles['product-sizebutton']} ${styles['pointer']} ${styles['fs-12']} ${data.productAvailable ? '' : styles['product-strikebutton']}`}
            >{data.productSize[0]}</div>
          )
        })
      }
      </div>
    </div>
  )
}

export default RenderVariants
