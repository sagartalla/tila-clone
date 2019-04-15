const orderStatusAttributes = Object.freeze({
  PLACED: 'Ordered',
  PROCESSING: 'Packed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  SCHEDULED: 'Scheduled',
  PICKED: 'Picked',
  COMPLETED: 'Completed',
  RETURN_IN_PROGRESS: 'Return In Progress',
  EXCHANGE_IN_PROGRESS: 'Exchange In Progress',
  EXCHANGED: 'Exchanged',
  RETURNED: 'Returned',
});

export default orderStatusAttributes;