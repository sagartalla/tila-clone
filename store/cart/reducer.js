import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
      loading: false,
  },
  data: {},
  error: '',
};

const cartReducer = typeToReducer({
    [actions.GET_CART_DETAILS]: {
        PENDING: state => {
          return Object.assign({}, state, { error: '', ui: { loading: true } });
        },
        FULFILLED: (state, action) => {
          // console.log(state, actions)
          return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
        },
        REJECTED: (state, action) => {

          return Object.assign({}, state, { error: action.payload.message, ui: { loading: false } })
        },
    },
    [actions.ADD_TO_CART]: {
        PENDING: state => {
          return Object.assign({}, state, { error: '', ui: { loading: true } });
        },
        FULFILLED: (state, action) => {
          return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
        },
        REJECTED: (state, action) => {
          return Object.assign({}, state, { 
            error: action.payload.response ? action.payload.response.data.message : action.payload.message, 
            ui: { 
              loading: false 
            } 
          });
        },
    },
    [actions.REMOVE_CART_ITEM]: {
      PENDING: state => {
        return Object.assign({}, state, { error: '', ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
      },
      REJECTED: (state, action) => {
        return Object.assign({}, state, {
          error: action.payload.response ? action.payload.response.data.message : action.payload.message, 
          ui: { 
            loading: false 
          } 
        });
      },
  },
  [actions.INCREASE_ITEM_CNT]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      // const cart_item_id = JSON.parse(action.payload.config.data).cart_item_id;
      // const items = state.data.items;
      // console.log(state, action, cart_item_id);
      
      // items.map((item)=>{
      //   if(item.listing_id == cart_item_id){
      //     error = action.payload.response ? action.payload.response.data.message : action.payload.message
      //   }
      //   return item;
      // })

      // console.log(state.data.items);



      return Object.assign({}, state, {
        data: state.data,
        error: action.payload.response ? action.payload.response.data.message : action.payload.message, 
        ui: { 
          loading: false 
        } 
      });
    },
  },
  [actions.DECREASE_ITEM_CNT]: {
    PENDING: state => {
      return Object.assign({}, state, { error: '', ui: { loading: true } });
    },
    FULFILLED: (state, action) => {
      return Object.assign({}, state, { data: action.payload.data, ui: { loading: false } });
    },
    REJECTED: (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.response ? action.payload.response.data.message : action.payload.message, 
        ui: { 
          loading: false 
        } 
      });
    },
  }
}, initialState);

export default cartReducer;