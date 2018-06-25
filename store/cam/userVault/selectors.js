const getCardResults = (store) => {
  if (store.vaultReducer.data && store.vaultReducer.data.length > 0) {
    return store.vaultReducer.data;
  }
  return [];
}

export { getCardResults };
