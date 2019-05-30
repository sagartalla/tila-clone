import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';
import moment from 'moment';

import { actionCreators, selectors } from '../../../../store/order';
import { languageDefinations } from '../../../../utils/lang';
import Slider from '../../../common/slider';

import constants from '../../../../constants';
import orderStatusAttributes from './orderAttributes';


import lang from '../../../../utils/language';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../../order_en.styl';
import styles_ar from '../../order_en.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { CART_PAGE, ORDERS, ORDER_PAGE } = languageDefinations();

class OrderTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: false,
    };
  }

  componentDidMount() {
    const { orderItem, getTrackingDetails } = this.props;
    getTrackingDetails(orderItem.trackingId);
  }

  openSlider = () => {
    this.setState({
      slider: true,
    });
  }

  closeSlider = () => {
    this.setState({
      slider: false,
    });
  }

  render() {
    const { orderItem, showMsgAndDate, orderTracker } = this.props;
    return (
      <div className={`${styles['p-10']} ${styles['bg-light-gray']} ${styles['flex-center']} ${styles.relative} ${styles.pointer}`}>
        <div>{ORDER_PAGE.YOUR_ITEM_IS_OUT_FOR_DELIVERY}</div>
        <a className={`${styles.fontW600} ${styles['ml-10']} ${styles['view-more-label']} ${styles['fs-12']}`} onClick={this.openSlider}>{CART_PAGE.VIEW_MORE}</a>
        {this.state.slider &&
        <Slider label="Order Tracking" isOpen={this.state.slider} closeSlider={this.closeSlider}>
          <div className={`${styles['ht-80per']} ${styles.width100}`}>
            <div className={`${styles.flex} ${styles['flex-colum']} ${styles['bg-light-gray']}`}>
              <div className={`${styles['p-5']} ${styles['pl-35']} ${styles['border-b']}`}>{ORDERS.ORDER} {orderItem.id}</div>
              <div className={`${styles.flex} ${styles['p-10']}`}>
                <Col md={3}>
                  <a className={`${styles.width100} ${styles['track-img-wrap']} ${styles['inline-block']}`}>
                    <img className={`${styles['object-scale-down']} ${styles['track-img']}`} src={`${constants.mediaDomain}/${orderItem.img}`} alt={orderItem.img} />
                  </a>
                </Col>
                <Col md={9}>
                  <div className={`${styles.fontW600}`}>{orderItem.name}</div>
                  <div className={`${styles.flex} ${styles['pt-15']} ${styles['pb-15']} ${styles['ipad-tp-5']} ${styles['ipad-tb-5']} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>
                    {orderItem.variantAttributes.length > 0 &&
                      orderItem.variantAttributes.map(attr => (
                        <span className={styles['pr-20']}>
                          <span>{attr.display_string} : </span>
                          <span>{attr.attribute_values[0].value}</span>
                        </span>
                      ))}
                    <span>
                      <span>{CART_PAGE.QUANTITY} : </span>
                      <span>{orderItem.orderIds.length}</span>
                    </span>
                  </div>
                  <p className={`${styles.fontW600} ${styles['fs-16']}`}>{orderItem.price.final_price.display_value} {orderItem.currency_code}</p>
                </Col>
              </div>
            </div>
            <div className={`${styles['border-b']} ${styles['p-20']} ${styles['pl-40']}`}>
              {showMsgAndDate}
            </div>

            <ul className={`${styles['state-times']}`}>
              {orderItem.state_time_estimates.length > 0 &&
                orderItem.state_time_estimates.map(estimate => (
                  <li>
                    <p className={`${estimate.actual_time ? styles.activeP : ''}`}>
                      {estimate.actual_time ? moment(estimate.actual_time).format('D MMM') : ''}
                      <div className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>
                        {estimate.actual_time ? moment(estimate.actual_time).format('hh:mm A') : ''}
                      </div>
                    </p>
                    <span className={`${styles.status} ${estimate.actual_time ? styles['border-lt-green'] : styles['border-lt']}`}>
                      <strong>{orderStatusAttributes[estimate.status]}</strong>
                      {(estimate.status === 'SHIPPED' || estimate.status === 'SCHEDULED') &&
                        orderTracker[orderItem.trackingId] && orderTracker[orderItem.trackingId].events.length > 0 &&
                        <ul className={`${styles.events} ${styles['label-gry-clr']} ${styles['pl-10']} ${styles['fs-10']}`}>
                          {orderTracker[orderItem.trackingId].events.map(event => (
                            <li className={`${styles['flex-center']} ${styles['mt-5']}`}>
                              <span className={styles.dot} />
                              <span className={styles['ml-5']}>{moment(event.date).format('hh:mm A')}</span>
                              <span className={styles['ml-5']}>{event.event_message}</span>
                            </li>
                          ))}
                        </ul>
                      }
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </Slider>}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  orderTracker: selectors.getOrderTracker(store),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTrackingDetails: actionCreators.getTrackingDetails,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderTracker);
