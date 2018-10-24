import _ from 'lodash';

const getPages = (store) => {
  return JSON.parse(store.landingReducer.data.content[0].json);
}

const getElectronicsPage = (store) => {
  return JSON.parse(_.find(store.landingReducer.data.content, { page_type_value: 'Electronics' }).json);
}

export { getPages, getElectronicsPage };
