import React from 'react'
import SVGComponent from '../SVGComponet';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './toastcontent_en.styl';
import styles_ar from './toastcontent_ar.styl';
import lang from '../../../utils/language'

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const ToastContent = ({ closeToast, msg, msgType}) => {

  return (
    <div className={`${styles['flex']} ${styles['u_width302']}`}>
      <div
        className=
        {
          `${styles['justify-center']}
           ${styles['align-center']}
           ${styles[msgType]}
           ${styles[`${msgType}-backgrnd`]}
           ${styles['flex']}`}
        >
        {{
          warn:<span>warn</span>,
          success:<SVGComponent
                  src={'icons/common-icon/icon-tick'}
                  clsName={`${styles['icon-styl']}`}
                />,
          error:<SVGComponent
                  src={'icons/common-icon/icon-close'}
                  clsName={`${styles['icon-styl']}`}
                />,
        }[msgType]}
      </div>
      <div
        className=
        {
          `${styles['justify-around']}
           ${styles['align-center']}
           ${styles[msgType]}
           ${styles['flex']}
           ${styles['u-wdth310']}
           ${styles['fs-16']}
           ${styles['lgt-black']}
           ${styles['msg-block']}
           ${styles['p-5']}
           `
        }
      >
      <div
        className={`${styles['fontW800']} ${styles['msg-div']} ${styles['p-5']}`}
        >
        {msg}
      </div>
      <div
        className={`${styles['fontW300']} ${styles['p-5']}`}
        onClick={closeToast}
      >
        X
      </div>
    </div>
  </div>
  )
}

export default ToastContent
