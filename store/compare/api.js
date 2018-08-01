import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const addToCompare = ({ itemType, productId }) => {
  if(localStorage){
    const compareItems = JSON.parse(localStorage.getItem('compare'));
    if(compareItems.length) {
      if (compareItems[0].itemType === itemType && compareItems.length < 4) {
        localStorage.setItem('compare', JSON.stringify([ ...compareItems, {
          itemType,
          productId,
        }]));
        return Promise.resolve({
          count: compareItems + 1
        });
      } else if(compareItems.length >= 4) {
        return Promise.reject({
          error: 'Only four items can be compared at a time'
        });
      } else {
        return Promise.reject({
          error: 'Only similar item types can be compared'
        });
      }
    } else {
      localStorage.setItem('compare', JSON.stringify([{
        itemType,
        productId,
      }]));
      return Promise.resolve({
        count: 1
      });
    }
  }
}

const getCompareItemsData = (params) => {
  const options = {
    "city": "dubai",
    "country_code": "ksa",
    "flags": {
      "catalog_details": true,
      "include_all_pref_listings": true,
      "include_related_products": true,
      "shipping": true
    },
    "language": "en",
    "listing_ids": [
      "5b07be535ccd9723fdef3d0d", "5b07be505ccd9723fdef3c0d"
    ],
    "product_ids": [
      "PMOBIHNXEDVO0O8T9M", "PMOBUMQUIFMCMRASQV"
    ],
    "size": "LARGE",
    "variant_ids": [
      "VMOBNVDCB9JPIST4EE", "VMOBHBQSYNLTWFEWWL"
    ]
  };
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/`, options);
}

export default { addToCompare, getCompareItemsData };
