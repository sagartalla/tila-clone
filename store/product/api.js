import _ from 'lodash';
import {pimServiceInstance} from '../helper/services';
import axios from 'axios';
import constants from '../helper/constants';

const getProduct = (options) => {
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/`,options);
};

const getPreview = (options) => {
  return Promise.all([
    pimServiceInstance.get(`/catalog/preview/${options.taskCode}`),
    axios.get(`${constants.CATALOG_API_URL}/item_type_attribute/${options.itemType}/attributes?request_id=1234567890123456&display_name=true&closed_list_values=true`),
  ]).then(([pimData, catalogData]) => {
    return {
      data: {
        pimData: pimData.data.data,
        catalogData: catalogData.data,
      }
    };
  });
}


export default { getProduct, getPreview };
