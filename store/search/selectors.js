import shortid from 'shortid';
import _ from 'lodash';

const addCartAndWishlistDetails = (store, results) => {
  const { items=[] } =  store.cartReducer.data;
  const { data=[] } = store.wishlistReducer;

  if(items === null){
    return results;
  }
  // if(items && items.length){
  //   return results;
  // }
  // if(data && data.length) {
  //   return resutls;
  // }

  const cartListingIds = items.map((i) =>  i.listing_id) || [];
  const wishListProductIds = store.wishlistReducer.data.map((w) => w.product_id) || [];
  return {
    ...results,
    items: results.items.map((i) => {
      return ({
        ...i,
        addedToCart: cartListingIds.indexOf(i.variants.listingId[0]) !== -1,
        addedToWishlist: wishListProductIds.indexOf(i.productId) !== -1,
      });
    }),
  };
};

const getSearchFilters = (store) => {
  const filters = {
    category: [],
    facets: [],
  };
  if (store.searchReducer.data.categoryFilter) {
    const categoryFilter = store
      .searchReducer
      .data
      .categoryFilter
      .parentCategories
      .reduce((filters, item) => {
        return filters.concat({
            ...item,
            children: item.childCategories,
          })
      }, []);
    filters.category = [{
      name: 'Category',
      id: 'category',
      children: categoryFilter,
    }];
  }
  if (store.searchReducer.data.facetResponse){
    filters.facets = store.searchReducer.data.facetResponse.facets.reduce((filters, item) => {
      return filters.concat({
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
          }
          if (item.Type === 'PERCENTILE') {
            attrObj.values = value.attributeValue;
          } else {
            attrObj.name = value.attributeValue;
          }
          return attrObj;
        }),
      });
    }, []);
  }
  return filters;
};

const getSearchResutls = (store) => {
  const resutls = {
    totalCount: 0,
    items: [],
  };
  if (store.searchReducer.data.productResponse) {
    resutls.totalCount = store.searchReducer.data.productResponse.noOfProducts;
    resutls.items = store.searchReducer.data.productResponse.products.map((product) => {
      const variantInfo = product.variantListingAdapters.reduce((modifiedVaraints, v) => {
        const attributesData = {...v.attributes};
        delete attributesData.type;
        delete attributesData.variantId;
        let modifiedVaraintsCopy = Object.assign(modifiedVaraints);
        _.forEach(attributesData, (val, key) => {
          modifiedVaraintsCopy[key] = modifiedVaraintsCopy[key] || [];
          modifiedVaraintsCopy[key] = modifiedVaraintsCopy[key].concat(val);
        });
        return modifiedVaraintsCopy;
      }, {});
      const priceInfo = product.variantListingAdapters.map((vla) => vla.attributes.sellingPrice);
      const offers = product.variantListingAdapters.map((vla) => vla.attributes.discount);
      let priceRange = '';
      if (priceInfo.length > 2) {
        priceRange = [Math.min.apply(null, priceInfo), Math.max.apply(null, priceInfo)].join(' - ');
      }else if (priceInfo.length > 1) {
        priceRange = priceInfo.sort().join(' - ')
      } else {
        priceRange = priceInfo[0] || '';
      }
      return {
        id: product.id,
        media: product.attributes.media_unrestricted_images,
        productId: product.attributes.productId,
        catalogId: product.attributes.catalogId,
        itemtype: product.attributes.itemType,
        displayName: product.attributes.calculated_display_name,
        variants: variantInfo,
        priceRange,
        offers: offers,
      };
    });
  }
  return addCartAndWishlistDetails(store, resutls);
}

const getPaginationDetails = (store) => {
  return store.searchReducer.data.paginationDetails || {
    pageSize:0,
    pageNum: 0,
  };
}

const getUIState = (store) => {
  return store.searchReducer.ui;
}

const getCategoryId = (store) => {
  // DO NOT remove
  //not used for now. May be required when we have a different service for facets.
  // const category = _.find(state.searchReducer.data.categoryFilter.parentCategories, { canonicalId: query.category })
  // if (query.subCategory){
  //   const subCategory = _.find(category.childCategories, {canonicalId: query.subCategory})
  //   return subCategory.id;
  // }
  // return category.id;
  return store.searchReducer.data.searchDetails.categoryFilter.id;
}

const getQuery = (store) => {
  return store.searchReducer.data.searchDetails.query;
}

const optionParams = (store) => {
  let isListed = store.searchReducer.data;
  isListed = isListed ? isListed.hardCodedValues : true;
  isListed = isListed ? isListed.isListed : true;
  isListed = isListed ? isListed : true;
  return {
    language: store.searchReducer.data.geoDetails ? store.searchReducer.data.geoDetails.language : 'en',
    isListed,
  }
}

const getFacetfilters = (store) => (queryObject) => {
  const facetFilters = _.reduce(queryObject, (facetFilters, fitlerTypeValues, fitlerTypeKey) => {
    facetFilters[fitlerTypeKey] = fitlerTypeValues.map((fitlerTypeValue) => {
      return fitlerTypeValue.param
    });
    return facetFilters;
  }, {});
  return facetFilters;
}

const getSearchBarFilterState = (state) => {
  return state.searchReducer.ui.showFilters;
}

export { getSearchFilters, getSearchResutls, getPaginationDetails, getUIState, getCategoryId, getQuery, getFacetfilters, optionParams, getSearchBarFilterState, addCartAndWishlistDetails };
