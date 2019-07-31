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


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const {
  PDP_PAGE, CART_PAGE, ORDER_PAGE, DELIVERY_ADDR_PAGE,
} = languageDefinations();

const cookies = new Cookie();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const warrantyKeys = { extended_warranty: 'Extended Warranty', damage_protection: 'Damage Protection' };
const warrantyImages = { extended_warranty: <SVGComponent src="icons/common-icon/extended-protection" />, damage_protection: <SVGComponent src="icons/common-icon/damage-protection" /> };


class WarrantyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      tila_care_policy, policies_applied, selectedPolicy,
      addNewWarranty, warrantyChange, deleteWarranty, editWarranty, showWarrantyDetails, warrantyName, selectPolicy,
    } = this.props;
    return (
      <div>
        <PanelGroup accordion className={`${styles['panel-title']} ${styles['mt-30']}`}>
          <Panel eventKey={CART_PAGE.TILA_CARE_PROTECTION}>
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
                              {
                                warrantyName !== newVal && Object.keys(policies_applied).length === 0 ?
                                  <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles['add-warranty-btn']}`} data-name={newVal} onClick={addNewWarranty}> Add </button>
                                  : warrantyName !== newVal && <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles['add-warranty-btn']}`} data-name={newVal} onClick={addNewWarranty}>{policies_applied[newVal] && policies_applied[newVal].policy_type.toLowerCase() === newVal ? 'Edit' : 'Add'}</button>  
                              }
                              {selectedPolicy && warrantyName === newVal &&
                              <button className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['left-radius']} ${styles['add-warranty-btn']}`} data-name={newVal} onClick={selectPolicy}> Done </button>}
                            </div>
                            <div>
                              {Object.keys(policies_applied).map(policyVal =>
                              policyVal === newVal &&
                              <div className={`${styles['ml-60']} ${styles['mb-10']}`}>{CART_PAGE.DURATION}: {policies_applied[policyVal].policy_name}</div>)}
                          </div>

                          </React.Fragment>
                      }
                          {showWarrantyDetails && warrantyName === newVal &&
                            <div className={`${styles['warranty-values']} ${styles.fontW600}`}>
                              <div className={`${styles.flex} ${styles['ml-60']}`}>
                                <input
                                  type="radio"
                                  name="warranty_check"
                                  data-name={newVal}
                                  style={{ margin: '0' }}
                                  className={`${styles['radio-btn']}`}
                                  onChange={warrantyChange}
                                />
                                <div>
                                  <label className={`${styles['fs-12']} ${styles['pl-10']} ${styles['pr-10']}`}>None</label>
                                </div>
                              </div>
                              {tila_care_policy && tila_care_policy[newVal] && tila_care_policy[newVal].length > 0 && tila_care_policy[newVal].map(policyVal => (
                                <div className={`${styles.flex} ${styles['ml-60']}`}>
                                  <input
                                    type="radio"
                                    name="warranty_check"
                                    data-name={newVal}
                                    style={{ margin: '0' }}
                                    policy_name={policyVal.policy_name}
                                    data_policy_id={policyVal.policy_id}
                                    className={`${styles['radio-btn']}`}
                                    onChange={warrantyChange}
                                    defaultChecked={Object.keys(policies_applied).length > 0 &&
                                     policies_applied[newVal] && policies_applied[newVal].policy_id === policyVal.policy_id}
                                  />
                                  <div>
                                    <label className={`${styles['fs-12']} ${styles['pl-10']} ${styles['pr-10']}`}>{policyVal.policy_name}</label>
                                    <span className={`${styles['warranty-radio-button']}`} />
                                    <label className={`${styles['fs-12']} ${styles['pl-10']} ${styles.fontW600}`}>{policyVal.cost.display_value} {policyVal.cost.currency_code}</label>
                                  </div>
                                </div>

                             ))}
                            </div>}

                        </React.Fragment>
                    );
                    })
                }
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}

export default WarrantyPolicy;
