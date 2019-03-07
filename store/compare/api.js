import _ from 'lodash';
import axios from 'axios';
import Cookies from 'universal-cookie';

import constants from '../helper/constants';

const cookies = new Cookies();

const maxEle = 5;

const getCompareCount = () => {
  const compareItems = JSON.parse(localStorage.getItem('compare')) || [];
  return {
    count: compareItems.length,
  };
};

const addToCompare = ({
  itemtype, productId, src, displayName, categoryId,
}) => {
  const compareItems = JSON.parse(localStorage.getItem('compare')) || [];
  const index = _.findIndex(compareItems, item => item.productId === productId);
  if (index > -1) {
    alert('Same item cannot be added to compare');
    return {
      count: compareItems.length,
    };
  }
  const product = {
    itemtype,
    productId,
    src,
    displayName,
    categoryId,
  };

  if (compareItems.length) {
    if (compareItems[0].itemtype === itemtype && compareItems.length < maxEle) {
      localStorage.setItem('compare', JSON.stringify([...compareItems, product]));
      return {
        count: compareItems.length + 1,
      };
    } else if (compareItems.length >= maxEle) {
      alert('Only five items can be compared at a time');
      return {
        count: maxEle,
      };
    }
    alert('Only similar item types can be compared');
    return {
      count: compareItems.length,
    };
  }
  localStorage.setItem('compare', JSON.stringify([product]));
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
    id,
  };
};

const getBrands = () => {
  const options = {
    isListed: false,
    itemType: JSON.parse(localStorage.getItem('compare'))[0].itemtype,
    language: 'en',
    limit: -1,
    sort: 'index',
  };
  return axios.post(`${constants.SEARCH_API_URL}/all/brands`, options);
};

const getProducts = (brand = '') => {
  const country = cookies.get('country');
  const language = cookies.get('language');
  const product = JSON.parse(localStorage.getItem('compare'))[0];
  const options = {
    country,
    facetFilters: {
      brand: [brand],
    },
    language,
    pageNum: 1,
    pageSize: 100,
    query: product.itemtype,
    isListed: false,
    requestContext: 'CUSTOMER_BROWSE',
    categoryFilter: {
      id: product.categoryId,
    },
  };

  return axios.get(`${constants.SEARCH_API_URL}/search?query=${escape(JSON.stringify(options))}`);
};

export default {
  addToCompare,
  getCompareItemsData,
  getCompareCount,
  removeCompareData,
  getBrands,
  getProducts,
};
