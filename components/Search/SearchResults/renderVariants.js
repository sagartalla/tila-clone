import React from 'react'
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

const RenderVariants = ({variantData,onSelectedVariant,isvisible,OncloseVariant}) => {
  const selectProductSize = (listingId,index) => (e) => {
    e.stopPropagation();
    onSelectedVariant(listingId,index)
  }
  return(
      <div className={ isvisible ? `${styles['product-sizeDisplay']} ${styles['product-showsizeDisplay']}`:`${styles['product-sizeDisplay']} `} >
        <div className={`${styles['product-displayHeader']} ${styles['fs-14']} ${styles['flex']} ${styles['justify-spacebetween']} ${styles['align-center']}`}>
          <h4>{`Please Select productSize`}</h4>
          <div className={`${styles['fs-22']} ${styles['mr-5']} ${styles['pointer']}`} onClick={OncloseVariant}>x</div>
        </div>
        <div className={`${styles['product-sizeContainer']}`}>
        {
        variantData.map((data,index) => {
          return (
            data.productAvailable ?
            <div key={'productSize_'+index} onClick={selectProductSize(data.listingId[0],index)}
              className={`${styles['product-sizebutton']} ${styles['pointer']} ${styles['fs-12']}`}
            >{data.productSize[0]}</div>:
            <div key={'productSize_'+index} className={`${styles['fs-12']} ${styles['pointer']} ${styles['product-strikebutton']}`}>
              <s>{data.productSize[0]}</s>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default RenderVariants
