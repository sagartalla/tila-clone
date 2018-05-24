const temp_params = {
  "country_code": "IND",
  "currency_code": "INR",
  "customer_account_id": "100002",
  "items": [
    {
      "catalog_id": "2",
      "inventory_location_id": "1",
      "item_type": "string",
      "listing_id": "string",
      "product_id": "string",
      "seller_id": "string",
      "selling_price": 100,
      "title": "string",
      "variant_id": "string"
    }
  ]
}


const getCartResults = (store)=>{
  if (store.cartReducer.data) {
    const data = store.cartReducer.data;
    const newData = [];
    const cartJson= {
      items:[]
    }
    

    data.items && data.items.map((item, index) => {
      const name = item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value;
      const price= item.listing_info.selling_price;
      const cur  = item.listing_info.selling_price_currency;

      newData[index] = {name, price, cur}

      cartJson.items.push({
        "catalog_id": item.product_details.catalog_details.catalog_id,
        "inventory_location_id": item.listing_info.inventory_list[0].inventory_id,
        "item_type": item.product_details.catalog_details.item_type_name,
        "listing_id": item.listing_info.listing_id,
        "product_id": item.listing_info.product_id,
        "seller_id": item.listing_info.merchant_id,
        "selling_price": item.listing_info.selling_price,
        "title": name,
        "variant_id": item.listing_info.variant_id
      })
    })

    localStorage.setItem('cartJson', JSON.stringify(cartJson));
    return newData;
  }
  return {};
}

const getLoadingStatus = (store) => {
  return store.cartReducer.ui.loading;
}

export { getCartResults, getLoadingStatus }