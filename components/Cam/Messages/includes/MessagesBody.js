import React from 'react';
import PropTypes from 'prop-types';
// import { languageDefinations } from '../../../../utils/lang/';
import { Row, Col } from 'react-bootstrap';

// import { mergeCss } from '../../../../utils/cssUtil';
// const styles = mergeCss('components/Cam/Messages/address');

const MessagesBody = (props) => {

  // const { DELIVERY_ADDR_PAGE } = languageDefinations();

  return (
    <div className={`${styles['messages-body']} ${styles['p-30']}`}>

    </div>
  );
}

MessagesBody.propTypes = {

};

MessagesBody.defaultProps = {

};

export default MessagesBody;
