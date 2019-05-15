import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { languageDefinations } from '../../../../utils/lang';
import EditPassword from './EditPassword';
import EditPhone from './EditPhone';

const { CONTACT_INFO_MODAL } = languageDefinations();
const UpdateContactInfoModal = (props) => {
  const { element } = props || "";
  return (
    <div>
      {
        element == "password" ?
          <EditPassword {...props} />
          : element == "phone" ?
            <EditPhone
              {...props}
              isPopup={true}
              mobileVerified={false}
              buttonText={CONTACT_INFO_MODAL.VERIFY_MOBILE_NUMBER}
            />
            :
            (<div>Loading...</div>)
      }
    </div>
  );

}
export default UpdateContactInfoModal;
