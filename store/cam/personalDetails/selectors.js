import moment from 'moment';

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
        const lastUpdated = contactInfo.pwd_updated_at.split('T')[0];
        let msg = moment(new Date(lastUpdated)).fromNow();
        contactInfo.lastUpdated = "Last updated "+ msg;
      }
      else
        contactInfo.lastUpdated = 'Not Available';

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

const getErrorMessege = (store) => {
  return store.personalDetailsReducer.error ? store.personalDetailsReducer.error : "";
}

const resetPasswordStatus =(store) => {
return store.personalDetailsReducer;
}

export { getUserInfo, getPasswordResetStatus, getErrorMessege, getEditPersonalInfoStatus ,resetPasswordStatus};