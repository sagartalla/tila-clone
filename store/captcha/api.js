import axios from 'axios';
import constants from '../helper/constants';
const captchaDisplay = () => {
  let headers = { 
    headers: { 
      'X-Request-Id': {}
    }
  }
  return axios.get(constants.CAPTCHA_URL, headers).then(({data}) => {
    return data;
  })
}

const captchaVerify = (options) => {
  return axios.post(`${constants.CAPTCHA_URL}/verify`, options).then(({data}) => {
    return data;
  })
}

export default {captchaDisplay, captchaVerify};