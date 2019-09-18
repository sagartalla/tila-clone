import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/payments';
import SavedCards from './SavedCards';
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
      process: false,
      disableNewCard: false,
    }
    this.saveCardHandler = this.saveCardHandler.bind(this);
    this.fetchIframe = this.fetchIframe.bind(this);
    this.disableNewCard = this.disableNewCard.bind(this);
  }

  saveCardHandler(e) {
    this.props.saveCard(e);
  }

  componentDidMount() {
    this.setState({
      process: false,
      disableNewCard: false
    });
  }

  fetchIframe() {
    const { data } = this.props;
    this.setState({
      process: true
    }, () => {
      this.props.makeProcessRequest({
        payment_details: [{
          payment_mode: data.type,
        }]
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.processData && this.state.process) {
      this.setState({
        iframe_url: nextProps.processData.iframe_url
      });
    }
  }

  disableNewCard() {
    this.setState({
      disableNewCard: true
    })
  }

  render() {
    const { voucherData, savedCardsData, data, processData, showLoading } = this.props;
    const { disableSaveCard, iframe_url, disableNewCard } = this.state;

    return (
      <div className={`${styles['pay-online']} ${styles['pb-10']}`}>
        <Voucher voucherData={voucherData} />
        {
          iframe_url
            ?
              null
            :
            (savedCardsData
              ?
                <SavedCards
                  data={savedCardsData}
                  disableNewCard={this.disableNewCard}
                />
              :
                null)
        }
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
                {
                  disableNewCard
                    ?
                    null
                    :
                    <Button
                      className={`${styles['text-uppercase']} ${styles['new-card-btn']} ${styles['fs-16']} ${styles['border-radius']} ${styles['float-r']}`}
                      onClick={this.fetchIframe}
                      btnText={PAYMENT_PAGE.PAY + ' ' + data.amount_to_pay.currency_code + ' ' + data.amount_to_pay.display_value + ' ' + PAYMENT_PAGE.USING_NEW_CARD}
                      hoverClassName="hoverBlueBackground"
                      btnLoading={showLoading}
                    />
                }
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
