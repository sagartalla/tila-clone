import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import PaymentStatus from './includes/PaymentStatus';
import Summary from './includes/Summary';

import styles from './thankyou.styl';

class Thankyou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderState: "",
      orderDetails: "",
      orderId: ""
    };
  }

  componentDidMount() {
    debugger;
    const urlParams = this.props.tabDetails.split('/');

  }

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

// const Thankyou = ({tabDetails}) => {
//   debugger;
//   const x = tabDetails.split('/');
//   return (
//           <div className={styles['thankyou']}>
//             <Grid>
//               <PaymentStatus />
//               <Summary />
//             </Grid>
//           </div>
//         )
// };

export default Thankyou;