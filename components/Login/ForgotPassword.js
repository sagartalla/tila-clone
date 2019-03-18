import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Btn from '../common/Button';
import { Col, FormGroup } from 'react-bootstrap';
import { mergeCss } from '../../utils/cssUtil';
import { selectors , actionCreators } from '../../store/cam/personalDetails';
import { actionCreators as authActionCreators} from '../../store/auth';
import VerifyStatus from './VerifyStatus';
const styles = mergeCss('components/Login/login');


class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            validation: '',
        }
        this.sendLink = this.sendLink.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.switchState = this.switchState.bind(this);
    }

    sendLink() {
        let body = {
            'email' : this.state.email
        }
        this.props.forgotPassword(body);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.forgotPasswordStatus==='SUCCESS'){
            this.setState({validation: 'True'})
        }else{
            this.setState({validation: 'False'})
        }
  
    }

    handleChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    switchState() {
        this.setState({
            validation: ''
        })
    }

    render(){
        return (
            
            <div className={styles['forgot-password']}>
                <h2><b>Forgot Password?</b></h2>
                { this.state.validation==='' ?
                <div>
                    <div className={`${styles['fp-input']} ${styles['pb-10']}`}> 
                        <input name="email" type="email" onChange={this.handleChange} placeholder='Registered Email ID' required />
                    </div>
                    <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                        <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText='SEND VERIFICATION LINK' onClick={this.sendLink} />
                    </Col>
                </div> 
                :
                <div>
                    <VerifyStatus resetLogin={this.props.resetShowLogin} switchState={this.switchState} validation={this.state.validation} forgotPasswordStatus={this.props.forgotPasswordStatus}/>
                </div> 
                }
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return ({
      forgotPasswordStatus: selectors.forgotPasswordStatus(store),
    })
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        forgotPassword: actionCreators.forgotPassword,
        resetShowLogin: authActionCreators.resetShowLogin,
      },
      dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);