import _ from 'lodash';

const getPages = (store) => {
  return JSON.parse(store.landingReducer.data.content[0].json);
}

export { getPages };
