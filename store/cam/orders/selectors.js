import moment from 'moment';
import fp, * as _ from 'lodash/fp';
import shortid from 'shortid';

const getOrdersData = (store) => {
  const { orders } = store.ordersReducer.data
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
        _.reduce.convert((acc, val, key) => acc.concat({ id: key, products: val, status: val[0].status }), []),
        _.groupBy((i) => i.item_tracking_id || i.id),
        _.map((i) => ({ id: i.order_item_id, img: i.variant_info.image_url, name: i.variant_info.title, item_tracking_id: i.item_tracking_id || shortid.generate(), status: i.status }))
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

export { getOrdersData };