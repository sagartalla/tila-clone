import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/messages';

import { languageDefinations } from '../../../utils/lang/';

import lang from '../../../utils/language';

import styles_en from './message_en.styl';
import styles_ar from './message_ar.styl';


const styles = lang === 'en' ? styles_en : styles_ar;

const { MESSAGES } = languageDefinations();

class Messages extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    this.props.getMessages();
  }

  render() {
    const { results } = this.props;
    return (
      <div className={`${styles['ml-5']}`}>
        <h3 className={styles['mt-0']}>{MESSAGES.MESSAGES}</h3>
        <h6>{MESSAGES.TODAY}</h6>

        {
          results.length > 0 && results.map((res, index) => {
            const { } = res;
            return (
              <div key={index} className={`${styles['box']} ${styles['p-20']} ${styles['mb-20']}`}>
                <Row>
                  <Col md={1}>{res.time}</Col>
                  <Col md={11}>
                    <h4 className={styles['mt-0']}>{res.title}</h4>
                    {res.content}
                  </Col>
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
  results: selectors.getMessages(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getMessages: actionCreators.getMessages
  }, dispatch);


Messages.propTypes = {

};

Messages.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
