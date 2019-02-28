import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Btn from '../common/Button';
import { Col } from 'react-bootstrap';
import { mergeCss } from '../../utils/cssUtil';
import { actionCreators } from '../../store/cam/personalDetails';
import SVGComponent from '../common/SVGComponet';
const styles = mergeCss('components/Login/login');

class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            success: false,
            password: '',
            confirmPassword: '',
        }
        this.passwordSuccess = this.passwordSuccess.bind(this);
    }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    passwordSuccess() {
      const { password, confirmPassword } = this.state;
      if(password===confirmPassword){
        let body = {
          'password': password,
          'token': this.props.token
        }
        this.props.resetPassword(body);
        console.log(this.props.resetPassword(body));
        this.setState({
          success: true
        })
      }else{
        alert('Passwords do not match');
        this.setState({
          password: '',
          confirmPassword: '',
        })
      }
    }

    render(){
      const { password, confirmPassword } = this.state;
        return (
            <div>
            {!this.state.success ?
              <div className={styles['forgot-password']}>
                <h2><b>Reset Password</b></h2>
                <h3 className={styles['bg-light-gray']}>
                    Please set your secure password.
                </h3>
                <form>
                <div>
                    <label>Enter your new password here</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChange}
                      required
                    />
                </div>
                <div>
                    <label>Confirm your new password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={this.onChange}
                      required
                    />
                </div>
                <Col xs={12} md={12} className={`${styles['pt-30']}`}>
                    <Btn className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-large']} ${styles['update-profile-btn']} ${styles['text-uppercase']}`} btnText='SAVE PASSWORD' BtnClickHandler={this.passwordSuccess} />
                </Col>
                </form>
              </div>
            :
                <>
                    <Col xs={12} md={12} className={`${styles['flex-center']} ${styles['tickmark-part']}`}>
                        <SVGComponent clsName={`${styles['tickmark-icon']}`} src="icons/common-icon/bg-tick-mark" />
                    </Col>
                    <h2 className={styles['text-center']}><b>Password Reset Successfully</b></h2>
                </>
            }
            </div>
        );
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        resetPassword: actionCreators.resetPassword,
      },
      dispatch,
    );
}

export default connect(null, mapDispatchToProps)(ResetPassword);
