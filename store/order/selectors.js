import fp, * as _ from 'lodash/fp';
import shortid from 'shortid';

const getOrderDetails = (store) => {
  const { created_by, customer_account_id, address, order_id, created_at, order_items, total_amount, total_shipping } = store.singleOrderReducer.data.orderDetails;
  if(order_id){
    return {
      name: address ? `${address.first_name} ${address.last_name}` : 'No Name',
      address: address ? `${address.address_line_1}, ${address.address_line_2}, ${address.city}, ${address.state}, ${address.postal_code}` : 'no address info',
      phone: address ? `${address.mobile_country_code} ${address.mobile_no}` : 'No phone number',
      orderId: order_id,
      orderDate: created_at,
      itemsTotal: order_items.reduce((acc, item) => acc + item.price.total_price, 0),
      orderTotal: total_amount,
      shippingTotal: total_shipping,
      paymentDetals: [],
      //TODO move compose to common util
      orderItems: _.compose(
        _.reduce.convert({ 'cap': false })((acc, val, key) => {
          return acc.concat({ id: key, products: val, status: val[0].status });
        }, []),
        _.groupBy((i) => i.item_tracking_id || i.id),
        _.map((i) => ({ id: i.order_item_id, img: i.variant_info.image_url, name: i.variant_info.title, item_tracking_id: i.item_tracking_id || shortid.generate(), status: i.status }))
       )(order_items)
    };
  }
  return {
    paymentDetals: [],
    orderItems:[]
  };
};

const getOrderIssue = (store) => {
  return store.singleOrderReducer.data.orderIssue;
}

const getCancelStatus = (store) => {
  return store.singleOrderReducer.data.orderIssue.cancelStatus;
}

const getErrorMessege = (store) => {
  return store.singleOrderReducer.error;
}

const getLoadingStatus = (store) => {
  return store.singleOrderReducer.ui.loading;
}

const getSelectedOrder = (store) => (orderItemId) => {
  const item = _.find({ order_item_id: orderItemId }, store.singleOrderReducer.data.orderDetails.order_items);
  return { id: item.order_item_id, img: item.variant_info.image_url, name: item.variant_info.title, item_tracking_id: item.item_tracking_id || shortid.generate(), status: item.status }
}

const getReturnStatus = (store) => {
  return store.singleOrderReducer.data.orderIssue.returnStatus;
}

const getVariants = (store) => {
  // return store.singleOrderReducer.data.orderIssue.exchangeVariants.variant_details.size.attribute_values;
  /*{
    "comment": "string",
    "country_code": "string",
    "inventory_location_id": "string",
    "new_listing_id": "string",
    "order_item_id": "string",
    "reason": "string",
    "seller_id": "string",
    "sub_reason": "string",
    "user_id": "string",
    "variant_id": "string"
  }*/
  return store.singleOrderReducer.data.orderIssue.exchangeVariants;
  store.singleOrderReducer.data.orderIssue.exchangeVariants.map()
}

export { getOrderDetails, getOrderIssue, getCancelStatus, getErrorMessege, getLoadingStatus, getSelectedOrder, getReturnStatus, getVariants };
