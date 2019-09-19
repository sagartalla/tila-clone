import moment from 'moment-timezone';
import fp, * as _ from 'lodash/fp';
import shortid from 'shortid';

const getOrdersData = (store,data) => {
  const { orders } = store.ordersReducer[data];

  if (orders && orders.length) {
    return orders.map((order) => {
      const {
        order_id,
        customer_account_id,
        address,
        created_at,
        total_amount,
        total_shipping,
        price,
        currency_code,
        order_items,
        order_type,
        invoice_id,
      } = order;
      debugger;
      const orderItems = _.compose(
        _.reduce.convert({ cap: false })((acc, val, key) => acc.concat({
          id: val.id,
          products: [val],
          status: val.status,
          variantId: val.variantId,
          isCancelable: val.isCancelable,
          isReturnable: val.isReturnable,
          isExchangable: val.isExchangable,
          isDamageProtectionAvailable:val.isDamageProtectionAvailable,
          isWarrantyAvailable:val.isWarrantyAvailable,
          listingId:val.listingId,
          tilaPolicy:val.tilaPolicy,
          tuinId: val.tuinId,
          reviewsData: {
            media: val.img,
            title: val.name,
          },
          catalogObj: {
            catalog_id: val.catalogId,
            variant_id: val.variantId,
            product_id: val.productId,
            item_type: val.itemType,
          }
        }), []),
        _.map(i => ({
          id: i.order_item_ids[0],
          img: i.variant_info.image_url,
          name: i.variant_info.title,
          listingId:i.listing_id,
          itemType: i.variant_info.item_type,
          productId: i.variant_info.product_id,
          catalogId: i.variant_info.catalog_id,
          item_tracking_id: i.item_tracking_id || shortid.generate(),
          status: i.external_status,
          state_time_estimates: i.state_time_estimates,
          promisedDeliveryDate: i.promised_delivery_date,
          variantId: i.variant_id,
          orderIds: i.order_item_ids,
          price: i.price,
          isCancelable: i.cancelable,
          isDamageProtectionAvailable:i.is_damage_protection_available,
          isWarrantyAvailable:i.is_warranty_available,
          isReturnable: i.returnable,
          isExchangable: i.exchangeable,
          order_type: i.order_type,
          order_item_type: i.order_item_type,
          order_status: i.status,
          refunds: i.refunds,
          tilaPolicy:i.tila_care_policies || [],
          gift_info: i.gift_info,
          variantAttributes: i.variant_info && i.variant_info.variant_details && i.variant_info.variant_details.attribute_map ?
            Object.values(i.variant_info.variant_details.attribute_map).filter(attr => attr.attribute_group_name === 'IDENTITY' && attr.visible) : [],
          tuinId: i.variant_info && i.variant_info.variant_details && i.variant_info.variant_details.attribute_map && i.variant_info.variant_details.attribute_map.tuin ?
            i.variant_info.variant_details.attribute_map.tuin.attribute_values[0].value : null,
        })),
        _.filter(i => i.order_item_type === 'DELIVERY'),
      )(order_items);
      return {
        id: order_id,
        shippingTo: {
          name: address ? `${address.first_name} ${address.last_name}` : 'No Name',
          address: address ? `${address.address_line_1}, ${address.address_line_2}, ${address.city}, ${address.postal_code}` : 'no address info',
          phone: address ? `${address.mobile_country_code} ${address.mobile_no}` : 'No phone number',
        },
        orderDate: moment(created_at).tz('Asia/Riyadh').format('MMMM DD, YYYY'),
        orderTotal: `${total_amount.currency_code} ${total_amount.display_value}`,
        orderCurrency: `${total_amount.currency_code}`,
        orderAmount: `${total_amount.display_value}`,
        totalOrderPrice:price,
        shippingCharges:   `${total_shipping.currency_code} ${total_shipping.display_value}`,
        orderItems,
        order_type,
        invoice_id: order_items.find(x => x.invoice_id !== '').invoice_id,
      };
    });
  }
  return [];
};

const getPageDetails = (store) => {
  const { total_pages = 0, total_size = 0, page = 0 } = store.ordersReducer.data;
  return {
    total_pages,
    total_size,
    page,
  };
};
const getWarrantyPageDetails = (store) => {
  const { total_pages = 0, total_size = 0, page = 0 } = store.ordersReducer.warrantyData;
  return {
    total_pages,
    total_size,
    page,
  };
}
const getOrderLoadingState = (store) => {
  return store.ordersReducer.ui.loading;
};

export { getOrdersData, getPageDetails, getOrderLoadingState, getWarrantyPageDetails };
