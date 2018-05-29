const getFinalOrderDetails = (store) => {
  if (store.thankyouReducer.data) {
    let orderDetails= store.thankyouReducer.data;
    if (Object.keys(orderDetails).length) {
      orderDetails.orderDate = orderDetails.created_at ? orderDetails.created_at.split("T")[0] : "";
      orderDetails.orderAddress = orderDetails.hasOwnProperty('address') ? orderDetails.address : "DUMMY_ADDRESS";
      orderDetails.orderId = orderDetails.order_id.split("-")[4];
      const orderItems = orderDetails.order_items;
      orderDetails.totalPrice = orderItems.reduce(function (total, obj) { return total + obj.price.total_price; }, 0);    
    }
    return orderDetails;
  }
  return {};
}

export { getFinalOrderDetails };