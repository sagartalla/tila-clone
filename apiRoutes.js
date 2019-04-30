const express = require('express');
const apiRoutes = express.Router();
const axios = require('axios');
const Cookies = require('universal-cookie');
const _ = require('lodash');
const constants = require('./store/helper/constants/constants');
//TODO SF-101 //remove constants from here
// const constants.AUTH_API_URL = 'http://gateway-dev.fptechscience.com/auth-service';
const GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api';
const GOOGLE_KEY = 'AIzaSyDrVNKZshUspEprFsNnQD-sos6tvgFdijg';


const removeCookies = (req,res) => {
  req.universalCookies.remove('auth');
  req.universalCookies.remove('userCreds');
  req.universalCookies.remove('ptaToken');
  req.universalCookies.remove('isVerified');
  return res.json({});
}
apiRoutes
  .post('/login', (req, res) => {
    const params = req.body;
    return axios.post(`${constants.AUTH_API_URL}/api/v1/sls/auth`, Object.assign({}, params, {})).then(({data, status}) => {
      let isLoggedIn = false;
      debugger
      if(status === 200) {
        // if(!params.rememberMe) {
        //   delete data.refresh_token;
        // }
        req.universalCookies.set('auth', data, { path: '/' });
        req.universalCookies.set('userCreds', { username: params.metadata.username || '' }, { path: '/' });
        isLoggedIn = true;
      } else {
        req.universalCookies.remove('auth');
        isLoggedIn = false;
      }
      res.status(status);
      res.json({
        data: {
          isLoggedIn,
        }
      });
    }).catch(({response}) => {
      res.status(response.status)
      res.json({
        data: {
          isLoggedIn: false,
          error: response.data
        }
      })

    });
  })
  .post('/refresh', (req, res) => {
    const auth = req.universalCookies.get('auth');
    return axios.post(`${constants.AUTH_API_URL}/api/v1/refresh`, {
        'auth_version': 'V1',
        'refresh_token': auth.refresh_token
      }).then((data) => {
        auth.access_token = data.data.access_token
        req.universalCookies.set('auth', auth, { path: '/' });
        return res.json({});
      }).catch((err) => {
        req.universalCookies.remove('auth');
        return res.json({});
      });
  })
  .post('/logout', (req, res) => {
    const auth = req.universalCookies.get('auth');
    if(!auth) {
      return removeCookies(req,res)

    }
    return axios.put(`${constants.AUTH_API_URL}/api/v1/sls/lo`, null, {
      headers: { 'x-access-token': req.headers['x-access-token'] || '' }
    }).then((response) => {
      if (response && response.status === 200) {
        return removeCookies(req,res)
      }
    });
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
  .post('/deleteCookie', (req, res) => {
    const { keys } = req.body;
    keys.forEach((key) => {
      req.universalCookies.remove(key);
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
        const returnData = {
          country,
          city,
          displayCity: `${city}, ${country}`,
        };
        req.universalCookies.set('shippingInfo', returnData);
        res.json(returnData);
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
