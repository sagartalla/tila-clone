import _ from 'lodash';

const getProduct = (store, variantId) => {
  const { product_details, variant_preferred_listings } = store.productReducer.data[0];
  const computedVariantId = variantId || Object.keys(variant_preferred_listings || {})[0]
  const listings = computedVariantId ? variant_preferred_listings[computedVariantId] : [];
  const catalogAttributeMap = product_details.catalog_details.attribute_map;
  const productAttributeMap = product_details.product_details_vo.cached_product_details.attribute_map

  let activeCount = 0, listingInventryCount = 0;
  let priceInfo = listings ? listings.filter((listing) => {
    if(listing.total_inventory_count <= 0 ) {
      listingInventryCount++;
    }
    if(!listing.active) {
      activeCount++;
    }
    return listing.total_inventory_count > 0 && listing.active
  }) : [];
  priceInfo = priceInfo.length ? priceInfo[0] : null;
  const availabilityError = activeCount === listings.length;
  const stockError = listingInventryCount === listings.length;
  const titleInfo = {
    brand: product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
    title: productAttributeMap.calculated_display_name.attribute_values[0].value,
    rating: {
      rating: '',
      count: ''
    },
    reviews: {
      count: ''
    },
    price: priceInfo ? priceInfo.selling_price + ' ' + priceInfo.selling_price_currency : 'Price Not available',
    originalPrice: '',
    discountPercent: '',
    totalInventoryCount: priceInfo ? priceInfo.total_inventory_count : 0,
  };
  const shippingInfo = priceInfo ? priceInfo.shipping : {}
  const returnInfo = {
    acceptsReturns: priceInfo ? priceInfo.accepts_returns : false,
    maxDaysToReturn: priceInfo ? priceInfo.max_days_to_return : 0
  }
  const offerInfo = {
    price: priceInfo ? priceInfo.selling_price + ' ' + priceInfo.selling_price_currency : 'No listing',
    listingId: priceInfo ? priceInfo.listing_id : 'No Listing',
    listingAvailable: !!priceInfo,
    availabilityError,
    stockError,
  }
  const keyfeatures = _.map(productAttributeMap.calculated_highlights.attribute_values, (kf) => kf.value);
  const details = catalogAttributeMap.description ? catalogAttributeMap.description.attribute_values.map((d) => d.value).join(', ') : null;
  const imgUrls = product_details.product_details_vo.cached_product_details.media.gallery_media;
  return {
    titleInfo,
    details,
    keyfeatures,
    imgUrls,
    offerInfo,
    shippingInfo,
    returnInfo,
    catalog: _.groupBy(catalogAttributeMap, (attrMap) => attrMap.attribute_category_name)
  };
};

const getVariants = (store) => {
  const { similar_products, product_details } = store.productReducer.data[0];
  const { product_details_vo } = product_details;
  const { cached_product_details } = product_details_vo;
  const identityAttr = _.filter(cached_product_details.attribute_map, { attribute_group_name: 'IDENTITY' }).map((attr) => attr.name);
  let variants = similar_products.map((product) => {
    const obj = identityAttr.reduce((acc, attrName) => {
      return {
        ...acc,
        [attrName]: product.product_details_vo.cached_product_details.attribute_map[attrName].attribute_values[0].value,
      }
    }, obj);
    obj.pId = product.product_details_vo.cached_product_details.product_id;
    obj.vId = product.listing.variant_id;
    return obj;
  });
  const obj = identityAttr.reduce((acc, attrName) => {
    return {
      ...acc,
      [attrName]: product_details.product_details_vo.cached_product_details.attribute_map[attrName].attribute_values[0].value,
    }
  }, {});
  obj.pId = product_details.product_details_vo.cached_product_details.product_id;
  obj.vId = Object.keys(product_details.product_details_vo.cached_variant)[0];
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
      id: attrName,
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
    brand: attributes.brand.attributeValues.length ? attributes.brand.attributeValues[0].value : 'Brand not found',
    title: attributes.display_title.attributeValues.length ? attributes.display_title.attributeValues[0].value : 'Title Not Found',
    rating: {
      rating: '',
      count: '',
    },
    reviews: {
      count: '',
    },
    price: 'No price Info',
    originalPrice: '',
    discountPercent: '',
  };
  const keyfeatures = _.map(attributes.highlights.attributeValues, (kf) => kf.value);
  const productKeys = Object.keys(products)
  const imgUrls = productKeys.length ?  products[productKeys[0]].media.galleryMedia.map((item) => ({
    type: item.mediaType,
    url: item.url,
    caption: item.caption,
    order: item.order,
    restricted: item.isRestricted,
  })) : [];
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

const getSelectedVariantId = (store) => (options) => {
  const selectedVariant = _.filter(options.variants, options.selectedVariantData)[0];
  return {
    pId: selectedVariant.pId,
    vId: selectedVariant.vId,
  }
}

export { getProduct, getVariants, getPreview, getSelectedVariantId };
