import _ from 'lodash';

const getPage = store => store.landingReducer.data;

const getCartStatus = (store, listingId) => {
  const selectedCartItem = _.find(store.cartReducer.data.items, ({ listing_id }) => {
    return listingId === listing_id;
  });
  return !!selectedCartItem;
};

const getListings = (store, ownProps) => {
  if (store.landingReducer.listings[ownProps.index]) {
    let listings = [];
    store.landingReducer.listings[ownProps.index].forEach((product) => {
      const { product_details, listing_info } = product;
      if (listing_info === null || product_details === null) {
        listings = [];
        return;
      }
      const {
        pricing, listing_id: listingId, product_id: productId,
      } = listing_info;
      const {
        mrp, offer_price: sellingPrice, discount_per_mrp,
      } = pricing;
      const { catalog_details } = product_details;
      const { cached_product_details } = product_details.product_details_vo;
      listings.push({
        mrp,
        listingId,
        productId,
        sellingPrice,
        discountPerMrp: discount_per_mrp,
        catalogId: catalog_details.catalog_id,
        itemType: catalog_details.item_type_name,
        image: cached_product_details.media.gallery_media[0].url,
        brand: catalog_details && catalog_details.attribute_map.brand.attribute_values[0].value,
        name: cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
        isAddedToCart: getCartStatus(store, listingId),
      });
    });
    return listings;
  }
  return [];
};

const getIsListingLoading = store => store.landingReducer.ui.isListingLoading;

export {
  getPage,
  getListings,
  getIsListingLoading,
};
