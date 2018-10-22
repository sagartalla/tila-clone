import _ from 'lodash';

const getPages = (store) => {
  return store.landingReducer.content[0];
}

export { getPages };
