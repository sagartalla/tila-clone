const getCaptcha = (store) => {
  if(store.captchaReducer.data.images){
    return {
      ...store.captchaReducer.data,
      images: store.captchaReducer.data.images.map((a) => {
        return {
          ...a,
          url: a.url.replace('dev-customer-imgs.s3.ap-south-1.amazonaws.com', 'static-dev.tila.com')
        }
      })
    };
  }else{
    return null;
  }
}

const getVerification = (store) => {
  if(store.captchaReducer.data.status){
    return store.captchaReducer.data.status;
  }else{
    return '';
  }
}

export {
  getVerification, getCaptcha
};
