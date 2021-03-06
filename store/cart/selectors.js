import _ from 'lodash';
import constants from '../../constants';

const getCartResults = (store) => {
  if (store.cartReducer.data) {
    const data = store.cartReducer.data;
    const ui = store.cartReducer.ui
    const img_url = constants.mediaDomain;
    const newData = { items:[], total_price: 0, ui };

    if (data.items !== null && data.items.length) {      
      newData.total_price = data.total_price || {};
      newData.total_offer_price = data.total_offer_price || {};
      newData.total_discount = data.total_discount || {};
      newData.total_shipping = data.total_shipping || {};
      newData.total_gift_charges = data.total_gift_charges || {};
      newData.total_vat = data.total_vat || {};
      newData.total_mrp = data.total_mrp || {};
      newData.payment_options_response = data.payment_options_response || {};
      newData.tax = 0;
      newData.item_cnt = data.items.length;
      newData.currency = data.total_price.currency_code;
      newData.coupon_code = data.coupon_code;
      newData.coupon_applied = data.coupon_applied;
      newData.cart_shippable = data.cart_shippable;
      newData.address = data.address;
      newData.applyCouponRequestCount = data.applyCouponRequestCount;
      newData.total_tila_care_charges = data.total_tila_care_charges;
      data.items.map((item, index) => {
        const listingInfo = item.listing_info || {};
        const variant_key = item && item.product_details && item.product_details.product_details_vo.cached_variant ? Object.keys(item.product_details.product_details_vo.cached_variant)[0] : null;
        const tuinId = item && item.product_details && item.product_details.product_details_vo && item.product_details.product_details_vo.cached_variant && item.product_details.product_details_vo.cached_variant.length > 0 ? item.product_details.product_details_vo.cached_variant[variant_key].attribute_map.tuin.attribute_values[0].value : null
        newData.items[index] = {
          active: listingInfo.active,
          item_id: item.cart_item_id,
          product_id: listingInfo.product_id,
          variant_id: listingInfo.variant_id,
          listing_id: listingInfo.listing_id,
          tuin_id: tuinId,
          cart_item_id: item.cart_item_id,
          name: item.product_details && item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
          offer_price: listingInfo.pricing && listingInfo.pricing.offer_price.display_value,
          selling_price: listingInfo.pricing && listingInfo.pricing.price.display_value,
          total_amount: item.total_amount && item.total_amount.display_value,
          cur: listingInfo.selling_price.display_currency_code,
          img: `${img_url}/${item}` && item.product_details && item.product_details.product_details_vo && item.product_details.product_details_vo.cached_product_details && item.product_details.product_details_vo.cached_product_details.media.gallery_media[0] && item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
          quantity: item.quantity,
          inventory: listingInfo.total_inventory_count,
          max_limit: listingInfo.max_limit_per_user,
          brand_name: item && item.product_details && item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
          gift_info: item.gift_info,
          shipping: listingInfo.shipping || null,
          catalogId: item.product_details && item.product_details.catalog_details.catalog_id,
          itemType: item.product_details && item.product_details.catalog_details.item_type_name,
          warranty_duration: (listingInfo.warranty_policy && listingInfo.warranty_policy.preferred_policy) ?
            listingInfo.warranty_policy.policies[listingInfo.warranty_policy.preferred_policy] : {},
          discount: listingInfo.pricing && listingInfo.pricing.discount_per_mrp,
          mrp: listingInfo.pricing && listingInfo.pricing.mrp.display_value,
          offerDiscounts: (listingInfo.pricing && listingInfo.pricing.actions) || {},
          total_discount: listingInfo.pricing && listingInfo.pricing.total_discount_mrp.display_value,
          variantAttributes: listingInfo.variant_id && item.product_details && item.product_details.product_details_vo.cached_variant[listingInfo.variant_id].attribute_map ?
            Object.values(item.product_details.product_details_vo.cached_variant[listingInfo.variant_id].attribute_map)
              .filter(attr => attr.attribute_group_name === 'IDENTITY' && attr.visible) : [],
          tila_care_policy: listingInfo.tila_care_policy,
          policies_applied: item.policies_applied || [],
          tila_care_charges: item.tila_care_charges || null,
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
    const selectedCartItem = _.find(store.cartReducer.data.items, ({ listing_id }) => {
      return store.productReducer.data[0].variant_preferred_listings[store.productReducer.variantsData.selectedVariantId][0].listing_id === listing_id;
    });
    return !!selectedCartItem;
  } catch (e) {
  }
};
const getEditDetails = (store) => {
  return store.cartReducer.editDetails
}
const isLastAddedToCartSuccess = (store) => {
  return store.cartReducer.data.addToCart.item_status === 'ADDED';
}

const getBtnLoaders = store => store.cartReducer.ui.btnLoading;

export {
  getCartResults, getLoadingStatus, getErrorMessege,
  isAddedToCart, getBtnLoaders, isLastAddedToCartSuccess, getEditDetails
};
