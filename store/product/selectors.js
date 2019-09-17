import _ from 'lodash';

const getProduct = (store, variantId) => {
  const {
    product_details, variant_preferred_listings, tree,
  } = store.productReducer.data[0];

  const { products = [] } = store.wishlistReducer;
  const wishListProductIds = products && products.length > 0 && (products.map(w => w.product_id) || []);
  let wishlistId = '';

  products.forEach((p) => {
    if (p.product_id === product_details.product_id) {
      wishlistId = p.wishlist_id;
    }
  });

  variantId = store.productReducer.variantsData.selectedVariantId || variantId;
  variantId = variantId || Object.keys(variant_preferred_listings || {})[0];
  const computedVariantId = variantId || Object.keys(product_details.product_details_vo.cached_variant || {})[0];
  let listings = (computedVariantId && variant_preferred_listings) ? variant_preferred_listings[computedVariantId] : _.reduce(variant_preferred_listings, (acc, val, key) => {
    return [...acc, ...val];
  }, []);
  listings = listings || [];
  let catalogAttributeMap = {
    ...product_details.catalog_details.attribute_map,
    ...product_details.product_details_vo.cached_product_details.attribute_map,
    ...product_details.product_details_vo.cached_variant[computedVariantId].attribute_map,
  };
  const tila_care_policy = (listings[0] ? listings[0].tila_care_policy : null) || {};
  const productAttributeMap = product_details && product_details.product_details_vo && product_details.product_details_vo.cached_product_details.attribute_map;
  // let activeCount = 0, listingInventryCount = 0;
  let priceInfo = listings ? listings.filter((listing) => {
    // if(listing.total_inventory_count <= 0 ) {
    //   listingInventryCount++;
    // }
    // if(!listing.active) {
    //   activeCount++;
    // }
    return listing.total_inventory_count > 0 && listing.active;
  }) : [];

  const warranty = priceInfo.length && priceInfo[0].warranty_policy && priceInfo[0].warranty_policy.preferred_policy ?
    priceInfo[0].warranty_policy.policies[priceInfo[0].warranty_policy.preferred_policy] : {};
  priceInfo = priceInfo.length ? priceInfo[0] : null;

  const availabilityError = !priceInfo;
  const stockError = !priceInfo;
  let showSizeChart;
  const sizeChartImgName = product_details && product_details.catalog_details &&
  product_details.catalog_details.attribute_map && product_details.catalog_details.attribute_map.ideal_for &&
  product_details.catalog_details.attribute_map.ideal_for.attribute_values &&
  product_details.catalog_details.attribute_map.ideal_for.attribute_values[0].value;
  if (tree && tree.breadcrumb && tree.breadcrumb.length > 0 && tree.breadcrumb[0].display_name_en === 'Fashion') {
    tree.breadcrumb.map((category) => {
      if (category.display_name_en === 'Clothing' || category.display_name_en === 'Footwear') {
        showSizeChart = true;
      }
    });
  }

  const imgUrls = product_details && product_details.product_details_vo && product_details.product_details_vo.cached_product_details.media.gallery_media;
  const titleInfo = {
    brand: product_details && product_details.catalog_details && product_details.catalog_details.attribute_map.brand,
    title: productAttributeMap && productAttributeMap.calculated_titles
      && productAttributeMap.calculated_titles.attribute_values.length > 0
      ? productAttributeMap.calculated_titles : productAttributeMap.calculated_display_name,
    rating: {
      rating: '',
      count: '',
    },
    reviews: {
      count: '',
    },
    price: priceInfo ? priceInfo.selling_price ? `${priceInfo.selling_price.currency} ${priceInfo.selling_price.display_value}` : priceInfo.selling_price : 'Price Not available',
    originalPrice: '',
    discountPercent: '',
    listingId: priceInfo ? priceInfo.listing_id : 'No Listing',
    totalInventoryCount: priceInfo ? priceInfo.total_inventory_count : 0,
    product_id: product_details && product_details.product_id,
    itemtype: product_details && product_details.catalog_details && product_details.catalog_details.item_type_name,
    media: imgUrls && imgUrls[0].url,
    categoryId: tree && tree.breadcrumb && tree.breadcrumb[tree.breadcrumb.length - 1].id,
    comparable: product_details && product_details.catalog_details && product_details.catalog_details.comparable,
  };
  const preferredPolicyData = priceInfo ? priceInfo.return_policy ? priceInfo.return_policy.policies[priceInfo.return_policy.preferred_policy] : {} : {};
  const returnInfo = {
    acceptsReturns: preferredPolicyData ? preferredPolicyData.allowed : false,
    maxDaysToReturn: preferredPolicyData ? preferredPolicyData.duration : 0,
  };
  const offerInfo = {
    price: priceInfo ? priceInfo.selling_price ? `${priceInfo.selling_price.display_value} ${priceInfo.selling_price.currency}` : priceInfo.selling_price : 'No listing',
    listingId: priceInfo ? priceInfo.listing_id : '',
    listingAvailable: !!priceInfo,
    availabilityError,
    stockError,
    offerPricing: priceInfo ? {
      strickedPrice: priceInfo.pricing.mrp,
      showPrise: priceInfo.pricing.offer_price,
      sellingPrice: priceInfo.pricing.price,
      discount: priceInfo.pricing.discount_per_mrp,
      offerMesseges: priceInfo.pricing.actions ? priceInfo.pricing.actions.map(a => a.description) : [],
      offerDiscounts: priceInfo.pricing.actions ? priceInfo.pricing.actions : [],
      totalDiscountMRP: priceInfo.pricing.total_discount_mrp,
      currency: priceInfo.mrp_currency,
    } : {},
  };
  const variant_id = variant_preferred_listings ? Object.keys(variant_preferred_listings)[0] : '';

  const catalogObj = {
    catalog_id: product_details && product_details.catalog_details && product_details.catalog_details.catalog_id,
    item_type: product_details && product_details.catalog_details && product_details.catalog_details.item_type_name,
    product_id: product_details && product_details.product_id,
    variant_id,
  };
  const keyfeatures = productAttributeMap && productAttributeMap.calculated_highlights;
  const extraOffers = priceInfo ? priceInfo.pricing.extra_offers_detail : [];
  const details = catalogAttributeMap && catalogAttributeMap.description ? catalogAttributeMap.description.attribute_values.map(d => d.value).join(', ') : null;
  let productDescription = product_details && product_details.product_details_vo && product_details.product_details_vo.cached_product_details.rich_product_desc;
  productDescription = productDescription && productDescription.length > 0 ? _.sortBy(productDescription, ['order']) : null;
  return {
    titleInfo,
    details,
    keyfeatures,
    imgUrls,
    extraOffers,
    offerInfo,
    shippingInfo: priceInfo ? priceInfo.shipping : null,
    returnInfo,
    product_id: product_details && product_details.product_id,
    productDescription,
    catalogObj,
    sizeChart: {
      showSizeChart,
      sizeChartImgName,
    },
    tila_care_policy,
    breadcrums: tree.breadcrumb,
    warranty,
    categoryType: tree.finance ? tree.finance[0].display_name_en : '',
    catalog: _.groupBy(_.filter(catalogAttributeMap, val => val.visible), attrMap => attrMap.attribute_category_name),
    isWishlisted: wishListProductIds && wishListProductIds.indexOf(product_details.product_id) !== -1,
    wishlistId,
    tuin: catalogAttributeMap.tuin ? catalogAttributeMap.tuin.attribute_values[0].value : '',
    newVariantId: product_details && product_details.product_details_vo && product_details.product_details_vo.cached_variant && Object.keys(product_details.product_details_vo.cached_variant)[0],
  };
};
const getTilaPolicy = (store) => {
  return store.productReducer.tilaPolicy;
};
const isProductLoaded = (store) => {
  // console.log('productdetails', store.productReducer.data[0]);
  return {
    isProductLoaded: store.productReducer.data[0],
    productDetails: store.productReducer.data[0],
  };
};

