const orderStatusAttributes = Object.freeze({
  PLACED: 'Ordered',
  PROCESSING: 'Ready to ship',
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
  PICKUP_INITIATED: 'Pickup Initiated',
  REPLACEMENT_IN_PROGRESS: 'Replace In Progress',
  REPLACED: 'Replaced',
  RETURN_REQUESTED: 'Return Requested',
  RETURN_QC_APPROVED: 'Return QC Approved',
  RETURN_QC_REJECTED: 'Return QC Rejected',
});

export default orderStatusAttributes;
