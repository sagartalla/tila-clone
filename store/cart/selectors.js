const getCartResults = (store) => {
  if (store.cartReducer.data) {
    const data = store.cartReducer.data;
    const ui = store.cartReducer.ui
    const img_url = 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/';
    const newData = { items: [], total_price: 0, ui };

    if (data.items) {
      newData.total_price = data.total_price;
      newData.total_offer_price = data.total_offer_price;
      newData.total_discount = data.total_discount;
      newData.total_shipping = data.total_shipping;
      newData.tax = 0;
      newData.item_cnt = data.items.length;
      newData.currency = data.items[0].listing_info.selling_price_currency;

      data.items.map((item, index) => {
        newData.items[index] = {
          item_id: item.cart_item_id,
          product_id: item.listing_info.product_id,
          variant_id: item.listing_info.variant_id,
          name: item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
          price: item.listing_info.selling_price,
          cur: item.listing_info.selling_price_currency,
          img: img_url + item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
          quantity: item.quantity,
          inventory: item.listing_info.total_inventory_count,
          max_limit: item.listing_info.max_limit_per_user,
          brand_name: item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        }
      })
    }

    newData.items = newData.items.reverse();
    return newData;
  }
  return {};
}

const getLoadingStatus = (store) => {
  return store.cartReducer.ui.loading;
}

const getErrorMessege = (store) => {
  return store.cartReducer.error;
}

const isAddedToCart = (store) => {
  return store.cartReducer.data.item_status === 'ADDED';
}

export { getCartResults, getLoadingStatus, getErrorMessege, isAddedToCart }