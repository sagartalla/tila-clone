const getUserInfo = (store) => {
  if (store.personalDetailsReducer.data) {
    let contactInfo = {};
    if (store.personalDetailsReducer.data.contactInfo != "" && store.personalDetailsReducer.data.contactInfo) {
      contactInfo = store.personalDetailsReducer.data.contactInfo;
      if (contactInfo.pwd_updated_at) {
        const lastUpdated = contactInfo.pwd_updated_at.split('T')[0];
        const today = new Date();
        const last = new Date(lastUpdated);
        const timeDiff = Math.abs(today.getTime() - last.getTime());
        let diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let msg = "";
        if (diff < 1) {
          diff = Math.ceil(timeDiff / (1000 * 3600));
          msg = (diff > 1) ? " hours back" : " hour back";
        } else if (diff >= 1) {
          msg = (diff == 1) ? " day back" : " days back"
        } else if (diff >= 30) {
          diff = (diff == 30) ? "1" : Math.ceil(timeDiff / (1000 * 3600 * 24 * 30));
          msg = diff == 30 ? " month back" : " months back";
        } else if (diff >= 365) {
          diff = (diff == 365) ? "1" : Math.ceil(timeDiff / (1000 * 3600 * 24 * 30 * 365));
          msg = (diff == 365) ? " year back" : " years back";;
        }
        contactInfo.lastUpdated = diff + msg;
      }
      else
        contactInfo.lastUpdated = 'not available';

    }
    const personalInfo = store.personalDetailsReducer.data.personalInfo != "" ? store.personalDetailsReducer.data.personalInfo : {};
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

const getErrorMessege = (store) => {
  return store.personalDetailsReducer.error ? store.personalDetailsReducer.error : "";
}

export { getUserInfo, getPasswordResetStatus, getErrorMessege };