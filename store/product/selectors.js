import _ from 'lodash';

const getProduct = (store, variantId) => {
  const {
    product_details, variant_preferred_listings, tree, product_id,
  } = store.productReducer.data[0];
  variantId = store.productReducer.variantsData.selectedVariantId || variantId;
  variantId = variantId || Object.keys(variant_preferred_listings || {})[0]
  const computedVariantId = variantId;
  let listings = (computedVariantId && variant_preferred_listings) ? variant_preferred_listings[computedVariantId] : _.reduce(variant_preferred_listings, (acc, val, key) => {
    return [...acc, ...val];
  }, []);
  listings = listings || [];
  const catalogAttributeMap = product_details.catalog_details.attribute_map;
  const productAttributeMap = product_details.product_details_vo.cached_product_details.attribute_map
  // let activeCount = 0, listingInventryCount = 0;
  let priceInfo = listings ? listings.filter((listing) => {
    // if(listing.total_inventory_count <= 0 ) {
    //   listingInventryCount++;
    // }
    // if(!listing.active) {
    //   activeCount++;
    // }
    return listing.total_inventory_count > 0 && listing.active
  }) : [];
  let warranty = tree.finance.filter((data)=> data.isLeaf === true)[0].warranty ? JSON.parse(tree.finance.filter((data)=> data.isLeaf === true)[0].warranty) : null; //converting 'warranty' into JSON
  priceInfo = priceInfo.length ? priceInfo[0] : null;

  const availabilityError = !priceInfo;
  const stockError = !priceInfo;

  const imgUrls = product_details.product_details_vo.cached_product_details.media.gallery_media;
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
    listingId: priceInfo ? priceInfo.listing_id : 'No Listing',
    totalInventoryCount: priceInfo ? priceInfo.total_inventory_count : 0,
    product_id,
    itemtype: product_details.catalog_details.item_type_name,
    media: imgUrls[0].url,
    categoryId: tree.breadcrumb[tree.breadcrumb.length - 1].id,
  };
  const returnInfo = {
    acceptsReturns: priceInfo ? priceInfo.accepts_returns : false,
    maxDaysToReturn: priceInfo ? priceInfo.max_days_to_return : 0,
  }
  const shippingInfo = priceInfo ? {...priceInfo.shipping, ...returnInfo} : {}
  const offerInfo = {
    price: priceInfo ? priceInfo.selling_price + ' ' + priceInfo.selling_price_currency : 'No listing',
    listingId: priceInfo ? priceInfo.listing_id : 'No Listing',
    listingAvailable: !!priceInfo,
    availabilityError,
    stockError,
    offerPricing: priceInfo ? {
      strickedPrice: priceInfo.pricing.mrp,
      showPrise: priceInfo.pricing.offer_price,
      sellingPrice: priceInfo.pricing.price,
      discount: priceInfo.pricing.discount_per_mrp,
      offerMesseges: priceInfo.pricing.actions ? priceInfo.pricing.actions.map((a) => a.description) : [],
      offerDiscounts: priceInfo.pricing.actions ? priceInfo.pricing.actions.map((a) => a.discount) : [],
      totalDiscountMRP: priceInfo.pricing.total_discount_mrp,
      currency: priceInfo.mrp_currency
    } : 'No Listing'
  }
  const variant_id = variant_preferred_listings ? Object.keys(variant_preferred_listings)[0] : '';

  const catalogObj = {
    catalog_id: product_details.catalog_details.catalog_id,
    item_type: product_details.catalog_details.item_type_name,
    product_id: product_details.product_id,
    variant_id
  }
  const keyfeatures = _.map(productAttributeMap.calculated_highlights.attribute_values, (kf) => kf.value);
  const extraOffers = priceInfo ? priceInfo.pricing.extra_offers_detail : [];
  const details = catalogAttributeMap.description ? catalogAttributeMap.description.attribute_values.map((d) => d.value).join(', ') : null;
  let productDescription = product_details.product_details_vo.cached_product_details.rich_product_desc
  productDescription = productDescription.length > 0 ? _.sortBy(productDescription,['order']) : null
  return {
    titleInfo,
    details,
    keyfeatures,
    imgUrls,
    extraOffers,
    offerInfo,
    shippingInfo,
    returnInfo,
    product_id,
    productDescription,
    catalogObj,
    breadcrums: tree.breadcrumb,
    warranty,
    categoryType: tree.finance ? tree.finance[0].display_name_en : '',
    catalog: _.groupBy(_.filter(catalogAttributeMap, (val) => val.visible), (attrMap) => attrMap.attribute_category_name)
  };
};

