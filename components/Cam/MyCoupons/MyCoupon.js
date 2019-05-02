import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import SVGComponent from '../../common/SVGComponet';
import lang from '../../../utils/language';
import ActiveCoupons from './ActiveCoupons';
import ExpiredCoupons from './ExpiredCoupons';

import styles_en from './mycoupon_en.styl';
import styles_ar from './mycoupon_ar.styl';


const styles = lang === 'en' ? styles_en : styles_ar;

class MyCoupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={`${styles['coupon-container']} ${styles.box}`}>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className={`${styles.flex} ${styles['flex-center']} ${styles['p-20-40']}`}>
              <SVGComponent clsName={`${styles['coupon-image']}`} src="icons/common-icon/coupon-code" />
              <div className={`${styles['pl-15']}`}>
                <h1 className={`${styles.fontW600} ${styles['fs-20']} ${styles['m-0']}`}>Coupons and Savings</h1>
                <small className={`${styles['label-gry-clr']}`}>We believe in the power of purchase intelligence</small>
              </div>
            </div>
            <div>
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="Active Coupons">
                  <ActiveCoupons />
                </Tab>
                <Tab eventKey={2} title="Expired Coupons">
                  ex
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

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(MyCoupons);
