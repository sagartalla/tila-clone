const express = require('express');
const apiRoutes = express.Router();
const axios = require('axios');
const Cookies = require('universal-cookie');
const _ = require('lodash');

//TODO SF-101 //remove constants from here
const AUTH_API_URL = 'http://gateway-dev.fptechscience.com/auth-service';
const GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api';
const GOOGLE_KEY = 'AIzaSyDrVNKZshUspEprFsNnQD-sos6tvgFdijg';

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
    const auth = req.universalCookies.get('auth');
    return axios.post(`${AUTH_API_URL}/api/v1/refresh`, {
        'auth_version': 'V1',
        'refresh_token': auth.refresh_token
      }).then((res) => {
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
  })
  .get('/googleApi', (req, res) => {
    const {api, latitude, longitude} = req.query;
    return axios
      .get(`${GOOGLE_MAPS_URL}${api}?key=${GOOGLE_KEY}&latlng=${latitude},${longitude}&sensor=true`)
      .then(({data}) => {
        const { results } = data;
        const city = results.length ? _.filter(results[0].address_components, (ac) => {
          return ac.types.indexOf('administrative_area_level_2') !== -1 || ac.types.indexOf('locality') !== -1
        })[0].long_name : null;
        const country = results.length ? _.filter(results[0].address_components, (ac) => {
          return ac.types.indexOf('country') !== -1;
        })[0].long_name : null;
        req.universalCookies.set('city', city, { path: '/' });
        res.json({
          country,
          city,
          displayCity: `${city}, ${country}`,
        });
      });
  })
  .get('/autoCompleteCity', (req, res) => {
    const { api, input } = req.query;
    return axios
      .get(`${GOOGLE_MAPS_URL}${api}?key=${GOOGLE_KEY}&type=(cities)&input=${input}`)
      .then((data) => {
        res.json(data.data.predictions.map((prediction) => {
          const terms = prediction.terms;
          return {
            displayCity: prediction.description,
            city: terms[0].value,
            country: terms[terms.length - 1].value,
          };
        }));
      })
      .catch((e) => {
        res.json(e);
      })
  });




module.exports = apiRoutes;
