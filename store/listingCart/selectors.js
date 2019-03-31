import _ from 'lodash';
import constants from '../../constants';

const getListingCartResults = (store) => {
  if (store.listingCartReducer.data) {
    const data = store.listingCartReducer.data;
    const ui = store.listingCartReducer.ui
    const img_url = constants.mediaDomain;
    const newData = { items: [], total_price: 0, ui };

    if (data.items) {
      newData.total_price = data.total_price;
      newData.total_offer_price = data.total_offer_price;
      newData.total_discount = data.total_discount;
      newData.total_shipping = data.total_shipping;
      newData.total_gift_charges = data.total_gift_charges;
      newData.tax = 0;
      newData.item_cnt = data.items.length;
      newData.currency = data.items[0].listing_info.selling_price_currency;
      data.items.map((item, index) => {
        newData.items[index] = {
          item_id: item.cart_item_id,
          product_id: item.listing_info.product_id,
          variant_id: item.listing_info.variant_id,
          listing_id: item.listing_info.listing_id,
          cart_item_id: item.cart_item_id,
          name: item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
          price: item.listing_info.selling_price,
          cur: item.listing_info.selling_price_currency,
          img: img_url + '/' + item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
          quantity: item.quantity,
          inventory: item.listing_info.total_inventory_count,
          max_limit: item.listing_info.max_limit_per_user,
          brand_name: item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
          gift_info: item.gift_info,
          shipping: item.listing_info.shipping,
          warranty: _.groupBy(item.listing_info.warranty_details, 'type')['MANUFACTURER'],
        }
      })
    }

    newData.items = newData.items.reverse();
    return newData;
  }
  return {};
}



export { getListingCartResults }
