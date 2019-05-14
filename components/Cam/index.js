import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectors, actionCreators } from '../../store/cam/personalDetails';
import { bindActionCreators } from 'redux';

import HeaderBar from '../HeaderBar/index';
import Sidebar from './Sidebar';
import UserInfo from './PersonelDetails';
import ShippingAddress from './ShippingAddress';
import Orders from './Orders';
import Wishlist from './Wishlist';
import Notifications from './Notifications';
import UserVault from './UserVault';
import Messages from './Messages';
import MyCoupons from './MyCoupons/MyCoupon';
import FooterBar from '../Footer/index';
import AuthWrapper from '../common/AuthWrapper';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './cam_en.styl';
import styles_ar from './cam_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class Cam extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.getUserProfileInfo();
  }

  render() {
    const {tabDetails, query} = this.props;
    const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
    const camComponent = ((tabName) => {
      switch (tabName) {
        case 'orders':
          return <Orders />;
        case 'address':
          return <ShippingAddress standalone={true} />;
        case 'wishlist':
          return <Wishlist />;
        case 'mycoupons':
          return <MyCoupons />;
        case 'profile':
          return <UserInfo />;
        case 'messages':
          return <Messages />;
        case 'notifications':
          return <Notifications />;
        case 'uservault':
          return <UserVault />;
        default:
          return <UserInfo />;
      }
    })(tab)
    return (
      <div>
        <div className={styles['bg-color']}>
          <HeaderBar />
          <AuthWrapper>
            <Grid>
              <Row className={styles['pt-30']}>
                <Col xs={12} md={3} sm={3} className={`${styles['pr-0']} ${styles['sidebar-position']}`}>
                  <Sidebar query={query} />
                </Col>
                <Col xs={12} md={9} sm={9}>
                  {camComponent}
                </Col>
              </Row>
            </Grid>
          </AuthWrapper>
          <FooterBar />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserProfileInfo: actionCreators.getUserProfileInfo
    },
    dispatch,
  );

const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cam);
