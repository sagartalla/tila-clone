const getCardResults = (store) => {
  if (store.vaultReducer.data && store.vaultReducer.data.savedCards && store.vaultReducer.data.savedCards.length > 0) {
    return store.vaultReducer.data.savedCards;
  }
  return [];
}
const getSavedCardDetails = store => {
  let cardsList = [];
  let savedCards = [];
  if(store.vaultReducer.data && store.vaultReducer.data.cardDetails) {
    store.vaultReducer.data.cardDetails.payment_options_available.forEach((item) => {
      if(item.type === 'SAVED_CARD') {
        cardsList = item.cards_list
      }
    })
  }
  if (store.vaultReducer.data && store.vaultReducer.data.savedCards) {
     savedCards = store.vaultReducer.data.savedCards;
  }
  return { cardsList, savedCards };
}
const getTransactions = (store) => {
  if(store.vaultReducer.data && store.vaultReducer.data.content){
    return store.vaultReducer.data.content;
  }else{
    return [];
  }
}
const getCardDetails = (store) => {
  if(store.vaultReducer.data && store.vaultReducer.data.cardDetails) {
    return store.vaultReducer.data.cardDetails
  } else {
    return {}
  }
}
const getSelectedCard = (store) => {
  let selectedCard = []
  let filteredCard = []
  if(store.vaultReducer.data && store.vaultReducer.data.cardDetails) {
    selectedCard = store.vaultReducer.data.cardDetails.payment_options_available.filter((item) => item.type === 'SAVED_CARD')
    .reduce((acc, item) => [...acc, ...item.cards_list], [])
    filteredCard = selectedCard.filter((item) => item.card_token === store.vaultReducer.selectedCard )
    selectedCard = filteredCard.length > 0 ? filteredCard : selectedCard.filter((value) => value.default)
  }
  return selectedCard;
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

export { getCardResults, getDefaultCard, getTilaCredit, getTransactions, getCardDetails, getSavedCardDetails, getSelectedCard };
