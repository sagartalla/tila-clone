import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import PaymentStatus from './includes/PaymentStatus';
import Summary from './includes/Summary';

import styles from './thankyou.styl';

class Thankyou extends Component {
  render() {
    return (
      <div className={styles['thankyou']}>
        <Grid>
          <PaymentStatus />
          <Summary />
        </Grid>
      </div>
    )
  }
}

export default Thankyou;