const getLoadingStatus = (store) => {
  return store.productReducer.ui.loading;
};
const getProductId = (store) => {
  return store.productReducer.productId;
};
const getVariantId = (store) => {
  return store.productReducer.variantId;
};
const getErrorMessage = (store) => {
  return store.productReducer.error;
};

const getVariantsAndSimilarProducts = variantId => (store) => {
  const { variantsData } = store.productReducer;
  const { availableSimilarProducts } = variantsData || {};
  const { similar_products, product_details, variant_preferred_listings } = store.productReducer.data[0];
  const { item_type_name: itemType, catalog_id: catalogId } = product_details && product_details.catalog_details;
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

  let variantProducts = [];
  _.forIn(product_details.product_details_vo.cached_variant, (value, key) => {
    value.key = key;
    variantProducts.push(value);
  });
  variantProducts = [...variantProducts.sort((a, b) => {
    if (a.attribute_map.size_ordering) {
      return a.attribute_map.size_ordering.attribute_values[0].value - b.attribute_map.size_ordering.attribute_values[0].value;
    }
  })];
  const variants = _.reduce(variantProducts, (acc, value) => {
    const { key } = value;
    const display = {
      ...acc.display,
    };
    const map = {
      ...acc.map,
    };
    map[key] = map[key] || {};
    _.forEach(value.attribute_map, (attVal, attKey) => {
      if (attVal.attribute_group_name !== 'IDENTITY' || !attVal.searchable) {
        return;
      }
      if (!display[attKey]) {
        display[attKey] = {
          displayName: attVal.display_string,
          values: [],
          selected: '',
        };
      }

      if (key === variantId) {
        display[attKey].selected = attVal.attribute_values[0].value;
      }

      display[attKey].values = _.uniq([...display[attKey].values, ...(attVal.attribute_values.map(i => `${i.value}${i.qualifier_unit ? ` ${i.qualifier_unit}` : ''}`))]);
      if (!map[key][attKey]) {
        map[key][attKey] = [];
      }
      map[key] = {
        ...map[key],
        [attKey]: [...map[key][attKey], ...(attVal.attribute_values.map(i => `${i.value}${i.qualifier_unit ? ` ${i.qualifier_unit}` : ''}`))],
      };
    });
    return {
      ...acc,
      display,
      map,
    };
  }, { display: {}, map: [] });

  const modifiedProducts = [];
  similar_products.forEach((product) => {
    if (product.listing.product_id === productId.trim()) {
      modifiedProducts.unshift(product);
    } else {
      modifiedProducts.push(product);
    }
  });
  const similarProducts = similar_products ? _.reduce([product_details, ...modifiedProducts], (acc, product) => {
    // if (similar_products && !similar_products[product.product_details_vo.cached_product_details.product_id]) return acc;
    const key = product.product_details_vo.cached_product_details.product_id;
    const display = {
      ...acc.display,
    };
    const map = {
      ...acc.map,
    };
    map[key] = map[key] || {};
    _.forEach(product.product_details_vo.cached_product_details.attribute_map, (attVal, attKey) => {
      const porder = attVal.primary_order || 1;
      if (attVal.attribute_group_name !== 'IDENTITY' || !attVal.searchable || !attVal.groupable) {
        return;
      }
      attVal.primary_order = attVal.primary_order || 1;
      acc.order[attVal.primary_order - 1] = attKey;
      if (!display[attKey]) {
        display[attKey] = {
          displayName: attVal.display_string,
          values: [],
        };
      }
      display[attKey].values = porder === 1 ? _.uniq([...display[attKey].values, ...(attVal.attribute_values.map(i => `${i.value}${i.qualifier_unit ? ` ${i.qualifier_unit}` : ''}`))]) : [];
      if (!map[key][attKey]) {
        map[key][attKey] = [];
      }
      map[key] = {
        ...map[key],
        [attKey]: [...map[key][attKey], ...(attVal.attribute_values.map(i => `${i.value}${i.qualifier_unit ? ` ${i.qualifier_unit}` : ''}`))],
      };
    });
    return {
      ...acc,
      display,
      map,
    };
  }, { display: {}, map: [], order: [] }) : { display: {}, map: [], order: [] };
  if (similar_products.length && similarProducts.order[0]) {
    const primaryValues = attribute_map[similarProducts.order[0]].attribute_values.map(av => av.value);
    const shortList = _.reduce(similarProducts.map, (acc, attrs, pid) => {
      if (primaryValues.indexOf(attrs[similarProducts.order[0]][0]) !== -1) {
        acc[pid] = attrs;
      }
      return acc;
    }, {});
    _.forEach(shortList, (productValue, productId) => {
      const key = productId;
      const product = _.find([product_details, ...similar_products], (p) => {
        return p.product_details_vo.cached_product_details.product_id === productId;
      });
      if (!product) {
        return;
      }
      _.forEach(product.product_details_vo.cached_product_details.attribute_map, (attVal, attKey) => {
        const { display, map } = similarProducts;
        const porder = attVal.primary_order || 1;
        if (attVal.attribute_group_name !== 'IDENTITY' || !attVal.searchable || !attVal.groupable || porder === 1) {
          return;
        }
        // console.log('attribute_map', attribute_map[attKey].attribute_values.map((i) => i.value))
        display[attKey].values = _.uniq([...attribute_map[attKey].attribute_values.map(i => i.value), ...display[attKey].values, ...(attVal.attribute_values.map(i => `${i.value}${i.qualifier_unit ? ` ${i.qualifier_unit}` : ''}`))]);
        if (!map[key][attKey]) {
          map[key][attKey] = [];
        }
        map[key] = {
          ...map[key],
          [attKey]: [...map[key][attKey], ...(attVal.attribute_values.map(i => `${i.value}${i.qualifier_unit ? ` ${i.qualifier_unit}` : ''}`))],
        };
      });
    });
  }
  return {
    variants, similarProducts, itemType, catalogId, productId,
  };
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
  const keyfeatures = _.map(attributes.highlights.attributeValues, kf => kf.value);
  const productKeys = Object.keys(products);
  const imgUrls = productKeys.length ? products[productKeys[0]].media.galleryMedia.map(item => ({
    type: item.mediaType,
    url: item.url,
    caption: item.caption,
    order: item.order,
    restricted: item.isRestricted,
  })) : [];
  const catalog = _.reduce(attributes, (acc, attrVal, attrKey) => {
    const cItem = _.find(catalogData, { attributeName: attrKey });
    if (cItem) {
      const groupName = cItem.attributeCategoryName;
      const { isVisible } = cItem;
      if (isVisible) {
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
      return acc && (mapValues[selectedKey] && mapValues[selectedKey].indexOf(selectedValue) !== -1);
    }, true);
    if (match) {
      matchVid = vid;
    }
  });
  return matchVid;
};

