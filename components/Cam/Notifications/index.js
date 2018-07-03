import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { languageDefinations } from '../../../utils/lang/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/notifications';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Notifications/notifications');

class Notifications extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getNotifications();
  }

  render() {
    const { results } = this.props;

    return (
      <div className={`${styles['notifications-container']} ${styles['ml-20']}`}>
        <h3>All Notifications</h3>
        <h6>Today</h6>

        {
          results.length > 0 && results.map((res, index) => {
            const { } = res;
            return (
              <div key={index} className={`${styles['box']} ${styles['p-20']} ${styles['mb-20']}`}>
                <Row>
                  <Col md={1}>{res.time}</Col>
                  <Col md={11}>{res.content}</Col>
                </Row>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getNotifications(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getNotifications: actionCreators.getNotifications
  }, dispatch);

Notifications.propTypes = {

};

Notifications.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
