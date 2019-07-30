import React, { useState } from 'react';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';
import lang from '../../../utils/language';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

export default function TilaCarePolicy({data,setTilaPolicy,choosenPolicyData,selectedTilaPolicy}) {

  const [state,setState] = useState(
    {
      extended_warranty:selectedTilaPolicy.extended_warranty || '',
      damage_protection:selectedTilaPolicy.damage_protection || ''
    }
  );

  const selectedInput = (e) => {
    console.log(e.currentTarget.dataset.name, e.currentTarget.dataset.id, 'input');
    setTilaPolicy({...choosenPolicyData,[e.currentTarget.dataset.name] : e.currentTarget.dataset.id })
    return setState(prevState => ({ ...prevState, [e.currentTarget.dataset.name]: e.currentTarget.dataset.id }))
  }
  const removePolicy = (e) => {
    console.log(e.currentTarget.getAttribute('data-key'), 'remove')
    delete choosenPolicyData[e.currentTarget.getAttribute('data-key')]
    setTilaPolicy(choosenPolicyData)
    return setState(prevState => ({ ...prevState, [e.currentTarget.getAttribute('data-key')]: '' }))
  }
  const fetchPolicyData = (data) => {

    let result = Object.keys(data).map((key,i) => {
      //console.log('data', data[key]);
        if(Array.isArray(data[key])) {
          return (
            <div key={`index+${i}`} className={`${styles['flex']}`}>
            {
              data[key].map((item,i) => {
                return (
                  <div
                    className={`${state[key] === item.policy_id ? styles['activePolicy']:''}`}
                    key={'sub'+i}
                    data-id={item.policy_id}
                    data-name={key}
                    onChange={selectedInput}
                   >
                    <label>
                      <input
                        type='radio'
                        name={key}
                        value={item.policy_name}
                        checked={state[key] === item.policy_id}
                      />
                        {item.policy_name} | {item.cost.display_value}
                    </label>
                    <span
                      className={`${styles['removeButton']}`}
                      onClick={removePolicy}
                      data-key={key}
                      >
                      Remove
                    </span>
                  </div>
                )
              })
            }
            </div>
          )
        }
    })

    return result
  }
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
      {fetchPolicyData(data)}
      <div className={`${styles['flex']}`}>The extended warranty cost will be added to your cart</div>
    </div>
  )

}
