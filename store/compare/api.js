import _ from 'lodash';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

import constants from '../helper/constants';

const cookies = new Cookies();

const maxEle = 5;

const itemFormat = {
  categoryId: '',
  itemtype: '',
  products: [],
};

const getItem = () => JSON.parse(localStorage.getItem('compare')) || itemFormat;
const setItem = product => localStorage.setItem('compare', JSON.stringify(product));

const getCompareCount = () => {
  const compareItems = getItem();
  return {
    count: compareItems.length,
    compareItems,
  };
};

const addToCompare = ({
  itemtype, productId, src, displayName, categoryId,
}) => {
  const compareItems = getItem();
  const index = _.findIndex(compareItems.products, item => item.productId === productId);
  if (index > -1) {
    toast.error('Same item cannot be added to compare');
    return {
      count: compareItems.products.length,
      compareItems,
    };
  }
  const product = {
    itemtype: compareItems.itemtype || itemtype,
    categoryId: compareItems.categoryId || categoryId,
    products: [...compareItems.products, {
      productId,
      src,
      displayName,
    }],
  };
  if (compareItems.products.length) {
    if (compareItems.itemtype === itemtype && compareItems.products.length < maxEle) {
      setItem(product);
      toast.success('Item added to compare');
      return {
        count: product.products.length,
        compareItems: product,
      };
    } else if (compareItems.products.length >= maxEle) {
      toast.error('Only five items can be compared at a time');
      return {
        count: maxEle,
        compareItems,
      };
    }
    toast.error('Only similar item types can be compared');
    return {
      count: compareItems.products.length,
      compareItems,
    };
  }
  toast.success('Item added to compare');
  setItem(product);
  return {
    count: 1,
    compareItems: product,
  };
};

const getCompareItemsData = (item) => {
  if (item) {
    const {
      itemtype, productId, src, displayName, categoryId,
    } = item;
    const compareItems = getItem();
    const product = {
      itemtype: compareItems.itemtype || itemtype,
      categoryId: compareItems.categoryId || categoryId,
      products: [...compareItems.products, {
        productId,
        src,
        displayName,
      }],
    };
    setItem(product);
  }
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
    product_ids: getItem().products.map(product => product.productId),
    size: 'LARGE',
  };
  return axios.post(`${constants.LISTING_API_URL}/api/v1/listing/`, options);
};

const removeCompareData = (id) => {
  let compareItems = getItem();
  compareItems.products = compareItems.products.filter(data => data.productId !== id);
  if (compareItems.products.length === 0) {
    compareItems = itemFormat;
  }
  toast.success('Item removed from compare');
  setItem(compareItems);
  return {
    count: compareItems.length,
    compareItems,
    id,
  };
};

const getBrands = () => {
  const options = {
    isListed: false,
    itemType: getItem().itemtype,
    language: 'en',
    limit: -1,
    sort: 'index',
  };
  return axios.post(`${constants.SEARCH_API_URL}/all/brands`, options);
};

const getProducts = (brand = '') => {
  const country = cookies.get('country');
  const language = cookies.get('language');
  const product = getItem();
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
const track = (params) => {
  window.appEventData.push({
    "event": params.eventName,
    "product": [
      {
        "productInfo": {
          "productID": params.params.productId,
        }
      }
    ]
  });}
export default {
  addToCompare,
  getCompareItemsData,
  getCompareCount,
  removeCompareData,
  getBrands,
  getProducts,
  track,
};
