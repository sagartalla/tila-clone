import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../utils/lang';
import { mergeCss } from '../../../utils/cssUtil';
import SVGComponent from '../SVGComponet';
import Bin from './Bin';
import Box from './Box';

const { PAYMENT_PAGE } = languageDefinations();
const styles = mergeCss('components/Payments/payment');

const boxObject = {
  successbox:<SVGComponent clsName={`${styles['success_box-icon']}`} src="icons/captcha-icons-list/success_box-icon" />,
  errorbox:<SVGComponent clsName={`${styles['error_box-icon']}`} src="icons/captcha-icons-list/error_box-icon" />,
  openbox:<SVGComponent clsName={`${styles['drop-box-icon']}`} src="icons/captcha-icons-list/box-icon" />
}

const textObject = {
  errortext:<div style={{textAlign: "center"}}>
    <span style={{color: '#dd1e31'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>Error. Please Try Again</span><br/>
    <span className={`${styles['fs-12']} ${styles['pt-20']}`}>Drop the Answer icon into the box Above</span>
  </div>,
  successtext:<span style={{color: '#99cc33'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>&nbsp;Success</span>,
  opentext:<span className={`${styles['fs-12']} ${styles['pt-20']}`}>Drop the Answer icon into the box Above</span>
}
const CaptchaContent = ({items,state,handleDrop,handleClick}) => {
  return (
    items
      ?
        <div className={`${styles['flx-spacebw-alignc']} ${styles['pt-30']} ${styles['pb-30']}`}>
            <div>
              <ul className={`${styles['pl-0']} ${styles['m-0']} ${styles['cash-tab']}`}>
                <li>Visual</li>
              </ul>
              <div className={`${styles['captch-inn']} ${styles['p-20']}`}>
                <span className={`${styles['flx-spacebw-alignc']} ${styles['refresh-part']} ${styles['pb-20']}`}>
                  <span className={styles['fs-12']}>{items.question}</span>
                    <span onClick={handleClick} className={`${styles['flex']} ${styles['refresh-part-inn']} ${styles['p-5']}`}>
                      <SVGComponent clsName={`${styles['refresh-icon']}`} src="icons/captcha-icons-list/refresh-icon" />
                    </span>
                </span>
              <div>
              <div className={`${styles['flex-center']} ${styles['captcha-icon-part']}`}>
                {
                  items.images ? items.images.slice(0,5).map((image) => { //.slice has to be removed as soon as backend rectifies the response from their end
                    return <Box image={image} index={image.image_id} handleDrop={(id) => handleDrop(id)}/>
                  }):
                <div>
                  Loading Captcha...
                </div>
                }
                </div>
                </div>
              </div>
            </div>
            <Bin
            openBox={boxObject[state.openBox]}
            boxText={textObject[state.boxText]}
          />
         </div>
      :
        null
  )
}

export default CaptchaContent
