const getCardResults = (store) => {
  if (store.vaultReducer.data && store.vaultReducer.data.length > 0) {
    return store.vaultReducer.data;
  }
  return [];
}

const getDefaultCard = (store) => {
  if (store.vaultReducer.data && store.vaultReducer.data.length > 0) {
    return _.filter(store.vaultReducer.data, function (value, key) { return value.default; });
  }
  return [];
}

export { getCardResults, getDefaultCard };
