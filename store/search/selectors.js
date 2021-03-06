import shortid from 'shortid';
import _ from 'lodash';

const filterVariants = (cartListingId, variants) => {
  // if(!variants.length > 1) {
  //   return cartListingIds.indexOf(variants.listingId[0]) !== -1
  // }
  let variantList;
  if (variants.length === 0) {
    return variants;
  }
  if (variants.length >= 1) {
    variantList = variants.reduce((acc, curr) => {
      if (curr.productAvailable) {
        curr.addedToCart = cartListingId.indexOf(curr.listingId[0]) !== -1;
      }
      acc.push(curr);
      return acc;
    }, []);
  }
  return variantList;
};
const addCartAndWishlistDetails = (store, results) => {
  const { items = [] } = store.cartReducer.data;
  const { products = [] } = store.wishlistReducer;

  if (items === null) {
    return results;
  }
  // if(items && items.length){
  //   return results;
  // }
  // if(data && data.length) {
  //   return resutls;
  // }
  const cartListingIds = items.map(i => i.listing_id) || [];
  const wishListProductIds = products && products.length > 0 &&
    (products.map(w => w.product_id) || []);

  const wishlistItems = {};
  products.forEach((p) => {
    wishlistItems[p.product_id] = p.wishlist_id;
  });

  return {
    ...results,
    items: results.items.map(i => ({
      ...i,
      wishlistId: wishlistItems[i.productId] || '',
      variants: filterVariants(cartListingIds, i.variants),
      addedToWishlist: wishListProductIds && wishListProductIds.indexOf(i.productId) !== -1,
    })),
  };
};

const getSearchFilters = (store) => {
  const filters = {
    category: [],
    facets: [],
  };
  const { categoryFilter, facetResponse } = store.searchReducer.data;
  if (categoryFilter) {
    const { nodes } = categoryFilter;
    const renderChild = value => _.reduce(value, (acc, val) => {
      const node = [
        ...acc,
        {
          canonicalId: _.kebabCase(val.name),
          id: val.id,
          name: val.name,
          [val.child && 'children']: renderChild(val.child),
        },
      ];
      return node;
    }, []);

    filters.category = [{
      name: 'Category',
      id: 'category',
      children: renderChild(nodes),
    }];
  }
  if (facetResponse) {
    filters.facets = facetResponse.facets.reduce((filter, item) => filter.concat({
      name: item.attributeDisplayName,
      id: item.Id,
      queryParamName: _.camelCase(item.attributeDisplayName),
      attributeName: item.attributeName,
      type: item.Type,
      children: item.Values.map((value) => {
        const attrObj = {
          id: shortid.generate(),
          count: value.Count,
          param: value.Param,
        };
        // if (item.Type === 'PERCENTILE') {
        //   attrObj.values = value.attributeValue;
        // } else {
        attrObj.name = value.attributeValue;
        // }
        return attrObj;
      }),
    }), []);
  }
  return filters;
};

