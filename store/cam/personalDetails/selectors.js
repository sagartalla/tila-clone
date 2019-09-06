import moment from 'moment';
import { languageDefinations } from '../../../utils/lang';
const { PERSONAL_INFO_MODAL } = languageDefinations();

const getUserInfo = (store) => {
  if (store.personalDetailsReducer.data) {
    let contactInfo = {};
    if (store.personalDetailsReducer.data.contactInfo != "" && store.personalDetailsReducer.data.contactInfo) {
      contactInfo = store.personalDetailsReducer.data.contactInfo;
      if(contactInfo.email)
      {
        let email= contactInfo.email;
        email= (email.split("@")[0]).substring(0,1) + ((email.split("@")[0]).substring(1)).replace(/./g, "x")+"@"+(((email.split("@")[1]).split(".")[0]).substring(0,1))+(((email.split("@")[1]).split(".")[0]).substring(1)).replace(/./g, "x")+"."+((email.split("@")[1]).split(".")[1]) ;
        contactInfo.mailId=email;
      }
      if(contactInfo.mobile_no)
      {
        let phoneNum=contactInfo.mobile_no;
        phoneNum= phoneNum.substring(0,2)+ (phoneNum.substring(2, phoneNum.length-2)).replace(/./g, "x")+ phoneNum.slice(-2);
        contactInfo.phoneNum=phoneNum;
      }
      if (contactInfo.pwd_updated_at) {
        const lastUpdated = contactInfo.pwd_updated_at;
        const msg = moment(lastUpdated).subtract(new Date().getTimezoneOffset()).fromNow();
        contactInfo.lastUpdated = `${PERSONAL_INFO_MODAL.LAST_UPDATED} ${msg}`;
      }
      else
        contactInfo.lastUpdated = PERSONAL_INFO_MODAL.NOT_AVAILABLE;

    }
    let personalInfo = {}
    if(store.personalDetailsReducer.data.personalInfo != "" && store.personalDetailsReducer.data.personalInfo && Object.keys(store.personalDetailsReducer.data.personalInfo).length > 0)
    {
      personalInfo=store.personalDetailsReducer.data.personalInfo;
      personalInfo.user_name=personalInfo.first_name+" "+personalInfo.last_name;
    }
    return { contactInfo, personalInfo };
  }
  return {};
}

const getPasswordResetStatus = (store) => {
  if (store.personalDetailsReducer.data.passResetStatus) {
    return store.personalDetailsReducer.data.passResetStatus;
  }
  return {};
}

const getEditPersonalInfoStatus = (store) => {
  if (store.personalDetailsReducer.data.personalInfoStatus) {
    return store.personalDetailsReducer.data.personalInfoStatus;
  }
  return {};
}

const getImageSource = (store) => {
  if(store.personalDetailsReducer.data.downloadPic){
    return store.personalDetailsReducer.data.downloadPic
  }
}

const getPictureDocumentId = (store) => {
  if(store.personalDetailsReducer.data.uploadPicStatus) {
    return store.personalDetailsReducer.data.uploadPicStatus.documentId;
  }
  return null;
}

const getErrorMessege = (store) => {
  return store.personalDetailsReducer.error ? store.personalDetailsReducer.error : "";
}
const getLoadingStatus = (store) => {
  return store.personalDetailsReducer.ui.loading
}
const getOtpData = (store) => {
  return store.personalDetailsReducer.otpData
}
const resetPasswordStatus =(store) => {
return store.personalDetailsReducer;
}
const getOtpField = (store) => {
  return store.personalDetailsReducer.showOtpField;
}

const forgotPasswordStatus = (store) => {
  if(store.personalDetailsReducer.data.Response){
    return store.personalDetailsReducer.data.Response;
  }else if(store.personalDetailsReducer.data.message){
    return store.personalDetailsReducer.data.message;
  }
}


export { getUserInfo, getPasswordResetStatus, getLoadingStatus, getPictureDocumentId, getErrorMessege, getEditPersonalInfoStatus , getOtpField, getImageSource, forgotPasswordStatus, resetPasswordStatus, getOtpData};
