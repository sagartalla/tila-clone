import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
    ui: {
        loading: false,
    },
    data: {},
    error: {},
};

const orderReducer = typeToReducer({}, initialState);

export default orderReducer;