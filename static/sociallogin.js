/*eslint-disable*/
var googleAuth2 = '';
const instagramAppID = 'e75178e4dcd24b18a6cd5e650c73d9d8';
const facebookAppID = '1978888652213386';
const googleAppID = '289717607267-r4ij4arfmkdhshvfd93thqedb71nbojn.apps.googleusercontent.com';

const instaLoginURL = 'https://api.instagram.com/oauth/authorize/?client_id=' + instagramAppID + '&redirect_uri=' + window.location.origin + '&response_type=code';

initialSocialLogin();

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://apis.google.com/js/platform.js?onload=initialiseGoogleAuth2";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'google-jssdk'));

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId      : facebookAppID,
    cookie     : true,
    xfbml      : true,
    version    : 'v3.2'
  });
  FB.AppEvents.logPageView();
};

function initialSocialLogin() {
  const searchQuery = window.location.search
  if(searchQuery.includes('code')) {
    const searchObj = getSearchObj(searchQuery);
    'code' in searchObj && window.localStorage.setItem('instagramCode', searchObj.code);
    // fetch(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`).then(res => res.ok ? res.text() : res.statusText).then(res => console.log(JSON.parse(res)))
  }
}

function initialiseGoogleAuth2 () {
  gapi.load( "auth2", () => {
    googleAuth2 = gapi.auth2.init({
      client_id: googleAppID,
    });
    googleAuth2.then(gAuthInitSuccess, gAuthInitFailure);
  })
}


function gAuthInitSuccess(){
  console.log('gauth loaded')
}

function gAuthInitFailure(){
  console.log('gauth loading failed');
}

function getSearchObj(queryString) {
  const queryArray = queryString.replace('?', '').split('&');
  const queryObj = queryArray.reduce((a,v,i) => {
    const [key, value] = v.split('=');
    a[key] = value;
    return a;
  }, {})
  return queryObj;
}