const getVariants = (store) => {
  // remove this method
  const { similar_products, product_details } = store.productReducer.data[0];
  const { product_details_vo } = product_details;
  const { cached_product_details } = product_details_vo;
  const identityAttr = _.filter(cached_product_details.attribute_map, { attribute_group_name: 'IDENTITY' }).map((attr) => attr.name);
  let variants = (similar_products || []).map((product) => {
    const obj = identityAttr.reduce((acc, attrName) => {
      const aMap = product_details.product_details_vo.cached_product_details.attribute_map;
      if(aMap[attrName]) {
        return {
          ...acc,
          [attrName]: product_details.product_details_vo.cached_product_details.attribute_map[attrName].attribute_values[0].value,
        }
      }
      return {
        ...acc
      }
    }, obj);
    obj.pId = product.product_details_vo.cached_product_details.product_id;
    obj.vId = product.listing.variant_id;
    return obj;
  });
  const obj = identityAttr.reduce((acc, attrName) => {
    const aMap = product_details.product_details_vo.cached_product_details.attribute_map;
    if(aMap[attrName]) {
      return {
        ...acc,
        [attrName]: product_details.product_details_vo.cached_product_details.attribute_map[attrName].attribute_values[0].value,
      }
    }
    return {
      ...acc
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

const getVariantsAndSimilarProducts = (store) => {
  const { variantsData } = store.productReducer;
  const { availableSimilarProducts } = variantsData || {};
  const { similar_products, product_details, variant_preferred_listings } = store.productReducer.data[0];
  const { item_type_name: itemType, catalog_id: catalogId } = product_details.catalog_details;
  const { product_id: productId, product_details_vo } = product_details;
  const { cached_product_details } = product_details_vo;
  const { attribute_map } = cached_product_details;
  // sample output
  // const variants = {
  //   display: {
  //     size: {
  //       displayName: 'Size',
  //       values: ['s', '', '']
  //     },
  //     something_else: {
  //       displayName: 'Something Else',
  //       values: ['', '', '']
  //     }
  //   },
  //   map: {
  //     [variantId]: {
  //       size:'s',
  //       somethingElse: ''
  //     }
  //   }]
  // }
  const variants = _.reduce(product_details.product_details_vo.cached_variant, (acc, value, key) => {
    const display = {
      ...acc.display
    };
    const map = {
      ...acc.map
    };
    map[key] =  map[key] || {};
    _.forEach(value.attribute_map, (attVal, attKey) => {
      if(attVal.attribute_group_name !== 'IDENTITY') {
        return;
      }
      if(!display[attKey]) {
        display[attKey] = {
          displayName: attVal.display_string,
          values: []
        }
      }
      display[attKey].values = _.uniq([...display[attKey].values, ...(attVal.attribute_values.map((i) => i.value))]);
      if(!map[key][attKey]) {
        map[key][attKey] = [];
      }
      map[key] = {
        ...map[key],
        [attKey]: [...map[key][attKey], ...(attVal.attribute_values.map((i) => i.value))]
      };
    });
    return {
      ...acc,
      display,
      map
    };
  }, { display: {}, map: [] });
  // sample output
  // const similarProducts = {
  //   display: {
  //     color: {
  //       displayName: 'Color',
  //       values: ['red', '', '']
  //     },
  //     something_else: {
  //       displayName: 'Something Else',
  //       values: ['', '', '']
  //     }
  //   },
  //   map: {
  //     [productId]: {
  //       color:'red',
  //       somethingElse: ''
  //     }
  //   }]
  // }
  const similarProducts = similar_products ? _.reduce([product_details, ...similar_products], (acc, product) => {
    if(availableSimilarProducts && !availableSimilarProducts[product.product_details_vo.cached_product_details.product_id]) return acc;
    const key = product.product_details_vo.cached_product_details.product_id;
    const display = {
      ...acc.display
    };
    const map = {
      ...acc.map
    };
    map[key] =  map[key] || {};
    _.forEach(product.product_details_vo.cached_product_details.attribute_map, (attVal, attKey) => {
      if(attVal.attribute_group_name !== 'IDENTITY' || !attVal.searchable) {
        return;
      }
      if(!display[attKey]) {
        display[attKey] = {
          displayName: attVal.display_string,
          values: []
        }
      }
      display[attKey].values = _.uniq([...display[attKey].values, ...(attVal.attribute_values.map((i) => i.value))]);
      if(!map[key][attKey]) {
        map[key][attKey] = [];
      }
      map[key] = {
        ...map[key],
        [attKey]: [...map[key][attKey], ...(attVal.attribute_values.map((i) => i.value))]
      };
    });
    return {
      ...acc,
      display,
      map
    };
  }, { display: {}, map: [] }) : { display: {}, map: [] };
  return {
    variants, similarProducts, itemType, catalogId, productId
  };
}

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
    const cItem = _.find(catalogData, { attributeName: attrKey });
    if(cItem){
      const groupName = cItem.attributeCategoryName;
      const isVisible = cItem.isVisible;
      if(isVisible) {
        acc[groupName] = acc[groupName] || [];
        acc[groupName].push({
          display_string: attrKey,
          attribute_values: attrVal.attributeValues,
        });
      }
    }
    return acc;
  }, {});

  return {
    titleInfo,
    keyfeatures,
    imgUrls,
    catalog,
  };
};

const getSelectedVariantId = ({selectedVariantData, map}) => {
  let match, matchVid;
   _.forEach(map, (mapValues, vid) => {
    match = _.reduce(selectedVariantData, (acc, selectedValue, selectedKey) => {
      return acc && (mapValues[selectedKey] && mapValues[selectedKey].indexOf(selectedValue) !== -1)
    }, true);
    if(match) {
      matchVid = vid;
    }
  });
  return matchVid;
}

const getReviewRatings = (store) => {
  return store.productReducer.reviews
}
const getReviewResponse = (store) => {
  return store.productReducer.reviewResponse
}
const getSelectedPropductId = (store) => ({selectedProductData, map, lastSelectionAttribute}) => {
  const exisitingProductData = _.reduce(store.productReducer.data[0].product_details.product_details_vo.cached_product_details.attribute_map, (acc, val, key) => {
    if(val.attribute_group_name !== 'IDENTITY' || !val.searchable) {
      return acc;
    }
    return {
      ...acc,
      [key]: val.attribute_values[0].value
    }
  }, {})
  selectedProductData = {
    ...exisitingProductData,
    ...selectedProductData,
  };
  let match, matchPid, count, pids = [];
   _.forEach(map, (mapValues, pid) => {
    count = 0;
    match = _.reduce(selectedProductData, (acc, selectedValue, selectedKey) => {
      const temp = mapValues[selectedKey] && mapValues[selectedKey].indexOf(selectedValue) !== -1
      if(temp) {
        count++;
        pids[count] = pid;
      }
      return acc && temp
    }, true);
    if(match) {
      matchPid = pid;
    }
  });
  for(var i = Object.keys(selectedProductData).length; i >= 0 ; i--) {
    if(pids[i]) {
      matchPid = pids[i];
      break;
    }
  }
  return matchPid;
}

const getSelectedVariantData = (store) => {
  store.productReducer.variantsData ? store.productReducer.variantsData.selectedVariantData : {};
}

export { getProduct, getVariants, getPreview, getSelectedVariantId, getReviewRatings, getReviewResponse, getVariantsAndSimilarProducts, getSelectedPropductId, getSelectedVariantData };
