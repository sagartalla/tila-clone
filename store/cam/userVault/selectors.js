const getCardResults = (store) => {
  if (store.vaultReducer.data && store.vaultReducer.data.savedCards && store.vaultReducer.data.savedCards.length > 0) {
    return store.vaultReducer.data.savedCards;
  }
  return [];
}

const getTransactions = (store) => {
  if(store.vaultReducer.data && store.vaultReducer.data.content){
    return store.vaultReducer.data.content;
  }else{
    return [];
  }
}

const getTilaCredit = (store) => {
  if(store.vaultReducer.data && store.vaultReducer.data.tilaCredit) {
    return store.vaultReducer.data.tilaCredit
  } else {
    return {};
  }
}

const getDefaultCard = (store) => {
  if ((store.vaultReducer.data && store.vaultReducer.data.savedCards ) && store.vaultReducer.data.savedCards.length > 0) {
    return _.filter(store.vaultReducer.data.savedCards, function (value, key) { return value.default; });
  }
  return [];
}

export { getCardResults, getDefaultCard, getTilaCredit, getTransactions };
