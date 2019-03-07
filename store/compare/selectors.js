import _ from 'lodash';
import fp from 'lodash/fp';
import shortid from 'shortid';

const getCompareCount = (store) => {
  return store.compareReducer.data.compareItemsCount;
}

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
    }, [])).map((attrName) => {
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
        const { attribute_values, name} = map.product_details.catalog_details.attribute_map[attrName] || {};
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
      value: attr.attribute_category_name
    })), 'value'),
    products: _.map(compareInfo, (product) => {
      const variant = product.variant_preferred_listings ? Object.keys(product.variant_preferred_listings)[0] : [];
      const variant_info = product.variant_preferred_listings ? product.variant_preferred_listings[variant][0] : {};
      return {
        id: product.product_id,
        imgSrc: product.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
        brand: product.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        price: variant_info.selling_price,
        currency: variant_info.selling_price_currency,
        offer: 0,
        name: product.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
      };
    }),
    productsFeatures: fp.compose(
      fp.map.convert({'cap': false })((productFeature, key) => {
        return ({
          key: key.split(' ').join('_').toLowerCase(),
          name: key,
          attributes: productFeature
        });
      }),
      fp.groupBy((attrMap) => attrMap.attribute_category_name)
    )(b),
  };
  return a;
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

export {
  getCompareCount, getCompareInfo, getBrandsInfo, getProductList,
};
