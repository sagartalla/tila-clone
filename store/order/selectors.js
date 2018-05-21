import fp, * as _ from 'lodash/fp';

const getOrderDetails = (store) => {
  const { created_by, customer_account_id, address, order_id, created_at, order_items, total_amount, total_shipping } = store.singleOrderReducer.data;
  if(order_id){
    return {
      name: created_by || customer_account_id,
      address: address || 'No address',
      phone: 'No phone',
      orderId: order_id,
      orderDate: created_at,
      itemsTotal: order_items.reduce((acc, item) => acc + item.price.total_price, 0),
      orderTotal: total_amount,
      shippingTotal: total_shipping,
      paymentDetals: [],
      //move compose to common util
      orderItem: _.compose(
        _.reduce((acc, val, key) => {
          return acc.concat({ id: key, products: val })
        }, []),
        _.groupBy((i) => i.item_tracking_id),
        _.map((i) => ({ id: i.order_item_id, img: i.variant_info.image_url, name: i.variant_info.title, item_tracking_id: i.item_tracking_id }))
      )(order_items)[0]
    };
  }
  return {
    paymentDetals: [], 
    orderItem:{
      products: []
    }
  };
};

export { getOrderDetails };
