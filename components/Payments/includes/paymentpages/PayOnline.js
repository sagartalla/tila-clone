import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../../store/payments';
import Voucher from './Voucher';
import { languageDefinations } from '../../../../utils/lang/';
import { mergeCss } from '../../../../utils/cssUtil';
import Button from '../../../common/CommonButton';

const styles = mergeCss('components/Payments/payment');
const { PAYMENT_PAGE } = languageDefinations();

class PayOnline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disableSaveCard: false
    }
    this.saveCardHandler = this.saveCardHandler.bind(this);
    this.fetchIframe = this.fetchIframe.bind(this);
  }

  saveCardHandler(e) {
    this.props.saveCard(e);
    this.setState({ disableSaveCard: true });
  }

  fetchIframe() {
    const { data } = this.props;
    this.props.makeProcessRequest({
      payment_details: [{
        payment_mode: data.type,
      }]
    });
    this.props.disableAllOthers({
      except: data.type
    });
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
    const { disableSaveCard, iframe_url } = this.state

    return (
      <div className={`${styles['pay-online']}`}>
        <Voucher voucherData={voucherData} />
        <div>
          {
            iframe_url
              ?
              <div className={`${styles['pt-20']} ${styles['pb-20']}`}>
                <iframe src={iframe_url} style={{ height: '426px', width: '500px', border: '0' }}></iframe>
                <div className={styles['checkbox-material']}>
                  <input id="save-card" type="checkbox" onClick={this.saveCardHandler} disabled={disableSaveCard} />
                  <label for="save-card"> Save this card </label>
                </div>
              </div>
              :
              <div className={`${styles['pt-30']} ${styles['pb-30']}`}>
                <p className={`${styles['mb-25']} `}>Once you click on Add New Card. There is no going back. You can't access any other modes of payment.</p>
                <Button
                  className={`${styles['text-uppercase']} ${styles['new-card-btn']} ${styles['fs-16']} ${styles['border-radius']} ${styles['ht-40']} ${styles.width55}`}
                  onClick={this.fetchIframe}
                  btnText={'Pay' + ' ' + data.amount_to_pay + ' ' + data.currency_code + ' ' + 'Using New Card'}
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
