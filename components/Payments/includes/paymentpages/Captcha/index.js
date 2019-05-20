import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Bin from './Bin';
import Box from './Box';
import { languageDefinations } from '../../../../../utils/lang/';
import SVGComponent from '../../../../common/SVGComponet';
import {actionCreators, selectors} from '../../../../../store/captcha';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Router } from '../../../../../routes';

const { PAYMENT_PAGE, ORDER_PAGE } = languageDefinations();

import lang from '../../../../../utils/language';

import styles_en from '../../../payment_en.styl';
import styles_ar from '../../../payment_ar.styl';

import main_en from '../../../../../layout/main/main_en.styl';
import main_ar from '../../../../../layout/main/main_ar.styl';
import styles_en from '../../../payment_en.styl';
import styles_ar from '../../../payment_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const initialState = {
  openBox: <SVGComponent clsName={`${styles['drop-box-icon']}`} src="icons/captcha-icons-list/box-icon" />,
  boxText: <span className={`${styles['fs-12']} ${styles['pt-20']}`}>{PAYMENT_PAGE.DROP_THE_ANSWER_INTO_BOX}</span>,
}

class Captcha extends React.Component {
  constructor() {
    super();
    this.state = { checked: false,
      continueButton: null,
      ...initialState
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.captchaQuestion({
      txnId: this.props.txnId
    });
  }

  async handleDrop(id){
    let items = this.props.getCaptcha;
    const index = items.images.findIndex(image => image.image_id===id);
    let options = {
      "image_id": items.images[index].image_id,
      "question_id": items.question_id,
      "request_id": items.request_id
    }
    await this.props.verifyCaptcha(options);
    if(this.props.getVerification==="FAILURE") {
      this.setState({openBox: <SVGComponent clsName={`${styles['error_box-icon']}`} src="icons/captcha-icons-list/error_box-icon" />,
          boxText:
            <div style={{textAlign: "center"}}>
              <span style={{color: '#dd1e31'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>{PAYMENT_PAGE.ERROR_PLEASE_TRY_AGAIN}</span><br/>
              <span className={`${styles['fs-12']} ${styles['pt-20']}`}>{PAYMENT_PAGE.DROP_THE_ANSWER_INTO_BOX}</span>
            </div>
          })
    } else if(this.props.getVerification==="SUCCESS"){
      this.setState({openBox: <SVGComponent clsName={`${styles['success_box-icon']}`} src="icons/captcha-icons-list/success_box-icon" />,
        boxText: <span style={{color: '#99cc33'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>&nbsp;{ORDER_PAGE.SUCCESS}</span>
      });
      this.props.onCaptchaSuccess({
        captcha_request_id: items.request_id
      });
      this.props.onContinueHandle();
    } else {
      return;
    }
  }

  handleClick() {
    this.props.captchaQuestion({
      txnId: this.props.txnId
    });
    this.setState(initialState)
  }

  render() {
    const items = this.props.getCaptcha;
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
                      <span onClick={this.handleClick} className={`${styles['flex']} ${styles['refresh-part-inn']} ${styles['p-5']}`}>
                        <SVGComponent clsName={`${styles['refresh-icon']}`} src="icons/captcha-icons-list/refresh-icon" />
                      </span>
                  </span>
                <div>
                <div className={`${styles['flex-center']} ${styles['captcha-icon-part']}`}>
                  {
                    items.images ? items.images.slice(0,5).map((image) => { //.slice has to be removed as soon as backend rectifies the response from their end
                      return <Box image={image} index={image.image_id} handleDrop={(id) => this.handleDrop(id)}/>
                    } ):
                  <div>
                    Loading Captcha...
                  </div>
                  }
                  </div>
                  </div>
                </div>
              </div>
              <Bin openBox={this.state.openBox} boxText={this.state.boxText}/>
           </div>
        :
          null
    );

  //   return <div>
  //       <div className={`${styles['cash-on-dly-points']}`}>
  //   <Row className={styles['pl-40']}>
  //     <Col md={12}>
  //       <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-10']}`}>Pay on Delivery</h4>
  //   <div className={styles['checkbox-material']}>
  //     <input id="pay-delivery" type="checkbox" onChange={ this.handleChange } checked={ this.state.checked }/>
  //     <label for="pay-delivery"> I agree to pay cash on delivery </label>
  //   </div>
  //   { content }
  //   </Col>
  //   <Col md={6} sm={12} xs={12}>
  //      {this.state.continueButton}
  //   </Col>
  //   </Row>
  // </div>
  // </div>;
  }
}

Captcha.propTypes = {
  makePayment: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => ({
  getCaptcha: selectors.getCaptcha(store),
  getVerification: selectors.getVerification(store),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      verifyCaptcha: actionCreators.verifyCaptcha,
      captchaQuestion: actionCreators.captchaQuestion,
    }, dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Captcha));
