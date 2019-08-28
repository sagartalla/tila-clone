/*eslint-disable*/
import React, { Component } from 'react';
import NoSSR from 'react-no-ssr';
import SVGComponent from '../common/SVGComponet';
import { connect } from 'react-redux';
import { selectors, actionCreators } from '../../store/auth';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './login_en.styl';
import styles_ar from './login_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


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

  componentDidMount() {
    // window.onload = () => {
    //   this.getTokenCall('instagram', location.search.code);
    // }
  }

  handleSocialLogin = (socialNetwork) => (e) => {
    switch(socialNetwork) {
      case 'google': googleAuth2 ? this.googleSignIn() : this.showErrorAlert(socialNetwork); break;
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
      },
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
    const callbackMethod = [this.handleSocialLogin]
    return this.props.children(callbackMethod)
  }
}

export default connect((store) => ({error: selectors.getErrorMessege(store)}), {userLogin: actionCreators.userLogin,})(SocialLogin)
