import typeToReducer from 'type-to-reducer';

const initialState = {
  isApiResponseInvalid: false
};

const instantCheckoutReducer = typeToReducer({
  "INVALID_API_RESPONSE" : (state) => {
    return {
      ...state,
      isApiResponseInvalid: true
    };
  }
}, initialState);

export default instantCheckoutReducer;