const getReviewRatings = (store) => {
  return store.productReducer.reviews;
};
const getReviewResponse = (store) => {
  return store.productReducer.reviewResponse;
};
const getSelectedPropductId = store => ({ selectedProductData, map }) => {
  const exisitingProductData = _.reduce(store.productReducer.data[0].product_details.product_details_vo.cached_product_details.attribute_map, (acc, val, key) => {
    if (val.attribute_group_name !== 'IDENTITY' || !val.searchable || !val.groupable) {
      return acc;
    }
    return {
      ...acc,
      [key]: val.attribute_values[0].value,
    };
  }, {});
  selectedProductData = {
    ...exisitingProductData,
    ...selectedProductData,
  };
  let match, matchPid, count, pids = [];
  _.forEach(map, (mapValues, pid) => {
    count = 0;
    match = _.reduce(selectedProductData, (acc, selectedValue, selectedKey) => {
      const temp = mapValues[selectedKey] && mapValues[selectedKey].indexOf(selectedValue) !== -1;
      if (temp) {
        count++;
        pids[count] = pid;
      }
      return acc && temp;
    }, true);
    if (match) {
      matchPid = pid;
    }
  });
  for (let i = Object.keys(selectedProductData).length; i >= 0 ; i--) {
    if (pids[i]) {
      matchPid = pids[i];
      break;
    }
  }
  return matchPid;
};

const getSelectedVariantData = store =>
  (store.productReducer.variantsData ? store.productReducer.variantsData.selectedVariantData : {});

const getAllCities = (store) => {
  const allCities = store.productReducer.allCitiesData;
  const searchKey = store.productReducer.searchCityKeyWord;
  return searchKey ?
    allCities.filter(item => item.city_name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1)
    : allCities;
};

const getAllCountries = (store) => {
  const countries = store.productReducer.countriesData;
  const searchKey = store.productReducer.searchCountryKeyWord;
  return searchKey ?
    countries.filter(item => item.country_name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1)
    : countries;
};

export {
  getProduct, getPreview, getSelectedVariantId, getReviewRatings, getReviewResponse,
  getVariantsAndSimilarProducts, getSelectedPropductId, getSelectedVariantData, getAllCities, getAllCountries,
  getLoadingStatus, getErrorMessage, isProductLoaded, getProductId, getVariantId, getTilaPolicy,
};
