import React from 'react';
import { languageDefinations } from '../../../utils/lang';

import SVGComponent from '../SVGComponet';
import Bin from './Bin';
import Box from './Box';

const { PAYMENT_PAGE, ORDER_PAGE } = languageDefinations();

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const boxObject = {
  successbox:<SVGComponent clsName={`${styles['success_box-icon']}`} src="icons/captcha-icons-list/success_box-icon" />,
  errorbox:<SVGComponent clsName={`${styles['error_box-icon']}`} src="icons/captcha-icons-list/error_box-icon" />,
  openbox:<SVGComponent clsName={`${styles['drop-box-icon']}`} src="icons/captcha-icons-list/box-icon" />
}

const textObject = {
  errortext:<div style={{textAlign: "center"}}>
    <span style={{color: '#dd1e31'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>{PAYMENT_PAGE.ERROR_PLEASE_TRY_AGAIN}</span><br/>
    <span className={`${styles['fs-12']} ${styles['pt-20']}`}>{PAYMENT_PAGE.DROP_THE_ANSWER_INTO_THE_BOX}</span>
  </div>,
  successtext:<span style={{color: '#99cc33'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>&nbsp;{ORDER_PAGE.SUCCESS}</span>,
  opentext:<span className={`${styles['fs-12']} ${styles['pt-20']}`}>{PAYMENT_PAGE.DROP_THE_ANSWER_INTO_THE_BOX}</span>,
  tcText: <span>{PAYMENT_PAGE.COD_TC}</span>
}
const CaptchaContent = ({items,state,handleDrop,handleClick}) => {
  return (
    items
      ?
      <div>
        <div className={`${styles['flx-spacebw-alignc']} ${styles['fw700']} ${styles['pt-30']} ${styles['pb-30']}`}>
            <div className={`${styles['pr-10']} ${styles['pb-20']}`}>
              {/* <ul className={`${styles['pl-0']} ${styles['m-0']} ${styles['cash-tab']}`}>
                <li>Visual</li>
              </ul> */}
              <div className={`${styles['captch-inn']} ${styles['p-20']}`}>
                <span className={`${styles['flx-spacebw-alignc']} ${styles['refresh-part']} ${styles['pb-20']}`}>
                  <span className={styles['fs-14']}>{items.question}</span>
                    <span onClick={handleClick} className={`${styles['flex']} ${styles['refresh-part-inn']} ${styles['p-5']}`}>
                      <SVGComponent clsName={`${styles['refresh-icon']}`} src="icons/captcha-icons-list/refresh-icon" />
                    </span>
                </span>
              <div>
              <div className={`${styles['flex-center']} ${styles['captcha-icon-part']}`}>
                {
                  items.images ? items.images.map((image) => {
                    return <Box image={image} index={image.image_id} handleDrop={(id) => handleDrop(id)} key={image.image_id}/>
                  }):
                <div>
                  {PAYMENT_PAGE.LOADING_CAPTCHA}
                </div>
                }
                </div>
                </div>
              </div>
            </div>
            <Bin
            openBox={boxObject[state.openBox]}
            boxText={textObject[state.boxText]}
            tcText={textObject['tcText']}
          />
         </div>
          <div className={`${styles['terms']}`}>
            <b>Terms and Conditions</b><br/><br/>
              <div className={`${styles['terms-content']}`}>
                Cash on Delivery will not be available if your order value exceeds 3000 SAR<br/><br/>

                You are authorized Tila or its partners to collect, process, facilitate and remit payments and / or the Transaction Price electronically or through Cash on Delivery<br/><br/>

                Cash on Delivery refunds will be processed to Tila Credit
              </div>
          </div>
        </div>
      :
        null
  )
}

export default CaptchaContent