const getSearchResutls = (store) => {
  const resutls = {
    totalCount: 0,
    items: [],
  };
  let isNotifyMe;
  if (store.searchReducer.data.productResponse) {
    resutls.totalCount = store.searchReducer.data.productResponse.noOfProducts;
    resutls.items = store.searchReducer.data.productResponse.products.map((product) => {
      isNotifyMe = true;
      let variantInfo = (product.variantAdapters || []).reduce((modifiedVaraints, v) => {
        const modifiedVaraintsCopy = {};
        const { listingAdapters } = v;
        if (listingAdapters.length > 0) {
          const activeInStockListing = _.find(listingAdapters, l => l.attributes.isActive && l.attributes.inStock);
          isNotifyMe = typeof activeInStockListing === 'undefined' && isNotifyMe;
          const attributesData = { ...listingAdapters[0].attributes };
          delete attributesData.type;
          delete attributesData.variantId;
          // modifiedVaraintsCopy = Object.assign(modifiedVaraints);
          modifiedVaraintsCopy.productSize = v.attributes[product.flags.variant_id_attribute];
          modifiedVaraintsCopy.productAvailable = true;
          modifiedVaraintsCopy.variantId = v.id;
          _.forEach(attributesData, (val, key) => {
            modifiedVaraintsCopy[key] = modifiedVaraintsCopy[key] || [];
            modifiedVaraintsCopy[key] = modifiedVaraintsCopy[key].concat(val);
          });
        } else {
          modifiedVaraintsCopy.productSize = Object.values(v.attributes[product.flags.variant_id_attribute] || {})[0];
          modifiedVaraintsCopy.productAvailable = false;
          modifiedVaraintsCopy.variantId = v.id;
          modifiedVaraintsCopy.tuinId = v && v.attributes && v.attributes.tuin && v.attributes.tuin[0];
        }

        modifiedVaraints.push(modifiedVaraintsCopy);

        return modifiedVaraints;
      }, []);
      if (isNotifyMe) {
        variantInfo = [];
      }
      // const priceInfo = product.variantAdapters[0].listingAdapters.map((vla) => vla.attributes.sellingPrice);
      // const offers = product.variantAdapters[0].listingAdapters.map((vla) => vla.attributes.discount);
      let currency = product.variantAdapters ? product.variantAdapters[0].listingAdapters || '' : '';
      currency = currency[0] || '';
      currency = currency.attributes || '';
      currency = currency.currency || '';

      const firstVarintId = product.variantAdapters ? product.variantAdapters[0].id : null ;
      // let priceRange = '';
      // if (priceInfo.length > 2) {
      //   priceRange = [Math.min.apply(null, priceInfo), Math.max.apply(null, priceInfo)].join(' - ');
      // } else if (priceInfo.length > 1) {
      //   priceRange = priceInfo.sort().join(' - ');
      // } else {
      //   priceRange = priceInfo[0] || '';
      // }
      const { brand } = product.attributes;

      const categoryTreePath = product.attributes.categoryTreePath ? product.attributes.categoryTreePath.split('/') : [];
      const categoryId = categoryTreePath.length > 0 ? categoryTreePath[categoryTreePath.length - 1].split(',')[0] : '';

      return {
        id: product.id,
        notifyMe: product.attributes.notifyMe || false,
        media: product.attributes.media_unrestricted_images,
        productId: product.attributes.productId,
        catalogId: product.attributes.catalogId,
        itemtype: product.attributes.itemType,
        displayName: (product.attributes.calculated_display_name || []).join(','),
        brand: brand ? brand[0] : '',
        variants: variantInfo.sort((a, b) => a.productSize[0] - b.productSize[0]),
        firstVarintId,
        currency,
        categoryId,
        flags: product.flags,
      };
    });
  }
  return addCartAndWishlistDetails(store, resutls);
};
const getSpellCheckResponse = store => store.searchReducer.data.spellCheckResponse || null;
const getPaginationDetails = store => store.searchReducer.data.paginationDetails || {
  pageSize: 0,
  pageNum: 0,
};

const getUIState = store => store.searchReducer.ui;

const getCategoryId = store =>
  // DO NOT remove
  // not used for now. May be required when we have a different service for facets.
  // const category = _.find(state.searchReducer.data.categoryFilter.parentCategories, { canonicalId: query.category })
  // if (query.subCategory){
  //   const subCategory = _.find(category.childCategories, {canonicalId: query.subCategory})
  //   return subCategory.id;
  // }
  // return category.id;
  store.searchReducer.data.searchDetails.categoryFilter.id;
const getQuery = store => store.searchReducer.data.searchDetails.query;
const getCategorySearchQuery = store => store.searchReducer.data.searchDetails.choosenCategoryName;
const optionParams = (store) => {
  let isListed = store.searchReducer.data;
  isListed = isListed ? isListed.hardCodedValues : true;
  isListed = isListed ? isListed.isListed : true;
  isListed = isListed || true;
  return {
    // language: store.searchReducer.data.geoDetails ? store.searchReducer.data.geoDetails.language : 'en',
    isListed,
  };
};

