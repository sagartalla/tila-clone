import React from 'react';
import { Row, Col, PanelGroup, Panel } from 'react-bootstrap';
import moment from 'moment';
import Cookie from 'universal-cookie';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../cart_en.styl';
import styles_ar from '../cart_ar.styl';

/* eslint-disable */
const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const {
  PDP_PAGE, CART_PAGE, ORDER_PAGE, DELIVERY_ADDR_PAGE,
} = languageDefinations();

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const warrantyKeys = { extended_warranty: CART_PAGE.EXTENDED_WARRANTY, damage_protection: CART_PAGE.DAMAGE_PROTECTION };
const warrantyImages = { extended_warranty: <SVGComponent src="icons/common-icon/extended-protection" />, damage_protection: <SVGComponent src="icons/common-icon/damage-protection" /> };


class WarrantyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      tila_care_policy, policies_applied, selectedPolicy, warrantyIndex, removeWarranty, hideRadio,
      addNewWarranty, warrantyChange, deleteWarranty, editWarranty, showWarrantyDetails, warrantyName, selectPolicy,
    } = this.props;
    let isWarrantyExists = false;
    tila_care_policy && Object.keys(tila_care_policy).length > 0 && Object.keys(tila_care_policy).map(policyVal => {
      if (((tila_care_policy[policyVal] === null) || (tila_care_policy[policyVal] === 0)) ||  (tila_care_policy[policyVal] && tila_care_policy[policyVal].length === 0)) {
        isWarrantyExists = false;
      } else {
        isWarrantyExists = true;
      }
    })
    return (
      <div>
           {isWarrantyExists &&
                  <PanelGroup accordion className={`${styles['panel-title']} ${styles['mt-30']}`} >
                    <Panel>
                      <Panel.Heading className={`${styles['panel-heading']}`}>
                        <Panel.Title toggle className={`${styles['black-color']} ${styles['panel-width']} ${styles['flx-spacebw-alignc']}`}>
                          <div className={`${styles.flex} ${styles['justify-between']}`}>
                            <div className={`${styles['fs-14']} ${styles.fontW600}`}>{CART_PAGE.TILA_CARE_PROTECTION}</div>
                            <div className={`${styles.flex}`}>
                              <SVGComponent clsName={`${styles['down-icon']}`} src="icons/common-icon/down-arrow" />
                            </div>
                          </div>
                        </Panel.Title>
                      </Panel.Heading>
                    <Panel.Body collapsible>
                    {tila_care_policy && Object.keys(tila_care_policy).map((newVal) => {
                      if (newVal === 'max_limit_per_user') return null;
                      return (
                        <React.Fragment>
                    {tila_care_policy[newVal] !== null &&
                          <React.Fragment>
                            <div className={`${styles['panel-body-border']} ${styles['flex-center']} ${styles['justify-between']}`}>
                              <div className={`${styles['flex-center']}`}>
                                <div className={`${styles.fontW600} ${styles['warranty-icon']}`}>{warrantyImages[newVal]}</div>
                                <div className={`${styles.fontW600} ${styles['warranty-values']}`}>{warrantyKeys[newVal]}</div>
                                <div className={`${styles['text-blue']} ${styles['fs-12']}`}><a href="/en/policy/warranty-policy" target="_blank">{CART_PAGE.VIEW_T_AND_C}</a></div>
                              </div>
                              {warrantyName !== newVal && policies_applied[newVal] && policies_applied[newVal].policy_type.toLowerCase() === newVal && <div className={`${styles.fontW600} ${styles['flex-center']}`}><div className={`${styles['fs-12']}`}>{policies_applied[newVal].cost && policies_applied[newVal].cost.currency_code}</div>
                              <div className={`${styles['fs-14']} ${styles['ml-5']}`}>
                              {policies_applied[newVal].cost && policies_applied[newVal].cost.display_value}
                              </div>
                              </div>}
                              {
                                warrantyName !== newVal && Object.keys(policies_applied).length === 0 ?
                                  <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles['add-warranty-btn']}`} data-name={newVal} onClick={addNewWarranty}> + Add </button>
                                  : (warrantyName !== newVal && (((policies_applied[newVal]) === undefined ? true : policies_applied[newVal].policy_type.toLowerCase() !== newVal))) && <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles['add-warranty-btn']}`} data-name={newVal} onClick={addNewWarranty}> + Add</button>
                              }
                              {selectedPolicy && warrantyName === newVal &&
                              <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles['add-warranty-btn']}`} data-name={newVal} onClick={selectPolicy}> Done </button>}
                            </div>
                            <div>
                              {policies_applied[newVal] && policies_applied[newVal].policy_type.toLowerCase() === newVal && <div className={`${styles['ml-60']} ${styles['mb-10']}`}>{CART_PAGE.DURATION}: {policies_applied[newVal].policy_name}</div>}
                          </div>
                          </React.Fragment>}
                            <div className={`${styles['warranty-values']} ${styles.fontW600}`}>
                            <form>
                              {tila_care_policy && tila_care_policy[newVal] && tila_care_policy[newVal].length > 0 && tila_care_policy[newVal].map((policyVal, index) => (
                                ((policies_applied[newVal] && policies_applied[newVal].policy_type.toLowerCase() === newVal) || (showWarrantyDetails && warrantyName === newVal)) &&
                                <div className={`${styles['flex-center']} ${styles['ml-45']} ${styles['mb-5']}`}>
                                  <input
                                    type="radio"
                                    name="warranty_check"
                                    key={newVal}
                                    data-index={index}
                                    data-name={newVal}
                                    style={{ margin: '0' }}
                                    policy_name={policyVal.policy_name}
                                    data_policy_id={policyVal.policy_id}
                                    className={`${styles['radio-btn']}`}
                                    onChange={warrantyChange}
                                    checked={
                                      (selectedPolicy !== '' && warrantyName === newVal && warrantyIndex === index) || (warrantyName !== newVal && policies_applied[newVal] && policies_applied[newVal].policy_id === policyVal.policy_id)}
                                  />
                                  <div style={{ width: '150px' }}>
                                    <label className={`${styles['fs-12']} ${styles['pl-10']} ${styles['mb-0']} ${styles['pr-10']}`}>{policyVal.policy_name}</label>
                                    <span className={`${styles['warranty-radio-button']}`} />
                                    <label className={`${styles['fs-12']} ${styles['pl-10']} ${styles.fontW600} ${styles['mb-0']}`}>{policyVal.cost.currency_code} {policyVal.cost.display_value}</label>
                                  </div>
                                  <div className={`${styles['ml-20']}`}>
                                  {((selectedPolicy !== '' && warrantyName === newVal && warrantyIndex === index) || (warrantyName !== newVal && Object.keys(policies_applied).length > 0 && policies_applied[newVal] && policies_applied[newVal].policy_id === policyVal.policy_id)) ?
                                  <div data-name={newVal} data_policy_id={policyVal.policy_id} onClick={removeWarranty}>
                                  <SVGComponent clsName={`${styles['cross-icon']} ${styles.pointer}`} src="icons/common-icon/cross-icon" /></div> : ''}</div>
                                </div>

                             ))}
                             </form>
                            </div>

                        </React.Fragment>
                      );
                    })
                }
            </Panel.Body>
          </Panel>
        </PanelGroup>}

      </div>
    );
  }
}

export default WarrantyPolicy;
