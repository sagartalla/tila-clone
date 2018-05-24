import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
    ui: {
        loading: false,
    },
    data: {},
    error: {},
};

const productReducer = typeToReducer({
    [actions.GET_ORDER_DETAILS]: {
        PENDING: state => {
            return Object.assign({}, state, { ui: { loading: true } });
        },
        FULFILLED: (state, action) => {
            return Object.assign({}, state, { data: action.payload.data, ui: { loading: true } });
        },
        REJECTED: (state, action) => {
            return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
        },
    },
}, initialState);

export default productReducer;