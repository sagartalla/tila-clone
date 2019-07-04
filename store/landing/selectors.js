import _ from 'lodash';

const getPage = (store) => {
  return store.landingReducer.data;
}

export { getPage };
