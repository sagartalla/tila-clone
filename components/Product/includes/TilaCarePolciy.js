import React, { useState } from 'react';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';
import lang from '../../../utils/language';
import { languageDefinations } from '../../../utils/lang';
import Warranty from './Warranty';
import SVGCompoent from '../../common/SVGComponet';

const { WARRANTY_PAGE, CART_PAGE, PDP_PAGE } = languageDefinations();

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

export default function TilaCarePolicy({
  data, setTilaPolicy, choosenPolicyData, selectedTilaPolicy, warranty,
}) {
  const [state, setState] = useState({
    extended_warranty: selectedTilaPolicy.extended_warranty || '',
    damage_protection: selectedTilaPolicy.damage_protection || '',
  });

  const selectedInput = (e) => {
    setTilaPolicy({ ...choosenPolicyData, [e.currentTarget.dataset.name]: e.currentTarget.dataset.id });
    return setState(prevState => ({ ...prevState, [e.currentTarget.dataset.name]: e.currentTarget.dataset.id }));
  };
  const removePolicy = (e) => {
    delete choosenPolicyData[e.currentTarget.getAttribute('data-key')];
    setTilaPolicy(choosenPolicyData);
    return setState(prevState => ({ ...prevState, [e.currentTarget.getAttribute('data-key')]: '' }));
  };
  const fetchPolicyData = (dataObj) => {
    const result = Object.keys(dataObj).map((key, i) => {
      if (Array.isArray(dataObj[key])) {
        return (
          <div key={`index+${i}`} className={`${styles.flex} ${styles['flex-colum']} ${styles['tila-care-warty']}`}>
            <h5 className={`${styles.fontW600}`}>{`Tila Care ${key.split('_').join(' ')}`}</h5>
            {
            data[key].map((item, i) => (
              <div
                className={`${styles['flx-spacebw-alignc']} ${styles['flex-wrp']} ${state[key] === item.policy_id ? styles.activePolicy : ''}`}
                key={`sub${item.policy_id}`}
                data-id={item.policy_id}
                data-name={key}
                onChange={selectedInput}
              >
                <div>
                  <input
                    type="radio"
                    className={`${styles['radio-btn']}`}
                    name={key}
                    value={item.policy_name}
                    checked={state[key] === item.policy_id}
                  />
                  <label className={`${styles['pl-10']} ${styles.fontW300} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>
                    {item.policy_name} | {item.cost.currency_code} {item.cost.display_value}
                  </label>
                </div>
                <span
                  className={`${styles.removeButton} ${styles['fs-10']}`}
                  onClick={removePolicy}
                  data-key={key}
                >
                  <img className={styles['img-responsive']} src={"/static/img/bg-img/delivery-remove-icon.png"} />
                </span>
              </div>
              ))

            }
          </div>
        );
      }
    });
    return result;
  };
  return (
    <div
      className={
        `${styles.box}
         ${styles['border-radius4']}
         ${styles['mt-5']}
         ${styles['mb-10']}
         ${styles['ipad-delivery-address-part']}
         ${styles['free-delivery-part']}
         `}
    >
      {Object.keys(warranty).length > 0 ?
        <div className={`${styles['flex-center']} ${styles['warenty-part-inn']} ${styles['pb-10']} ${styles['warenty-part-single']}`}>
          <span className={styles['warnty-trust-img']}><img className={styles['']} src={"/static/img/bg-img/trust-without-border.png"} alt="" /></span>
          <Warranty warranty={warranty} break />
        </div>
        :
        null
      }
      {
        Object.keys(data).length > 0  &&
          <>
            <div className={`${styles.flex} ${styles['pb-10']} ${styles['border-b']} ${styles['border-t']} ${styles['tila-ext-wrny']}`}>{fetchPolicyData(data)}</div>
            <div className={`${styles.flex} ${styles['thick-gry-clr']} ${styles['fs-12']} ${styles['pt-5']}`}>{WARRANTY_PAGE.WARRANTY_LABEL}</div>
          </>
      }
    </div>
  );
}
