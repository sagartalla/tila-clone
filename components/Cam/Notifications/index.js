import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/notifications';
import { languageDefinations } from '../../../utils/lang/';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './notifications_en.styl';
import styles_ar from './notifications_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};


const { MESSAGES } = languageDefinations();


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
      <div className={`${styles['notifications-container']} ${styles['ml-5']}`}>
        <h4 className={`${styles['mt-0']} ${styles['fontW600']} ${styles['mb-30']}`}>{MESSAGES.ALL_NOTIFICATIONS}</h4>
        <div className={`${styles['notification-inn']}`}>
          <span className={`${styles['white-color']} ${styles['notification-data']} ${styles['mb-15']}`}>{MESSAGES.TODAY}</span>

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
              );
            })
          }
        </div>
      </div>
    );
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
