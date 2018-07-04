import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const userLogin = (params) => {
  return axios.post(`${constants.AUTH_API_URL}/api/v1/login/basic`, Object.assign({}, params, {
    type: 'CUSTOMER',
    authVersion: 'V1'
  })).then(({data, status}) => {
    let isLoggedIn = false;
    // cart merge
    axios.put(`${constants.CART_API_URL}/api/v1/cart/merge`);
    if(status === 200) {
      localStorage.setItem('userCreds', JSON.stringify(params));
      localStorage.setItem('auth', JSON.stringify(data));
      isLoggedIn = true;
    } else {
      localStorage.removeItem('auth');
      isLoggedIn = false;
    }
    return {
        data: {
          isLoggedIn,
        }
      }
  });
}

const userRegister = (params) => axios.post(`${constants.CMS_API_URL}/api/v1/user/register`, params);

const userLogout = () => {
  localStorage.removeItem('auth');
}

const getLoginInfo = () => {
  return {
    userCreds: JSON.parse(localStorage.getItem('userCreds') || '{}'),
    isLoggedIn: !!localStorage.getItem('auth')
  };
}

const deriveCity = (params) => {
  return axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDrVNKZshUspEprFsNnQD-sos6tvgFdijg&latlng=${params.latitude},${params.longitude}&sensor=true`)
    .then(({results}) => {
      return results.length ? null : _.filter(results[0].address_components, (ac) => { return ac.type.indexOf('administrative_area_level_2') !== -1 })
    })
}

export default { userLogin, userRegister, userLogout, getLoginInfo, deriveCity };
