const getCartResults = (store) => {
  if (store.cartReducer.data) {
    const data = store.cartReducer.data;
    const img_url = 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/';
    const newData = { items: [], total_price: 0 };

    //TODO temp data modifier..
    if (data.items) {
      newData.total_price = data.total_price;
      newData.total_offer_price = data.total_offer_price;
      newData.total_discount = data.total_discount;
      newData.total_shipping = data.total_shipping;
      newData.tax = 0;
      newData.item_cnt = data.items.length;
      newData.currency = data.items[0].listing_info.selling_price_currency;

      data.items.map((item, index) => {
        const item_id = item.cart_item_id;
        const name = item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value;
        const price = item.listing_info.selling_price;
        const cur = item.listing_info.selling_price_currency;
        const img = img_url + item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url

        newData.items[index] = { item_id, name, price, cur, img }
      })
    }

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