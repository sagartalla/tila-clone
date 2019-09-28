import axios from 'axios';
import constants from '../helper/constants';
import { toast } from 'react-toastify';
import { languageDefinations } from '../../utils/lang/';

const { API_TEXT } = languageDefinations();

const captchaDisplay = ({txnId}) => {
  let headers = {
    headers: {
      'X-Request-Id': {}
    }
  }
  let uri = `${constants.CAPTCHA_URL}?txnId=${txnId}`
  if (txnId === null)
    uri = `${constants.CAPTCHA_URL}`
  return axios.get(uri, headers).then(({data}) => {
    return data;
  })
}

const captchaVerify = (options) => {
  return axios.post(`${constants.CAPTCHA_URL}/verify`, options).then(({data}) => {
    return data;
  }).catch(() => {
    toast(API_TEXT.MAXIMUM_ATTEMPSTS_REACHED);
  })
}

export default {captchaDisplay, captchaVerify};
