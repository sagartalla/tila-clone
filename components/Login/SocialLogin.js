/*eslint-disable*/
import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import SVGComponent from '../common/SVGComponet';
import { mergeCss } from '../../utils/cssUtil';
import { connect } from 'react-redux';
import { selectors, actionCreators } from '../../store/auth';

const styles = mergeCss('components/Login/login');

const snMetaObj = {
  'google': {
    channel: "GOOGLE_AUTH",
    metadata: "google.access_token"
  },
  'facebook': {
    channel: "FACEBOOK_AUTH",
    metadata: "fb.access_token"
  },
  'instagram': {
    channel: "INSTAGRAM_AUTH",
    metadata: "instagram.code"
  }
}

class SocialLogin extends Component {
  
  constructor(props){
    super(props);
  }

  handleSocialLogin = (socialNetwork) => (e) => {
    switch(socialNetwork) {
      case 'google': googleAuth2 ? this.checkGoogleResponse() : this.showErrorAlert(socialNetwork); break;
      case 'facebook': FB ? this.fbLogin() : this.showErrorAlert(socialNetwork); break;
      case 'instagram': this.instaLogin(); break;
      default: console.log(socialNetwork)
    }
  }

  getTokenCall = (socialNetwork, token) => {
    const serverData = {
      "channel": snMetaObj[socialNetwork].channel,
      "metadata": {
        [snMetaObj[socialNetwork].metadata]: token
      }
    }
    this.props.userLogin(serverData)
  }

  showErrorAlert = (socialNetwork) => {
    window.alert(`Unable to currently support ${socialNetwork} login, Pls try later or other network`);
  }

  googleSignIn = () => {
    googleAuth2.signIn().then(this.checkGoogleResponse).catch(err => console.log(err));
  }
  checkGoogleResponse = () => { 
    if(googleAuth2.isSignedIn.get()){
      this.getGoogleUserData();
    } else {
      this.googleSignIn();
    }
  }
  getGoogleUserData = () => {
    let { id_token } = googleAuth2.currentUser.get().getAuthResponse();
    this.getTokenCall('google', id_token);
  }

  checkFBResponse = (res) => {
    if(res.status === 'connected') {
      this.getFBUserData(res.authResponse);
    }
  }
  fbLogin = () => {
    FB.login(this.checkFBResponse, {scope: 'public_profile,email'})
  }
  getFBUserData = (tokenResponse) => {
    let { accessToken } = tokenResponse
    this.getTokenCall('facebook', accessToken)
    // FB.api('/me', function(response) {
    //   console.log(response);
    // });
  }

  instaLogin = () => {
    window.location = instaLoginURL;
  }

  render(){
    return(
      <NoSSR>
        <div className={styles['flex']}>
          <a className={styles['flex']} onClick={this.handleSocialLogin('facebook')}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-facebook" /></a>
          <a className={styles['flex']} onClick={this.handleSocialLogin('google')}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-google" /></a>
          {/* <a className={styles['flex']} onClick={this.handleSocialLogin('twitter')}><SVGComponent clsName={`${styles['bg-social-icon']} ${styles['mr-10']}`} src="icons/social-icons/bg-twitter" /></a>
          <a className={styles['flex']} onClick={this.handleSocialLogin('instagram')}><SVGComponent clsName={`${styles['bg-social-icon']}`} src="icons/social-icons/bg-instagram" /></a> */}
        </div> 
      </NoSSR>     
    )
  }
}

export default connect((store) => ({error: selectors.getErrorMessege(store)}), {userLogin: actionCreators.userLogin,})(SocialLogin)




