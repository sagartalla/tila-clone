import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';

import { actionCreators } from '../../../../store/order';
import { languageDefinations } from '../../../../utils/lang';
import Slider from '../../../common/slider';
import { mergeCss } from '../../../../utils/cssUtil';
import constants from '../../../../constants';

const styles = mergeCss('components/Order/order');

const { CART_PAGE } = languageDefinations();

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
    const { orderItem, showMsgAndDate } = this.props;
    return (
      <div className={`${styles['p-10']} ${styles['bg-light-gray']} ${styles['flex-center']} ${styles.relative} ${styles.pointer}`}>
        <div>Your Item is out for delivery</div>
        <a className={`${styles.fontW600} ${styles['ml-10']} ${styles['view-more-label']} ${styles['fs-12']}`} onClick={this.openSlider}>View More</a>
        {this.state.slider &&
        <Slider label="Order Tracking" isOpen={this.state.slider} closeSlider={this.closeSlider}>
          <div className={`${styles['ht-80per']} ${styles.width100}`}>
            <div className={`${styles.flex} ${styles['flex-colum']} ${styles['bg-light-gray']}`}>
              <div className={`${styles['p-5']} ${styles['pl-35']} ${styles['border-b']}`}>ORDER # {orderItem.id}</div>
              <div className={`${styles.flex} ${styles['p-10']}`}>
                <Col md={3}>
                  <a className={`${styles.width100} ${styles['track-img-wrap']} ${styles['inline-block']}`}>
                    <img className={`${styles['object-scale-down']} ${styles['track-img']}`} src={`${constants.mediaDomain}/${orderItem.img}`} alt={orderItem.img} />
                  </a>
                </Col>
                <Col md={9}>
                  <div className={`${styles.fontW600}`}>{orderItem.name}</div>
                  <div className={`${styles.flex} ${styles['pt-15']} ${styles['pb-15']} ${styles['ipad-tp-5']} ${styles['ipad-tb-5']} ${styles['fs-12']} ${styles['thick-gry-clr']}`}>
                    {orderItem.sizeInfo &&
                    <span className={styles['pr-20']}>
                      <span>{orderItem.sizeInfo.display_string} : </span>
                      <span>{orderItem.sizeInfo.attribute_values[0].value}</span>
                    </span>}
                    <span>
                      <span>{CART_PAGE.QUANTITY} : </span>
                      <span>{orderItem.orderIds.length}</span>
                    </span>
                  </div>
                  <p className={`${styles.fontW600} ${styles['fs-16']}`}>{orderItem.price.final_price} {orderItem.currency_code}</p>
                </Col>
              </div>
            </div>
            <div className={`${styles['border-b']} ${styles['p-20']} ${styles['pl-40']}`}>
              {showMsgAndDate}
            </div>
          </div>
        </Slider>}
      </div>);
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getTrackingDetails: actionCreators.getTrackingDetails,
}, dispatch);

export default connect(null, mapDispatchToProps)(OrderTracker);
