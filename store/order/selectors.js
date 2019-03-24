import fp, * as _ from 'lodash/fp';
import shortid from 'shortid';

const getOrderDetails = (store) => {
  const { created_by, customer_account_id, status, address, order_id, created_at, order_items, price, total_shipping, currency_code, payments } = store.singleOrderReducer.data.orderDetails;
  if (order_id) {
    return {
      name: address ? `${address.first_name} ${address.last_name}` : 'No Name',
      address: address ? `${address.address_line_1 !== null ? `${address.address_line_1},` : ''} ${address.address_line_2 !== null ? `${address.address_line_2},` : ''}
        ${address.city !== null ? `${address.city},` : ''} ${address.state !== null ? `${address.state},` : ''} ${address.postal_code !== null ? `${address.postal_code}` : ''}` : 'no address info',
      phone: address ? `${address.mobile_country_code} ${address.mobile_no}` : 'No phone number',
      orderId: order_id,
      orderDate: created_at,
      price,
      currency_code,
      shippingTotal: total_shipping,
      payments,
      status,
      //TODO move compose to common util
      orderItems: _.compose(
        _.reduce.convert({ 'cap': false })((acc, val, key) => {
          return acc.concat({ id: key, products: [val], status: val.status });
        }, []),
        _.map((i) => ({
          id: i.order_item_ids[0],
          img: i.variant_info.image_url,
          name: i.variant_info.title,
          item_tracking_id: i.item_tracking_id || shortid.generate(),
          status: i.external_status,
          state_time_estimates: i.state_time_estimates,
          price: i.price,
          currency_code: currency_code,
          orderIds: i.order_item_ids,
          offers: i.offers,
          promisedDeliveryDate: i.promised_delivery_date
        }))
      )(order_items)
    };
  }
  return {
    paymentDetals: [],
    orderItems: []
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
  return { id: item.order_item_id, img: item.variant_info.image_url, name: item.variant_info.title, item_tracking_id: item.item_tracking_id || shortid.generate(), status: item.external_status }
}

const getReturnStatus = (store) => {
  return store.singleOrderReducer.data.orderIssue.returnStatus;
}

const getExchangeOptions = (store) => {
  const orderData = store.singleOrderReducer.data.orderIssue;
  const { exchangeVariants: data, selectedVariant, computedExchangeOptions } = orderData;
  const { variantAttrValue, variantAttrKey } = selectedVariant || {};
  let { listingDetails, variantDetails } = computedExchangeOptions || {};

  listingDetails = listingDetails || data.map((ol, index) => {
    const { listing } = variantInfo;
    const { listing_id: listingId, merchant_id: sellerId } = listing;
    const { inventory_id: inventoryLocationId } = listing.inventory_list[0];
    return {
      listingId,
      inventoryLocationId,
      sellerId,
    };
  });

  variantDetails = variantDetails || data.reduce((acc, variantInfo, index) => {
    const { variant_details } = variantInfo;
    const { attribute_map: attributeMap } = variant_details;
    _.forEach.convert({ 'cap': false })((value, key) => {
      const { attribute_group_name: attributeGroupName, attribute_values: attributeValues, display_string: displayString } = value;
      if (attributeGroupName !== 'IDENTITY') return;
      let newValues = [];
      if (acc[key]) {
        newValues = newValues.concat(acc[key].attrValues);
      }
      newValues[index] = attributeValues[0].value;
      acc = {
        ...acc,
        [key]: {
          name: displayString,
          attrValues: newValues,
        }
      }
    }, attributeMap);
    return acc;
  }, {});

  if (selectedVariant) {
    let indices = [];
    var array = variantDetails[variantAttrKey].attrValues;
    var element = variantAttrValue;
    var idx = array.indexOf(element);
    while (idx != -1) {
      indices.push(idx);
      idx = array.indexOf(element, idx + 1);
    }
    listingDetails = listingDetails.filter((item, index) => indices.indexOf(index) !== -1);
    variantDetails = _.convert({ 'cap': false })((acc, val, key) => ({
      ...acc,
      [key]: {
        ...acc[key],
        attrValues: acc[key].attrValues.filter((item, index) => indices.indexOf(index) !== -1)
      }
    }), {}, variantDetails);
  }

  return {
    listingDetails,
    variantDetails,
  };
}

export { getOrderDetails, getOrderIssue, getCancelStatus, getErrorMessege, getLoadingStatus, getSelectedOrder, getReturnStatus, getExchangeOptions };
