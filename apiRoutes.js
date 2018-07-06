const express = require('express');
const apiRoutes = express.Router();
const axios = require('axios');
const Cookies = require('universal-cookie');
const _ = require('lodash');

//TODO SF-101 //remove constants from here
const AUTH_API_URL = 'http://gateway-dev.fptechscience.com/auth-service';

apiRoutes
  .post('/login', (req, res) => {
    const params = req.body;
    return axios.post(`${AUTH_API_URL}/api/v1/login/basic`, Object.assign({}, params, {
      type: 'CUSTOMER',
      authVersion: 'V1'
    })).then(({data, status}) => {
      let isLoggedIn = false;
      if(status === 200) {
        if(!params.rememberMe) {
          delete data.refresh_token;
        }
        req.universalCookies.set('auth', data, { path: '/' });
        req.universalCookies.set('userCreds', { username: params.username }, { path: '/' });
        isLoggedIn = true;
      } else {
        req.universalCookies.remove('auth');
        isLoggedIn = false;
      }
      res.json({
        data: {
          isLoggedIn,
        }
      });
    });
  })
  .post('/refresh', (req, res) => {
    return axios.post(`${AUTH_API_URL}/api/v1/refresh`, {
        'auth_version': 'V1',
        'refresh_token': auth.refresh_token
      }).then((res) => {
        const auth = req.universalCookies.get('auth');
        auth.access_token = res.data.access_token
        req.universalCookies.set('auth', auth, { path: '/' });
        return res.json({});
      }).catch((err) => {
        req.universalCookies.remove('auth');
        return res.json({});
      });
  })
  .post('/logout', (req, res) => {
    req.universalCookies.remove('auth');
    return res.json({});
  })
  .post('/setCookie', (req, res) => {
    let {data, options} = req.body;
    let cookieOption = {
      path: '/',
    }
    options = options || {};
    if(options.expires){
      cookieOption.expires = new Date(options.expires);
    }
    _.forEach(data, (val, key) => {
      req.universalCookies.set(key, val, cookieOption);
    });
    return res.json({});
  })
  .post('/deleteCookie', () => {
    const params = req.body;
    params.forEach((key) => {
      req.universalCookies.remove('key');
    });
    res.json({});
  });


module.exports = apiRoutes;
