import _ from 'lodash';

const getPage = store => store.landingReducer.data;

const getListings = (store) => {
  console.log('sdugcius', store.landingReducer.listings);
  return store.landingReducer.listings.map((product) => {
    const { product_details, listing_info } = product;
    const {
      mrp, selling_price: sellingPrice, listing_id: listingId, product_id: productId,
    } = listing_info;
    const { cached_product_details } = product_details.product_details_vo;
    const catalogId = product_details.catalog_details.catalog_id;
    const image = cached_product_details.media.gallery_media[0].url;
    const name = cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value;
    return {
      mrp,
      name,
      image,
      catalogId,
      listingId,
      productId,
      sellingPrice,
    };
  });
};

export {
  getPage,
  getListings,
};
