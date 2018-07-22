import api from './api';

const actions = {
  ADD_TO_COMPARE: 'ADD_TO_COMPARE',
};

const actionCreators = {
  addToCompare: (params) => ({
    type: actions.ADD_TO_COMPARE,
    payload: api.addToCompare(params),
  })
};

export { actions, actionCreators };
