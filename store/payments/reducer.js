import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
  },
  error: '',
};

const paymentsReducer = typeToReducer({
  [actions.CREATE_ORDER]: {
    PENDING: state => Object.assign({}, state, {
      ui: {
        loading: true,
      },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        // data: {"orderRes":{"order_id":"P19032046478MO2V","payment_id":"TX15530864786675783","redirect_url":"https://api-gateway-stage.fptechscience.com/transactions/fpts/transaction/checkout/ROVNw7iPhdIT6avlgNqQj5FRjrdInkGkbPvMO6IX42NjgPUMRCCi3sguA72HlHywnJ90YWOT5rsfArv3N101zA=="},"data":{"payment_options_available":[{"type":"VOUCHER","display_name":"Vouchers","balance":0,"currency_code":"SAR","amount_to_pay":0},{"type":"PAY_ONLINE","display_name":"Credit / Debit Cards","balance":0,"currency_code":"SAR","amount_to_pay":8624},{"type":"SAVED_CARD","display_name":"Saved Cards","balance":0,"currency_code":"SAR","amount_to_pay":8624,"cards_list":[{"card_token":"q2AQumTQ1P4WscoQ5jejRw==","card_type":"CREDIT","holder_name":"asdasd rsdasd","provider_type":"Visa","expiry_month":1,"expiry_year":2024,"masked_number":"411111XXXXXX1111","bank_name":null,"default":true}]}],"amount":8624,"currency":"SAR","transaction_id":"TX15530864786675783"},"payData":{"error_message":null,"iframe_url":"https://secure.telr.com/gateway/process_framed_full.html?o=4CDD0612E0E0366DBA2547C84FE9B039F33B26401586E3ABE3CB462692DAB496"}},
        data: action.payload,
        ui: { loading: false }
      });
    },
  },
  [actions.EMPTY_PAYMENT_PAYLOAD]: (state, action) => Object.assign({}, state, {
    data: action.payload,
    ui: { loading: true },
  }),
  [actions.DO_PAYMENT]: {
    PENDING: state => Object.assign({}, state, {
      ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: (state, action) => {
      const payRes = { payRes: action.payload.data };
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...payRes,
        },
        ui: {
          loading: false,
        },
      };
      return newState;
    },
  },
  [actions.SAVE_CARD]: {
    PENDING: state => Object.assign({}, state, {
      ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: state => Object.assign({}, state, {
      data: { ...state.data },
      ui: { loading: false },
    }),
  },
  [actions.MAKE_PROCESS_REQUEST]: {
    PENDING: state => Object.assign({}, state, {
      ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: (state, action) => {
      debugger;
      return Object.assign({}, state, {
        data: {
          ...state.data,
          processData: action.payload,
        },
        ui: { loading: false },
      });
    },
  },
  [actions.GET_REDIRECT]: {
    PENDING: state => Object.assign({}, state, {
      ui: { loading: true },
    }),
    REJECTED: (state, action) => Object.assign({}, state, {
      error: action.payload.message,
      ui: { loading: false },
    }),
    FULFILLED: (state, action) => {
      return Object.assign({}, state, {
        data: {
          ...state.data,
          redirect3dSecureData: action.payload,
        },
        ui: { loading: false },
      });
    },
  }
}, initialState);

export default paymentsReducer;
