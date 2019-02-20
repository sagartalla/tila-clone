import _ from 'lodash';
import axios from 'axios';
import constants from '../helper/constants';

const getCompareCount = () => {
  const compareItems = JSON.parse(localStorage.getItem('compare')) || [];
  return {
    count: compareItems.length,
  };
};

const addToCompare = ({
  itemtype, productId, src, displayName,
}) => {
  const compareItems = JSON.parse(localStorage.getItem('compare')) || [];
  const index = _.findIndex(compareItems, item => item.productId === productId);
  if (index > -1) {
    alert('Same item cannot be added to compare');
    return {
      count: compareItems.length,
    };
  }
  if (compareItems.length) {
    if (compareItems[0].itemtype === itemtype && compareItems.length < 4) {
      localStorage.setItem('compare', JSON.stringify([...compareItems, {
        itemtype,
        productId,
        src,
        displayName,
      }]));
      return {
        count: compareItems.length + 1,
      };
    } else if (compareItems.length >= 4) {
      alert('Only four items can be compared at a time');
      return {
        count: 4,
      };
    }
    alert('Only similar item types can be compared');
    return {
      count: compareItems.length,
    };
  }
  localStorage.setItem('compare', JSON.stringify([{
    itemtype,
    productId,
    src,
    displayName,
  }]));
  return {
    count: 1,
  };
};

const getCompareItemsData = () => {
  const options = {
    country_code: 'SAU',
    flags: {
      catalog_details: true,
      category_tree_bread_crumb: true,
      category_tree_finance: true,
      include_related_products: true,
      shipping: true,
    },
    language: 'en',
    product_ids: JSON.parse(localStorage.getItem('compare')).map(product => product.productId),
    size: 'LARGE',
  };
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/`, options);
};

const removeCompareData = (id) => {
  let compareItems = JSON.parse(localStorage.getItem('compare')) || [];
  compareItems = compareItems.filter(data => data.productId !== id);
  localStorage.setItem('compare', JSON.stringify(compareItems));
  return {
    count: compareItems.length,
  }
}

export default {
  addToCompare, getCompareItemsData, getCompareCount, removeCompareData,
};
