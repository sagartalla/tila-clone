import _ from 'lodash';
import constants from '../../constants';

const getCartResults = (store) => {
  if (store.cartReducer.data) {
    const data = store.cartReducer.data;
    const ui = store.cartReducer.ui
    const img_url = constants.mediaDomain;
    const newData = { items: [], total_price: 0, ui };

    if (data.items !== null && data.items.length) {
      newData.total_price = data.total_price;
      newData.total_offer_price = data.total_offer_price;
      newData.total_discount = data.total_discount;
      newData.total_shipping = data.total_shipping;
      newData.tax = 0;
      newData.item_cnt = data.items.length;
      newData.currency = data.items[0].listing_info.selling_price_currency;
      newData.coupon_code = data.coupon_code;
      data.items.map((item, index) => {
        newData.items[index] = {
          item_id: item.cart_item_id,
          product_id: item.listing_info.product_id,
          variant_id: item.listing_info.variant_id,
          listing_id: item.listing_info.listing_id,
          cart_item_id: item.cart_item_id,
          name: item && item.product_details && item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
          price: item.listing_info.selling_price,
          total_amount: item.total_amount,
          cur: item.listing_info.selling_price_currency,
          img: img_url + '/' + item && item.product_details && item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
          quantity: item.quantity,
          inventory: item.listing_info.total_inventory_count,
          max_limit: item.listing_info.max_limit_per_user,
          brand_name: item && item.product_details && item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
          gift_info: item.gift_info,
          shipping: item.listing_info.shipping,
          catalogId: item && item.product_details && item.product_details.catalog_details.catalog_id,
          itemType: item && item.product_details && item.product_details.catalog_details.item_type_name,
          warranty: _.groupBy(item.listing_info.warranty_details, 'type')['MANUFACTURER'] || [{}],
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

// const getCartItemIdFromListingId = (store) => (cartData, listingId) => {
//   const val = cartData.items.filter(item => item.listing_id == listingId)
//   return val.length > 0 ? val[0].cart_item_id : ''
// }

const isAddedToCart = (store) => {
  try {
    return store.cartReducer.data.addToCart.item_status === 'ADDED';
  } catch (e) {

  }

}

export { getCartResults, getLoadingStatus, getErrorMessege, isAddedToCart }
