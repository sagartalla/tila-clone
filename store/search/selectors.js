import shortid from 'shortid';

const getSearchFilters = (store) => {
  const filters = {
    category: [],
    facets: [],
  };
  if (store.searchReducer.data.categoryFilter) {
    let categoryFilter = store.searchReducer.data.categoryFilter.parentCategories.reduce((filters, item) => {
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
        children: item.Values.map((value) => ({
          name: value.attributeValue,
          id: shortid.generate(),
          count: value.count,
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
      return {
        id: product.id,
        media: product.attributes.media_unrestricted_images,
        productId: product.attributes.productId,
        displayName: product.attributes.calculated_display_name,
        variants: product.variants
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

export { getSearchFilters, getSearchResutls, getPaginationDetails, getUIState };