import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Bin from './Bin';
import Box from './Box';
import { languageDefinations } from '../../../../utils/lang/';
import SVGComponent from '../../../common/SVGComponet';
import { mergeCss } from '../../../../utils/cssUtil';
import {actionCreators, selectors} from '../../../../store/captcha';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Router } from '../../../../routes';

const { PAYMENT_PAGE } = languageDefinations();
const styles = mergeCss('components/Payments/payment');

const initialState = {
  openBox: <SVGComponent clsName={`${styles['drop-box-icon']}`} src="icons/captcha-icons-list/box-icon" />,
  boxText: <span className={`${styles['fs-12']} ${styles['pt-20']}`}>Drop the Answer icon into the box Above</span>,
}

class CashOnDelivery extends React.Component{
  constructor() {
    super();
    this.state = { checked: false,
      continueButton: null,
      initialState
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
              <span style={{color: '#dd1e31'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>Error. Please Try Again</span><br/>
              <span className={`${styles['fs-12']} ${styles['pt-20']}`}>Drop the Answer icon into the box Above</span>
            </div>,
            continueButton: null,
          })
    }else if(this.props.getVerification==="SUCCESS"){
      this.props.captchaQuestion();
      this.setState({openBox: <SVGComponent clsName={`${styles['success_box-icon']}`} src="icons/captcha-icons-list/success_box-icon" />, 
        boxText: <span style={{color: '#99cc33'}} className={`${styles['fs-16']} ${styles['pt-20']}`}>&nbsp;Success</span>,
        continueButton: <button className={`${styles['fp-btn']} ${styles['fs-16']} ${styles['fontW600']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']}`} onClick={() => Router.push(`/thankyou/${this.props.orderRes.orderRes.order_id}/SUCCESSFUL`)} >Continue</button>})
    }else{
      return;
    }
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
    this.props.captchaQuestion();
    if(this.state.checked===false){
      this.setState(initialState)
    }
  }

  handleClick() {
    this.props.captchaQuestion()
    this.setState(initialState)
  }

  render() {
    const content = this.state.checked 
      ? <div className={`${styles['flx-spacebw-alignc']} ${styles['pt-30']} ${styles['pb-30']}`}>
            <div>
              <ul className={`${styles['pl-0']} ${styles['m-0']} ${styles['cash-tab']}`}>
                <li>Visual</li>
              </ul>
              <div className={`${styles['captch-inn']} ${styles['p-20']}`}>
                <span className={`${styles['flx-spacebw-alignc']} ${styles['refresh-part']} ${styles['pb-20']}`}>
                  <span className={styles['fs-12']}>{this.props.getCaptcha.question}</span>
                    <span onClick={this.handleClick} className={`${styles['flex']} ${styles['refresh-part-inn']} ${styles['p-5']}`}>
                      <SVGComponent clsName={`${styles['refresh-icon']}`} src="icons/captcha-icons-list/refresh-icon" />
                    </span>
                </span>
              <div>
              <div className={`${styles['flex-center']} ${styles['captcha-icon-part']}`}>
                {
                  this.props.getCaptcha.images ? this.props.getCaptcha.images.slice(0,5).map((image) => { //.slice has to be removed as soon as backend rectifies the response from their end
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
      : null;

    return <div>
        <div className={`${styles['cash-on-dly-points']}`}>
    <Row className={styles['pl-40']}>
      <Col md={12}>
        <h4 className={`${styles['fontW300']} ${styles['fs-20']} ${styles['lgt-blue']} ${styles['mt-0']} ${styles['pb-10']}`}>Pay on Delivery</h4>
    <div className={styles['checkbox-material']}>
      <input id="pay-delivery" type="checkbox" onChange={ this.handleChange } checked={ this.state.checked }/>
      <label for="pay-delivery"> I agree to pay cash on delivery </label>
    </div>
    { content }
    </Col>
    <Col md={6} sm={12} xs={12}>
       {this.state.continueButton}
    </Col>
    </Row>
  </div>
  </div>;
  }
}

CashOnDelivery.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(CashOnDelivery));