import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import Cookie from 'universal-cookie';
import SVGComponent from '../../common/SVGComponet';
import { languageDefinations } from '../../../utils/lang/';
import lang from '../../../utils/language';
import ActiveCoupons from './ActiveCoupons';
import ExpiredCoupons from './ExpiredCoupons';
import { actionCreators as couponActionCreators } from '../../../store/coupons';

import styles_en from './mycoupon_en.styl';
import styles_ar from './mycoupon_ar.styl';

const cookies = new Cookie();

const { COUPON_OFFERS } = languageDefinations();

const styles = lang === 'en' ? styles_en : styles_ar;

class MyCoupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.getCoupons(cookies.get('country'), 0, false);
  }
  
  handleSelect(key) {
    if (key === 1) {
      this.props.getCoupons(cookies.get('country'), 0, false);
    } else {
      this.props.getCoupons(cookies.get('country'), 0, true);
    }
  }
  render() {
    return (
      <div className={`${styles['coupon-container']} ${styles.box}`}>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className={`${styles.flex} ${styles['flex-center']} ${styles['p-20-40']}`}>
              <SVGComponent clsName={`${styles['coupon-image']}`} src="icons/common-icon/mycoupon" />
              <div className={`${styles['pl-15']}`}>
                <h1 className={`${styles.fontW600} ${styles['fs-20']} ${styles['m-0']}`}>{COUPON_OFFERS.COUPONS_AND_SAVINGS}</h1>
                <small className={`${styles['label-gry-clr']}`}>{COUPON_OFFERS.WE_BELIEVE_IN_THE_POWER}</small>
              </div>
            </div>
            <div className={`${styles['ml-55']}`}>
              <Tabs defaultActiveKey={1} onSelect={this.handleSelect}>
                <Tab eventKey={1} id="Active Coupons" title={COUPON_OFFERS.ACTIVE_COUPONS}>
                  <ActiveCoupons />
                </Tab>
                <Tab eventKey={2} id="Expired Coupons" title={COUPON_OFFERS.EXPIRED_COUPONS}>
                  <ExpiredCoupons />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCoupons: couponActionCreators.getCoupons,
  },
  dispatch,
);

MyCoupons.propTypes = {
  getCoupons: PropTypes.func,
};

MyCoupons.defaultProps = {
  getCoupons: f => f,
};


export default connect(mapStateToProps, mapDispatchToProps)(MyCoupons);
