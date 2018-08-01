import _ from 'lodash';
import fp from 'lodash/fp';
import shortid from 'shortid';

const getCompareCount = (store) => {
  return store.compareReducer.data.compareItemsCount;
}

const getCompareInfo = (store) => {
  // return store.compareReducer.data.compareInfo;
  const { compareInfo } = store.compareReducer.data;
  if(!compareInfo.length) {
    return {
      compareCount: 0,
      features: [],
      products: [],
      productsFeatures: [],
    };
  }
  return {
    compareCount: compareInfo.length,
    features: _.uniqBy(_.map(compareInfo[0].product_details.catalog_details.attribute_map, (attr, key) => ({
      key,
      value: attr.attribute_category_name
    })), 'value'),
    products: _.map(compareInfo, (product) => ({
      id: product.product_id,
      imgSrc: product.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
      brand: product.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
      price: product.listing_info.selling_price,
      currency: product.listing_info.selling_price_currency,
      offer: 0,
      name: product.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value
    })),
    productsFeatures: fp.compose(
      _.map((productFeature, key) => ({
        name: key,
        attributes: productFeature
      }),
      _.groupBy((attrMap) => attrMap.attribute_category_name)),
    )(
      _.uniq(compareInfo.reduce((acc, map) => {
          return [...acc, Object.keys((map.product_details.catalog_details.attribute_map))];
        }, [])).map((attrName) => {
          const { attribute_map } = map.product_details.catalog_details;
          return {
            name: attrName,
            items: compareInfo.map((map) => ({
              value: map.product_details.catalog_details.attribute_map[attrName].attribute_values
            })),
            attribute_category_name: map.product_details.catalog_details.attribute_map[attrName].attribute_category_name
          };
        })
    ),
  }
}

export { getCompareCount, getCompareInfo };
