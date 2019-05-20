import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Bin from './Bin';
import Box from './Box';
import { languageDefinations } from '../../../utils/lang';
import SVGComponent from '../SVGComponet';
import {actionCreators, selectors} from '../../../store/captcha';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Router } from '../../../routes';

const { PAYMENT_PAGE } = languageDefinations();

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const initialState = {
  openBox: 'openbox',
  boxText: 'opentext',
}

class Captcha extends React.Component{
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
      txnId: this.props.txnId || null
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
    if(this.props.getVerification === "FAILURE") {
      this.setState({
        openBox:'errorbox',
        boxText:'errortext'
      })

    } else if(this.props.getVerification === "SUCCESS"){
      // this.props.captchaQuestion({
      //   txnId: this.props.txnId
      // });
      this.setState({
        openBox:'successbox',
        boxText:'successtext'
      },() => this.props.onCaptchaSuccess({
        captcha_request_id: items.request_id
      }))
    }else{
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

    const captchaOptions = [items,this.state,this.handleClick,this.handleDrop]

    return (
      this.props.render(captchaOptions)
    )


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
