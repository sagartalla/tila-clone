import moment from 'moment';
import fp, * as _ from 'lodash/fp';

const getOrdersData = (store) => {
  const { data } = store.ordersReducer
  if (data.length) {
    return data.map((order) => {
      const { 
        order_id, 
        customer_account_id, 
        created_by, 
        address, 
        phoneNo, 
        created_at,
        total_amount, 
        currency_code,
        order_items,
      } = order;
      const orderItems = _.compose(
        _.reduce((acc, val, key) => acc.concat({ id: key, products: val }), []),
        _.groupBy((i) => i.item_tracking_id),
        _.map((i) => ({ id: i.order_item_id, img: i.variant_info.image_url, name: i.variant_info.title, item_tracking_id: i.item_tracking_id }))
      )(order_items);
      
      return {
        id: order_id,
        shippingTo: {
          name: created_by || customer_account_id,
          address: address || 'No address',
          phone: phoneNo || 'No phone number',
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