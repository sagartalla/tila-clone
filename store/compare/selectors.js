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
      for(let index in compareInfo) {
        const { attribute_category_name } = compareInfo[index].product_details.catalog_details.attribute_map[attrName] || {}
        if(attribute_category_name){
          attributeCategoryName = attribute_category_name || ''
          break;
        }
      }
      return {
        name: attrName,
        items: compareInfo.map((map) => {
          const { attribute_values, name} = map.product_details.catalog_details.attribute_map[attrName] || {};
          return ({
            id: (name || '')  + shortid.generate(),
            value: attribute_values || [{value: 'N/A'}]
          });
        }),
        attribute_category_name: attributeCategoryName
      };
    });
  const a = {
    compareCount: compareInfo.length,
    features: _.uniqBy(_.map(compareInfo[0].product_details.catalog_details.attribute_map, (attr, key) => ({
      key: attr.attribute_category_name.split(' ').join('_').toLowerCase(),
      value: attr.attribute_category_name
    })), 'value'),
    products: _.map(compareInfo, (product) => {
      const variant = Object.keys(product.variant_preferred_listings)[0];
      const variant_info = product.variant_preferred_listings[variant][0];
      return {
        id: product.product_id,
        imgSrc: product.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
        brand: product.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        price: variant_info.selling_price,
        currency: variant_info.selling_price_currency,
        offer: 0,
        name: product.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value
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
}

export { getCompareCount, getCompareInfo };
