import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';
import moment from 'moment-timezone';

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
    getTrackingDetails(orderItem.return_tracking ? orderItem.return_tracking : orderItem.trackingId);
  }

  openSlider = () => {
    document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    this.setState({
      slider: true,
    });
  }

  closeSlider = () => {
    document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
    this.setState({
      slider: false,
    });
  }

  render() {
    const { orderItem, showMsgAndDate, orderTracker } = this.props;

    const status = () => {
      switch (orderItem.status) {
        case 'DELIVERED': return ORDER_PAGE.YOUR_ITEM_IS_DELIVERED;
        case 'RETURN_REQUESTED': return ORDER_PAGE.YOUR_ITEM_RETURN_REQUESTED;
        case 'RETURNED':
        case 'PICKED': return ORDER_PAGE.YOUR_ITEM_PICKED;
        case 'RETURN_QC_APPROVED': return ORDER_PAGE.YOUR_ITEM_RETURN_QC_APPROVED;
        case 'RETURN_QC_REJECTED': return ORDER_PAGE.YOUR_ITEM_RETURN_QC_REJECTED;
        case 'RETURN_IN_PROGRESS': return ORDER_PAGE.YOUR_ITEM_RETURN_IN_PROGRESS;
        case 'EXCHANGE_IN_PROGRESS': return ORDER_PAGE.YOUR_ITEM_EXCHANGE_IN_PROGRESS;
        case 'REPLACEMENT_IN_PROGRESS': return ORDER_PAGE.YOUR_ITEM_REPLACEMENT_IN_PROGRESS;
        case 'EXCHANGED': return ORDER_PAGE.YOUR_ITEM_EXCHANGED;
        case 'REPLACED': return ORDER_PAGE.YOUR_ITEM_REPLACED;
        default: return ORDER_PAGE.YOUR_ITEM_IS_OUT_FOR_DELIVERY;
      }
    };

    return (
      <div className={`${styles['p-10']} ${styles['bg-light-gray']} ${styles['flex-center']} ${styles.relative} ${styles.pointer}`}>
        <div>{status()}</div>
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
                  <p className={`${styles.fontW600} ${styles['fs-16']}`}>{orderItem.currency_code} {orderItem.price.final_price.display_value}</p>
                </Col>
              </div>
              <div className={`${styles['p-5']} ${styles['pl-35']} ${styles['border-t']}`}>{ORDERS.TRACKING_ID}: {orderItem.return_tracking ? orderItem.return_tracking : orderItem.trackingId}</div>
            </div>
            <div className={`${styles['border-b']} ${styles['p-20']} ${styles['pl-40']}`}>
              {showMsgAndDate}
            </div>
            <ul className={`${styles['state-times']}`}>
              {orderItem.state_time_estimates.length > 0 &&
                orderItem.state_time_estimates.filter(i => i.valid).map((estimate, index) => {
                  return (
                    <li>
                      <p className={`${estimate.actual_time ? styles.activeP : ''}`}>
                        {estimate.actual_time ? moment(estimate.actual_time).format('D MMM') : ''}
                        <div className={`${styles['fs-12']} ${styles['label-gry-clr']}`}>
                          {estimate.actual_time ? moment(estimate.actual_time).format('hh:mm A') : ''}
                        </div>
                      </p>
                      <span className={`${styles.status} ${orderItem.state_time_estimates.filter(i => i.valid).length - 1 !== index ? estimate.actual_time ? styles['border-lt-green'] : styles['border-lt'] : ''}`}>
                        <strong>{orderStatusAttributes[estimate.status]}</strong>
                        {(estimate.status === 'SHIPPED' || estimate.status === 'SCHEDULED') &&
                          orderTracker[orderItem.trackingId] && orderTracker[orderItem.trackingId].events.length > 0 &&
                          <ul className={`${styles.events} ${styles['label-gry-clr']} ${styles['pl-10']} ${styles['fs-10']}`}>
                            {orderTracker[orderItem.trackingId].events.map(event => (
                              <li className={`${styles['flex-center']} ${styles['mt-5']}`}>
                                <span className={styles.dot} />
                                <span className={`${styles.width18} ${styles['ml-5']}`}>{moment(event.date).format('hh:mm A')}</span>
                                <span className={styles['ml-5']}>{event.event_message}</span>
                              </li>
                            ))}
                          </ul>
                        }
                      </span>
                    </li>
                  );
                })}
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
