import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import EditPassword from './EditPassword';
import EditPhone from './EditPhone';

const UpdateContactInfoModal = (props) => {
  const { element } = props || "";
  return (
    <div>
      {
        element == "password" ?
          <EditPassword {...props} />
          : element == "phone" ?
            <EditPhone {...props} showImage={true} />
            :
            (<div>Loading...</div>)
      }
    </div>
  );

}
export default UpdateContactInfoModal;
