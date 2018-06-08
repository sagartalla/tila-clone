const getWishListResults = (store) => {
  if (store.wishlistReducer.data) {
    const data = store.wishlistReducer.data;
    const img_url = 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/';
    const newData = [];

    console.log(data)

    data.map((item) => {
      const variant = Object.keys(item.product_details.product_details_vo.cached_variant)[0];
      const variant_info = item.variant_preferred_listings[variant][0];

      newData.push({
        name: item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
        brand_name: item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        img: img_url + item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
        cur: variant_info.selling_price_currency,
        price: variant_info.selling_price,
      })
    })

    // console.log('data', newData);
    return newData.reverse();
  }
  return [];
}

export { getWishListResults }