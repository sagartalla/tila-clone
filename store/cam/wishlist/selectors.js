import constants from '../../../constants';
const getWishListResults = (store) => {
  if (store.wishlistReducer.data) {
    const data = store.wishlistReducer.data;
    const img_url = constants.mediaDomain;
    const newData = [];

    data.forEach((item) => {
      // const variant = Object.keys(item.product_details.product_details_vo.cached_variant)[0];
      // const variant_info = item.variant_preferred_listings[variant][0];

      const variant = Object.keys(item.variant_preferred_listings)[0];
      const variant_info = item.variant_preferred_listings[variant][0];

      newData.push({
        wishlist_id: item.wishlist_id,
        listing_id: variant_info.listing_id,
        product_id: variant_info.product_id,
        variant_id: variant_info.variant_id,
        name: item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
        brand_name: item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        img: img_url + '/' + item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
        cur: variant_info.selling_price_currency,
        price: variant_info.selling_price,
        wishlisted_price: item.wishlisted_price,
      });
    });

    return newData.reverse();
  }
  return [];
}

export { getWishListResults }
