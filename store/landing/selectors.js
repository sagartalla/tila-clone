import _ from 'lodash';

const getPages = (store) => {
  return JSON.parse(store.landingReducer.data.content[0].json);
}

const getElectronicsPage = (store) => {
<<<<<<< Updated upstream
  return JSON.parse(_.find(store.landingReducer.data.content, { pageTypeValue: 'Electronics' }).json);
=======
  console.log(store.landingReducer.data)
  return JSON.parse(_.find(store.landingReducer.data.content, { page_type_value: 'Electronics' }).json);
>>>>>>> Stashed changes
}

const getFashionPage = (store) => {
  return JSON.parse(_.find(store.landingReducer.data.content, { pageTypeValue: 'Fashion' }).json);
}

export { getPages, getElectronicsPage, getFashionPage };
