import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/StatusWidget/statusWidget');

const StatusWidget = ({ currentStatus }) => {

  const len = Object.keys(currentStatus[0].state_times).length;
  const pivot = (100 / (len - 1));
  let barLen = 0;

  return (
    <div className={`${styles['status-widget']} ${styles['pt-5']} ${styles['relative']}`}>
      <Row className={styles['m-0']}>
        <div className={`${styles['gray-line']}`}>
          {
            Object.keys(currentStatus[0].state_times).map((i, k, index) => {
              const { completed } = currentStatus[0].state_times[i];
              if (completed) {
                barLen = pivot * k;
              }
              return (
                <div className={`${styles['point']} ${completed ? styles['active'] : ''} `} style={{ left: `${k == 0 ? '0' : (pivot * k)}%` }}>
                  <span>{i}</span>
                </div>
              )
            })
          }
        </div>
        <div style={{ width: `${barLen}%` }} className={`${styles['green-line']} ${styles['relative']}`}></div>
      </Row>
    </div >
  )


  // return (
  //   <div className={`${styles['widget-cont']} ${styles['pt-5']}`}>
  //     <Row className={styles['m-0']}>
  //       {statuses.map((status, index) => (
  //         <Col key={status} md={3} className={`${styles['item-cont']} ${(currentStausIndex >= index) ? (currentStausIndex === index) ? styles['current'] : styles['done'] : ''}`}>
  //           <div className={`${styles['pt-10']} ${styles['item']}`}>
  //             <span>{status}</span>
  //           </div>
  //         </Col>
  //       ))}
  //     </Row>
  //   </div>
  // );
}

export default StatusWidget;