const sortValue = store => store.searchReducer.data.searchDetails.sort;
/* eslint-disable */
const getFacetfilters = store => (queryObject) => {
  const facetFilters = {};
  const res = [];
  const facetFiltersCopyWithNames = {};
  const storeValue = store && store.searchReducer && store.searchReducer.data && store.searchReducer.data.facetResponse && store.searchReducer.data.facetResponse.facets;
    storeValue && Object.keys(queryObject).forEach(attributeName => {
      const filtered = storeValue.find(facet => facet.attributeName === attributeName);
      filtered && filtered.Values && filtered.Values.length > 0 && filtered.Values.forEach(param => {
        if (queryObject[attributeName].includes(param.attributeValue)) {
          res.push(param);
          if (!facetFilters[attributeName] || !facetFiltersCopyWithNames[attributeName]) {
            facetFilters[attributeName] = [];
            facetFiltersCopyWithNames[attributeName] = [];
          }
          facetFilters[attributeName].push(param.Param);
          facetFiltersCopyWithNames[attributeName].push({name: param.attributeValue, params: param.Param, attributeDisplayName: filtered.attributeDisplayName});
        }
      })
    })
  // store && store.searchReducer && store.searchReducer.data && store.searchReducer.data.facetResponse && store.searchReducer.data.facetResponse.facets.map(storeValue => {
  //   Object.keys(queryObject).map((queryKey, index) => {
  //     if (storeValue.attributeName === queryKey) {
  //       console.log('storeValue', storeValue);
  //       storeValue.Values.map(val => {
  //         queryObject[queryKey].map((item, index) => {
  //             if (val.attributeValue === item) {
  //               facetFilters[queryKey] = facetFilters[queryKey] || [];
  //               facetFilters[queryKey].push(val.Param);
  //               facetFiltersCopyWithNames[queryKey] = facetFiltersCopyWithNames[queryKey] || [];
  //               facetFiltersCopyWithNames[queryKey].push({name: val.attributeValue, params: val.Param});
  //             }
  //         })
  //       });
  //     }
  //   })
  // })
  // const facetFilters = _.reduce(queryObject, (facetFilters, fitlerTypeValues, fitlerTypeKey) => {
  //   facetFilters[fitlerTypeKey] = fitlerTypeValues.map(fitlerTypeValue => fitlerTypeValue.param);
  //   return facetFilters;
  // }, {});
  // const facetFiltersCopyWithNames = _.reduce(queryObject, (facetFilters, fitlerTypeValues, fitlerTypeKey) => {
  //   facetFilters[fitlerTypeKey] = fitlerTypeValues;
  //   console.log('fitlerTypeValues', fitlerTypeValues);
  //   return facetFilters;
  // }, {});
  return { facetFilters, facetFiltersCopyWithNames };
};

const facetData = store => {
  console.log('store.searchReducer.data.facetResponse.facets', store.searchReducer.data.facetResponse.facets);
  return store.searchReducer.data.facetResponse.facets;
}

const getSearchBarFilterState = state => state.searchReducer.ui.showFilters;

const getIsCategoryTree = store => store.searchReducer.data.searchDetails.categoryTree;

const getChoosenCategoryName = store => store.searchReducer.data.searchDetails.choosenCategoryName;

const getAppliedFitlers = (store) => {
  const { facetFiltersCopyWithNames = {} } = store.searchReducer.data.searchDetails;
  return _.reduce(facetFiltersCopyWithNames, (acc, ff, parentKey) => [...acc, ...ff.map(f => ({ displayName: f.name, parentKey, key: f.param, attributeDisplayName: f.attributeDisplayName, }))], []);
};

const getUserDetails = store => store.authReducer.data;

const getSuggestions = store => store.searchReducer.data.suggestions;

const getCartButtonLoaders = store => store.cartReducer.data.cartButtonLoaders || {};

export {
  getSearchFilters, getSearchResutls, getPaginationDetails, getUIState,
  getCategoryId, getQuery, getCategorySearchQuery, getChoosenCategoryName,
  getFacetfilters, optionParams, getSearchBarFilterState, addCartAndWishlistDetails,
  getIsCategoryTree, getAppliedFitlers, getSuggestions, getSpellCheckResponse,
  getUserDetails, getCartButtonLoaders, facetData, sortValue,
};
