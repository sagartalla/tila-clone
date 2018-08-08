import shortid from 'shortid';
import _ from 'lodash';

const getMegamenu = (store) => {
  return store.megamenuReducer.data;
}

export { getMegamenu };