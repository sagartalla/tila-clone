import shortid from 'shortid';

const getSearchFilters = (store) => {
  let filters = [];
  filters = store.searchReducer.data.categoryFilter.parentCategories.reduce((filters, item) => {
    return filters.concat({
      name: 'Category',
      id: 'category',
      children: [{
        name: item.name,
        id: item.id,
        children: item.childCategories,
      }]
    })
  }, filters);
  filters = store.searchReducer.data.facetResponse.facets.reduce((filters, item) => {
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
  }, filters);
  return filters;
};

const getSearchResutls = (store) => {
  const resutls = {};
  resutls.totalCount = noOfProducts;
  resutls.items = store.searchReducer.data.productResponse.products.map((product) => {
    return {
      id: product.id,
      media: product.attributes.media_unrestricted_images,
      productId: product.attributes.productId,
      displayName: product.attributes.calculated_display_name,
    };
  });
}


export { getSearchFilters };