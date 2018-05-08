import _ from 'lodash';

const getProduct = (store, variantId) => {
  const { product_details, variant_preferred_listings } = store.productReducer.data[0];
  const computedVariantId = variantId || Object.keys(variant_preferred_listings || {})[0]
  const priceInfo = computedVariantId ? variant_preferred_listings[computedVariantId][0] : null;
  const titleInfo = {
    brand: product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
    title: product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
    rating: {
      rating: '! 4',
      count: '! 187'
    },
    reviews: {
      count: '! 25'
    },
    price: priceInfo ? priceInfo.selling_price + ' ' + priceInfo.selling_price_currency : 'No listing',
    originalPrice: '! 1949.00 SAR',
    discountPercent: '! -60%',
  };
  const keyfeatures = _.map(product_details.product_details_vo.cached_product_details.attribute_map.calculated_highlights.attribute_values, (kf) => kf.value);
  const imgUrls = product_details.product_details_vo.cached_product_details.media.gallery_media;
  return {
    titleInfo,
    keyfeatures,
    imgUrls,
    catalog: _.groupBy(product_details.catalog_details.attribute_map, (attrMap) => attrMap.attribute_category_name)
  };
};

const getVariants = (store) => {
  const { similar_products, product_details } = store.productReducer.data[0];
  const identityAttr = _.filter(product_details.product_details_vo.cached_product_details.attribute_map, { attribute_group_name: 'IDENTITY' }).map((attr) => attr.name);
  let variants = similar_products.map((product) => {
    const obj = identityAttr.reduce((acc, attrName) => {
      return { 
        ...acc,
        [attrName]: product.product_details_vo.cached_product_details.attribute_map[attrName].attribute_values[0].value,
      }
    }, obj);
    obj.pId = product.product_details_vo.cached_product_details.product_id;
    return obj;
  });
  const obj = identityAttr.reduce((acc, attrName) => {
    return { 
      ...acc,
      [attrName]: product_details.product_details_vo.cached_product_details.attribute_map[attrName].attribute_values[0].value,
    }
  }, obj);
  obj.pId = product_details.product_details_vo.cached_product_details.product_id;
  variants = [...variants, obj];

  const displayTitle = identityAttr.reduce((acc, attrName) => {
    return {
      ...acc,
      [attrName]: product_details.product_details_vo.cached_product_details.attribute_map[attrName].display_string,
    }
  },{});

  const variantsForDisplay = identityAttr.reduce((acc, attrName) => {
    return acc.concat({
      title: displayTitle[attrName],
      options: _.uniq(variants.map((variant) => variant[attrName])),
    });
  }, []);
  return {
    variantsForDisplay,
    variants,
  }
};

const getPreview = (store) => {
  const { attributes, products } = store.productReducer.data.pimData;
  const { catalogData } = store.productReducer.data;
  const titleInfo = {
    brand: attributes.brand.attributeValues[0].value,
    title: attributes.display_title.attributeValues.length ? attributes.display_title.attributeValues[0].value : 'Title Not Found',
    rating: {
      rating: "! 4",
      count: "! 187"
    },
    reviews: {
      count: "! 25"
    },
    price: 'No price Info',
    originalPrice: "! 1949.00 SAR",
    discountPercent: "! -60%"
  };
  const keyfeatures = _.map(attributes.highlights.attributeValues, (kf) => kf.value);
  const imgUrls = products[Object.keys(products)[0]].media.galleryMedia.map((item) => ({
    type: item.mediaType,
    url: item.url,
    caption: item.caption,
    order: item.order,
    restricted: item.isRestricted,
  }));
  const catalog = _.reduce(attributes, (acc, attrVal, attrKey) => {
    const groupName = _.find(catalogData, { attributeName: attrKey }).attributeCategoryName;
    acc[groupName] = acc[groupName] || [];
    acc[groupName].push({
      display_string: attrKey,
      attribute_values: attrVal.attributeValues,
    })
    return acc;
  }, {});

  return {
    titleInfo,
    keyfeatures,
    imgUrls,
    catalog,
  };
};

export default { getProduct, getVariants, getPreview };
