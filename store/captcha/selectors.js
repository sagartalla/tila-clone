export const getCaptcha = (store) => {
  if(store.captchaReducer.data){
    return store.captchaReducer.data;
  }else{
    return null;
  }
}

export const getVerification = (store) => {
  if(store.captchaReducer.data.status){
    return store.captchaReducer.data.status;
  }else{
    return '';
  }
}