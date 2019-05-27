import typeToReducer from 'type-to-reducer';

const initialState = {};

const instantCheckoutReducer = typeToReducer({
  "INVALID_API_RESPONSE" : (state) => {
    return {
      ...state,
      isApiResponseInvalid: true
    };
  }
}, initialState);

export default instantCheckoutReducer;
