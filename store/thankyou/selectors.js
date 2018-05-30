const getFinalOrderDetails = (store) => {
  if (store.thankyouReducer.data) {
    let orderDetails= store.thankyouReducer.data;
    const { address, created_at, order_id, order_items: orderItems } = orderDetails;
    if (Object.keys(orderDetails).length) {
      orderDetails.orderDate = created_at ? created_at.split("T")[0] : "";
      orderDetails.orderAddress = address ? `${address.address_line_1}, ${address.address_line_2}, ${address.city}, ${address.state}, ${address.postal_code}` : 'no address info'
      orderDetails.orderId = order_id.split("-")[4] || order_id;
      orderDetails.totalPrice = orderItems.reduce(function (total, obj) { return total + obj.price.total_price; }, 0);    
    }
    return orderDetails;
  }
  return {};
}

export { getFinalOrderDetails };