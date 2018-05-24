const getCartResults = (store)=>{
  console.log(store.cartReducer);

  return [];
}

const getLoadingStatus = (store) => {
  return store.cartReducer.ui.loading;
}

export { getCartResults, getLoadingStatus }