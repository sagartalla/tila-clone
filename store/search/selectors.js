import shortid from 'shortid';
import _ from 'lodash';

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
        children: item.Values.map((value) => ({
          name: value.attributeValue,
          id: shortid.generate(),
          count: value.Count,
          param: value.Param,
        })),
      })
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
      const variantInfo = product.variantAdapters.reduce((modifiedVaraints, v) => {
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
      let priceRange = '';
      if (priceInfo.length > 2) {
        priceRange = [Math.min.apply(null, priceInfo), Math.max.apply(null, priceInfo)].join(' - ');
      }else if (priceInfo.length > 1) {
        priceRange = priceInfo.sort().join(' - ')
      } else {
        priceRange = priceInfo[0] || 'No price info';
      }
      return {
        id: product.id,
        media: product.attributes.media_unrestricted_images,
        productId: product.attributes.productId,
        displayName: product.attributes.calculated_display_name,
        variants: variantInfo,
        priceRange,
      };
    });
  }
  return resutls;
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

const getCategoryId = (state, query) => {
  //not used for now. May be required when we have a different service for facets.
  const category = _.find(state.searchReducer.data.categoryFilter.parentCategories, { canonicalId: query.category })
  if (query.subCategory){
    const subCategory = _.find(category.childCategories, {canonicalId: query.subCategory})
    return subCategory.id;
  }
  return category.id;
}

const getQuery = (store) => {
  return store.searchReducer.data.searchDetails.query
}

const getFacetfilters = (store) => (queryObject) => {
  const facetFilters = _.reduce(queryObject, (facetFilters, fitlerTypeValues, fitlerTypeKey) => {
    facetFilters[fitlerTypeKey] = fitlerTypeValues.map((fitlerTypeValue) => {
      // return _.find(_.find(store.searchReducer.data.facetResponse.facets, { attributeName: fitlerTypeKey }).Values, { attributeValue: fitlerTypeValue }).Param
      return fitlerTypeValue.param
    });
    return facetFilters;
  }, {});
  return facetFilters;
}


export { getSearchFilters, getSearchResutls, getPaginationDetails, getUIState, getCategoryId, getQuery, getFacetfilters };