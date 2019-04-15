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
      newData.total_gift_charges = data.total_gift_charges;
      newData.tax = 0;
      newData.item_cnt = data.items.length;
      newData.currency = data.items[0].listing_info.selling_price_currency;
      newData.coupon_code = data.coupon_code;
      newData.coupon_applied = data.coupon_applied;
      newData.applyCouponRequestCount = data.applyCouponRequestCount;
      data.items.map((item, index) => {
        newData.items[index] = {
          item_id: item.cart_item_id,
          product_id: item.listing_info.product_id,
          variant_id: item.listing_info.variant_id,
          listing_id: item.listing_info.listing_id,
          cart_item_id: item.cart_item_id,
          name: item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
          offer_price: item.listing_info.pricing && item.listing_info.pricing.offer_price,
          selling_price: item.listing_info.pricing && item.listing_info.pricing.price,
          total_amount: item.total_amount,
          cur: item.listing_info.selling_price_currency,
          img: img_url + '/' + item && item.product_details && item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
          quantity: item.quantity,
          inventory: item.listing_info.total_inventory_count,
          max_limit: item.listing_info.max_limit_per_user,
          brand_name: item && item.product_details && item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
          gift_info: item.gift_info,
          shipping: item.listing_info.shipping,
          catalogId: item.product_details.catalog_details.catalog_id,
          itemType: item.product_details.catalog_details.item_type_name,
          warranty_duration: item.listing_info.warranty_policy.preferred_policy ?
            item.listing_info.warranty_policy.policies[item.listing_info.warranty_policy.preferred_policy] : {},
          discount: item.listing_info.pricing && item.listing_info.pricing.discount_per_mrp,
          mrp: item.listing_info.pricing && item.listing_info.pricing.mrp,
          offerDiscounts: item.listing_info.pricing && item.listing_info.pricing.actions,
          total_discount: item.listing_info.pricing && item.listing_info.pricing.total_discount_mrp,
          variantAttributes: item.product_details.product_details_vo.cached_variant[item.listing_info.variant_id].attribute_map ?
            Object.values(item.product_details.product_details_vo.cached_variant[item.listing_info.variant_id].attribute_map)
              .filter(attr => attr.visible) : [],
        };
      });
    }

    // newData.items = newData.items.reverse();
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
    const selectedCartItem = _.find(store.cartReducer.data.items, ({listing_id}) => {
      return store.productReducer.data[0].variant_preferred_listings[store.productReducer.variantsData.selectedVariantId][0].listing_id === listing_id;
    });
    return !!selectedCartItem;
  } catch (e) {
  }
};

const isLastAddedToCartSuccess = (store) => {
  return store.cartReducer.data.addToCart.item_status === 'ADDED';
}

const getBtnLoaders = store => store.cartReducer.ui.btnLoading;

export {
  getCartResults, getLoadingStatus, getErrorMessege,
  isAddedToCart, getBtnLoaders, isLastAddedToCartSuccess,
};
