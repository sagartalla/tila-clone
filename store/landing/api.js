import _ from 'lodash';
import {pimServiceInstance} from '../helper/services';
import axios from 'axios';
import constants from '../helper/constants';

const getPages = () => {
  const options = {
    method: 'GET',
    headers: {
      "Accept": "*/*",
      "X-Auth-User": "123"
    },
    url: constants.TRANSFORMER_API_URL,
  };

  return axios(options);
};

export default { getPages };
