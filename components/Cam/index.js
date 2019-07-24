import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectors, actionCreators } from '../../store/cam/personalDetails';
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
import FooterBar from '../Footer';
import Preferences from './Preferences';
import Reviews from './Reviews';
import AuthWrapper from '../common/AuthWrapper';
import LoadingBar from '../common/Loader/skeletonLoader';
import LoaderBarContext from '../helpers/context/loaderBarContext';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './cam_en.styl';
import styles_ar from './cam_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class Cam extends React.Component {
  componentDidMount() {
    this.props.getUserProfileInfo();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userInfo.personalInfo.image_url === this.props.userInfo.personalInfo.image_url){
      return;
    }
    nextProps.userInfo.personalInfo.image_url && this.props.downloadPic(nextProps.userInfo.personalInfo.image_url);
  }

  render() {
    console.log('query', query);
    const { tabDetails, query } = this.props;
    const [tab] = tabDetails ? tabDetails.split('/') : [];
    const camComponent = ((tabName) => {
      switch (tabName) {
        case 'orders':
          return <Orders />;
        case 'address':
          return <ShippingAddress standalone />;
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
        case 'preferences':
          return <Preferences />;
        case 'reviews_ratings':
          return <Reviews />;
        default:
          return <UserInfo />;
      }
    })(tab);
    return (
      <LoaderBarContext.Consumer>
        {
          context => (
            <div>
              <div className={styles['bg-color']}>
                <HeaderBar />
                  <LoadingBar loadComponent={context.loadComponent}
                    pathname={context.pathname}>
                    <AuthWrapper>
                      <Grid>
                        <Row className={styles['pt-30']}>
                          <Col xs={12} md={3} sm={3} className={`${styles['pr-0']} ${styles['sidebar-position']} ${styles['cam-left-sidebar']}`}>
                            <Sidebar query={query} imgUrl={this.props.imgSource}/>
                          </Col>
                          <Col xs={12} md={9} sm={9}>
                            {camComponent}
                          </Col>
                        </Row>
                      </Grid>
                    </AuthWrapper>
                    <FooterBar />
                  </LoadingBar>
              </div>
            </div>
          )
        }
      </LoaderBarContext.Consumer>

    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserProfileInfo: actionCreators.getUserProfileInfo,
      downloadPic: actionCreators.downloadPic
    },
    dispatch,
  );

const mapStateToProps = store => ({
  userInfo: selectors.getUserInfo(store),
  imgSource: selectors.getImageSource(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cam);
