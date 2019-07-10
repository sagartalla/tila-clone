import _ from 'lodash';

const getPage = store => store.landingReducer.data;

const getListings = (store) => {
  return store.landingReducer.listings.map((product) => {
    const { product_details, listing_info } = product;
    const {
      mrp, selling_price: sellingPrice, listing_id: listingId, product_id: productId,
    } = listing_info;
    const { catalog_details } = product_details;
    const { cached_product_details } = product_details.product_details_vo;
    return {
      mrp,
      listingId,
      productId,
      sellingPrice,
      catalogId: catalog_details.catalog_id,
      itemType: catalog_details.item_type_name,
      image: cached_product_details.media.gallery_media[0].url,
      brand: catalog_details && catalog_details.attribute_map.brand.attribute_values[0].value,
      name: cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
    };
  });
};

export {
  getPage,
  getListings,
};
