import _ from 'lodash';
import fp from 'lodash/fp';
import shortid from 'shortid';

const getCompareCount = (store) => {
  return store.compareReducer.data.compareItemsCount;
}

const getAddToCartDetails = (store, results) => {
  const items = store.cartReducer.data.items || [];
  if (!items.length) {
    return results;
  }
  const cartListingIds = items.map(i => i.listing_id) || [];
  return {
    ...results,
    products: results.products.map((product) => {
      return {
        ...product,
        addedToCart: cartListingIds.indexOf(product.listing_id) > -1,
      };
    }),
  };
};

const getCompareInfo = (store) => {
  // return store.compareReducer.data.compareInfo;
  const { compareInfo } = store.compareReducer.data;
  if (!compareInfo.length) {
    return {
      compareCount: 0,
      features: [],
      products: [],
      productsFeatures: [],
    };
  }

  const b = _.uniq(compareInfo.reduce((acc, map) => {
    return [...acc, ...Object.keys((map.product_details.catalog_details.attribute_map))];
  }, [])).filter((attrName) => {
    let include = true;
    let attValue;
    for (const index in compareInfo) {
      attValue = compareInfo[index].product_details.catalog_details.attribute_map[attrName];
      include = include && (attValue ? attValue.visible : true);
    }
    return include;
  }).map((attrName) => {
    let attributeCategoryName = '';
    let displayString = '';
    for (const index in compareInfo) {
      const attName = compareInfo[index].product_details.catalog_details.attribute_map[attrName];
      const { attribute_category_name, display_string } = attName || {};
      if (attribute_category_name && !attributeCategoryName) {
        attributeCategoryName = attribute_category_name || '';
      }
      if (display_string && !displayString) {
        displayString = display_string;
      }
    }

    return {
      name: displayString,
      items: compareInfo.map((map) => {
        const { attribute_values, name } = map.product_details.catalog_details.attribute_map[attrName] || {};
        return ({
          id: (name || '') + shortid.generate(),
          value: attribute_values || [{ value: 'N/A' }],
        });
      }),
      attribute_category_name: attributeCategoryName,
    };
  });
  const a = {
    compareCount: compareInfo.length,
    features: _.uniqBy(_.map(compareInfo[0].product_details.catalog_details.attribute_map, (attr, key) => ({
      key: attr.attribute_category_name.split(' ').join('_').toLowerCase(),
      value: attr.attribute_category_name,
      visible: attr.visible,
    })).filter((a) => a.visible), 'value'),
    products: _.map(compareInfo, (product) => {
      const variant = product.variant_preferred_listings ? Object.keys(product.variant_preferred_listings)[0] : [];
      const variant_info = product.variant_preferred_listings ? product.variant_preferred_listings[variant][0] : {};
      const variant_key = product && product.product_details && product.product_details.product_details_vo && product.product_details.product_details_vo.cached_variant && product.product_details.product_details_vo.cached_variant.length > 0  ? Object.keys(product.product_details.product_details_vo.cached_variant)[0] : null;
      const tuinId = product && product.product_details && product.product_details.product_details_vo && product.product_details.product_details_vo.cached_variant && product.product_details.product_details_vo.cached_variant.length > 0 ? product.product_details.product_details_vo.cached_variant[variant_key].attribute_map.tuin.attribute_values[0].value : null
      return {
        id: product.product_id,
        listing_id: variant_info.listing_id,
        imgSrc: product.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
        brand: product.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        variant_id: variant_info.variant_id,
        catalog_id: product.product_details.catalog_details.catalog_id,
        item_type: product.product_details.catalog_details.item_type_name,
        price: variant_info.selling_price,
        currency: variant_info.selling_price_currency,
        offer: 0,
        name: product.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
        tuin: tuinId,
        stock_count: product.variant_preferred_listings !== null && Object.values(product.variant_preferred_listings)[0],
      };
    }),
    productsFeatures: fp.compose(
      fp.map.convert({ 'cap': false })((productFeature, key) => {
        return ({
          key: key.split(' ').join('_').toLowerCase(),
          name: key,
          attributes: productFeature
        });
      }),
      fp.groupBy((attrMap) => attrMap.attribute_category_name)
    )(b),
  };
  return getAddToCartDetails(store, a);
};

const getBrandsInfo = (store) => {
  const { brands } = store.compareReducer.data;
  return brands.facetResponse && brands.facetResponse.facets && brands.facetResponse.facets[0].Values;
};

const getProductList = (store) => {
  const { products } = store.compareReducer.data;
  return products.productResponse && products.productResponse.products &&
    products.productResponse.products.map(product => ({
      productId: product.id,
      displayName: product.attributes.calculated_display_name[0],
      media: product.attributes.media_unrestricted_images,
      itemtype: product.attributes.itemType,
    }));
};

const getCmpData = store => store.compareReducer.data.compareItems || {
  products: [],
};

const getCompareItemsCount = () => () => JSON.parse(localStorage.getItem('compare')) || {
  products: [],
};

export {
  getCompareCount,
  getCompareInfo,
  getBrandsInfo,
  getProductList,
  getCmpData,
  getCompareItemsCount,
  getAddToCartDetails,
};
