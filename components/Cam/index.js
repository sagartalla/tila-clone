import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../store/cam/personalDetails';

import HeaderBar from '../HeaderBar/index';
import Sidebar from './Sidebar';
import UserInfo from './PersonelDetails';
import ShippingAddress from './ShippingAddress';
import Orders from './Orders'

import styles from './cam.styl';

class Cam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "profile",
      userInfo:{}
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userInfo){
   this.setState({
    userInfo: nextProps.userInfo
   })
  }
}

shouldComponentUpdate(nextProps, nextState) {
  if (
    JSON.stringify(nextProps.userInfo) !== JSON.stringify(this.props.userInfo) ||
    JSON.stringify(nextProps.userInfo) !== JSON.stringify(this.state.userInfo) ||
    JSON.stringify(nextProps.userInfo) !== JSON.stringify(nextState.userInfo) 
  ) {
    return true;
  }
  return false;
}

  componentDidMount() {
    const { tabDetails } = this.props;
    let [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
    if ((tab != 'orders' && tab != "address") || tab == "profile") {
      tab = "profile";
      this.setState({ tab });
      this.props.getUserProfileInfo();
    }
  }

  render() {
    const { tab , userInfo} = this.state;
    const camComponent = ((tabName) => {
      switch (tabName) {
        case 'orders':
          return <Orders />;
        case 'address':
          return <ShippingAddress />;
        case 'profile':
      return (<UserInfo {...userInfo}/>);
       default:
      return (<UserInfo {...userInfo}/>);
      }
    })(tab);
    return (
      <div className={`${styles["bg-color"]} ${styles["cam-container"]}`}>
        <HeaderBar />
        <Grid>
          <Row>
            <Col xs={12} md={3}>
              <Row>
                <Sidebar />
              </Row>
            </Col>
            <Col xs={12} md={9}>
              <Row>
                {camComponent}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserProfileInfo: actionCreators.getUserProfileInfo
    },
    dispatch,
  );

Cam.propTypes = {
  userInfo: PropTypes.object,
  tabDetails: PropTypes.string,
  getUserProfileInfo: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Cam);
