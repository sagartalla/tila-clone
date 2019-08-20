import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/payments';
import Voucher from './Voucher';
import { languageDefinations } from '../../../../utils/lang/';
import Button from '../../../common/CommonButton';

import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../payment_en.styl';
import styles_ar from '../../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { PAYMENT_PAGE } = languageDefinations();

class PayOnline extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.saveCardHandler = this.saveCardHandler.bind(this);
    this.fetchIframe = this.fetchIframe.bind(this);
  }

  saveCardHandler(e) {
    this.props.saveCard(e);
  }

  fetchIframe() {
    const { data } = this.props;
    this.props.makeProcessRequest({
      payment_details: [{
        payment_mode: data.type,
      }]
    });
    // this.props.disableAllOthers({
    //   except: data.type
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.processData) {
      this.setState({
        iframe_url: nextProps.processData.iframe_url
      });
    }
  }

  render() {
    const { voucherData, data, processData, showLoading } = this.props;
    const { disableSaveCard, iframe_url } = this.state;

    return (
      <div className={`${styles['pay-online']} ${styles['pb-10']}`}>
        <Voucher voucherData={voucherData} />
        <div>
          {
            iframe_url
              ?
              <div className={`${styles['pt-20']} ${styles['pb-20']}`}>
                <iframe sandbox="allow-forms allow-modals allow-popups-to-escape-sandbox allow-popups allow-scripts allow-top-navigation allow-same-origin" src={iframe_url} style={{ height: '426px', width: '500px', border: '0' }} class="h-200 desktop:h-376 w-full"></iframe>
                <div className={styles['checkbox-material']}>
                  <input id="save-card" type="checkbox" onClick={this.saveCardHandler} disabled={disableSaveCard} />&nbsp;
                  <label htmlFor="save-card"> {PAYMENT_PAGE.SAVE_THIS_CARD} </label>
                </div>
              </div>
              :
              <div className={`${styles['pt-30']} ${styles['pb-30']}`}>
                <p className={`${styles['mb-25']} `}>{PAYMENT_PAGE.ONCE_YOU_CLICK_ON_ADD_NEW_CARD_THERE_IS_NO_GOING_BACK}</p>
                <Button
                  className={`${styles['text-uppercase']} ${styles['new-card-btn']} ${styles['fs-16']} ${styles['border-radius']}`}
                  onClick={this.fetchIframe}
                  btnText={PAYMENT_PAGE.PAY + ' ' + data.amount_to_pay.currency_code + ' ' + data.amount_to_pay.display_value + ' ' + PAYMENT_PAGE.USING_NEW_CARD}
                  hoverClassName="hoverBlueBackground"
                  btnLoading={showLoading}
                />
              </div>
          }
        </div>
      </div>
    );
  }
}


const mapStateToprops = (store) => ({
  processData: selectors.getProcessData(store),
  showLoading: selectors.getLoader(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      makeProcessRequest: actionCreators.makeProcessRequest
    },
    dispatch,
  );


export default connect(mapStateToprops, mapDispatchToProps)(PayOnline);
