import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import lang from '../../../../utils/language';

import styles_en from './statusWidget_en.styl';
import styles_ar from './statusWidget_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const StatusWidget = ({ currentStatus }) => {
  const len = Object.keys(currentStatus[0].state_time_estimates).length;
  const pivot = (100 / (len - 1));
  let barLen = 0;
  return (
    <div className={`${styles['status-widget']} ${styles['pt-5']} ${styles['relative']}`}>
      <Row className={styles['m-0']}>
        <div className={`${styles['gray-line']} ${styles['flx-space-bw']}`}>
          {
            currentStatus[0].state_time_estimates.map((i, k) => {
              const { actual_time } = i;
              if (!i.valid) return null;
              if (actual_time) {
                barLen = pivot * k;
              }
              return (
                <div className={`${styles['relative']}`}>
                  <span className={`${styles['point']} ${actual_time ? (i.status == 'CANCELLED' ? styles['cancelled'] : styles['active']) : ''} `} style={{ left: `${k == 0 ? '0' : (pivot * k)}%` }}></span>
                  <span className={`${styles['pt-10']} ${styles['pb-10']} ${styles['flex']} ${styles['fs-12']}`}>{i.status}</span>
                </div>
              );
            })
          }
        </div>
        <div style={{ width: `${barLen}%` }} className={`${styles['green-line']} ${styles['absolute']}`} />
      </Row>
    </div >
  );
};

export default StatusWidget;


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
