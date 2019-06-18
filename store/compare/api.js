import _ from 'lodash';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import ToastContent from '../../components/common/ToastContent'
import constants from '../helper/constants';
import { languageDefinations } from '../../utils/lang/';

const { API_TEXT } = languageDefinations();
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
  itemtype, productId, src, displayName, categoryId, catalogObj,
}) => {
  const compareItems = getItem();
  const index = _.findIndex(compareItems.products, item => item.productId === productId);
  if (index > -1) {
    toast(
      <ToastContent
        msg={API_TEXT.SAME_ITEM_CANNOT_BE_ADDED_TO_COMPARE}
        msgType='error'
      />
    )
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
      catalogObj,
    }],
  };
  if (compareItems.products.length) {
    if (compareItems.itemtype === itemtype && compareItems.products.length < maxEle) {
      setItem(product);
      toast(
        <ToastContent
          msg={API_TEXT.ITEM_ADDED_TO_COMPARE}
          msgType='success'
        />
      )
      return {
        count: product.products.length,
        compareItems: product,
      };
    } else if (compareItems.products.length >= maxEle) {
      toast(
        <ToastContent
          msg={API_TEXT.ONLY_FIVE_ITEMS_CAN_BE_COMPARED}
          msgType='error'
        />
      )
      return {
        count: maxEle,
        compareItems,
      };
    }
    toast(
      <ToastContent
        msg={API_TEXT.ONLY_SIMILAR_ITEM_TYPES_CAN_BE_COMPARED}
        msgType='error'
      />
    )
    return {
      count: compareItems.products.length,
      compareItems,
    };
  }
  toast(
    <ToastContent
      msg={API_TEXT.ITEM_ADDED_TO_COMPARE}
      msgType='success'
    />
  )
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
  toast(
    <ToastContent
      msg={API_TEXT.ITEM_REMOVED_FROM_COMPARE}
      msgType='success'
    />
  )
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
    event: params.eventName,
    product: [
      {
        productInfo: {
          productID: params.params && params.params.productId,
        },
      },
    ],
  });
};

export default {
  addToCompare,
  getCompareItemsData,
  getCompareCount,
  removeCompareData,
  getBrands,
  getProducts,
  track,
};
