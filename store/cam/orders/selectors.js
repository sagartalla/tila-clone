import moment from 'moment';
import fp, * as _ from 'lodash/fp';
import shortid from 'shortid';

const getOrdersData = (store) => {
  const { orders} = store.ordersReducer.data
  if (orders && orders.length) {
    return orders.map((order) => {
      const {
        order_id,
        customer_account_id,
        address,
        created_at,
        total_amount,
        currency_code,
        order_items,
      } = order;
      const orderItems = _.compose(
        _.reduce.convert({'cap': false })((acc, val, key) => acc.concat(
          {
            id: val.id,
            products: [val],
            status: val.status ,
            variantId: val.variantId,
            isCancelable: val.isCancelable,
            isReturnable: val.isReturnable,
            isExchangable: val.isExchangable,
          }), []),
        _.map(i => ({
          id: i.order_item_ids[0],
          img: i.variant_info.image_url,
          name: i.variant_info.title,
          item_tracking_id: i.item_tracking_id || shortid.generate(),
          status: i.external_status,
          promisedDeliveryDate: i.promised_delivery_date,
          variantId: i.variant_id,
          orderIds: i.order_item_ids,
          isCancelable: i.cancelable,
          isReturnable: i.returnable,
          isExchangable: i.exchangeable,
        })),
      )(order_items);
      return {
        id: order_id,
        shippingTo: {
          name: address ? `${address.first_name} ${address.last_name}` : 'No Name',
          address: address ? `${address.address_line_1}, ${address.address_line_2}, ${address.city}, ${address.state}, ${address.postal_code}` : 'no address info',
          phone: address ? `${address.mobile_country_code} ${address.mobile_no}` : 'No phone number',
        },
        orderDate: moment(created_at).format('MMMM DD, YYYY'),
        orderTotal: `${total_amount} ${currency_code}`,
        orderItems,
      };
    });
  }
  return [];
};

const getPageDetails = (store) => {
  const {total_pages=0,total_size=0,page=0} =  store.ordersReducer.data

  return {
    total_pages,
    total_size,
    page
  }
}
export { getOrdersData, getPageDetails };
