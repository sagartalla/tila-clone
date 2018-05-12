import _ from 'lodash';
import { listingServiceInstance, pimServiceInstance, catalogServiceInstance } from '../helper/services';
import axios from 'axios';

const getProduct = (options) => {
  return listingServiceInstance.post('/api/v1/listing/',options);
};

const getPreview = (options) => {
  return Promise.all([
    pimServiceInstance.get(`/catalog/preview/${options.taskCode}`),
    catalogServiceInstance.get(`/item_type_attribute/${options.itemType}/attributes?request_id=1234567890123456&display_name=true&closed_list_values=true`),
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