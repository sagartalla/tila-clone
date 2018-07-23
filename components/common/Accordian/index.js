import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import styles from './accordian.styl';

class Accordian extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: true
    };
    this.show = this.show.bind(this);
  }

  show() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const {head, body} = this.props;
    return (
      <div className={styles['acc']}>
        <div className={styles['acc-head']} onClick={this.show}>
          {head}
        </div>
        <div className={`${styles['acc-body']} ${styles[this.state.show ? 'show' : 'hide']}`}>
          {body}
        </div>
      </div>
    )
  }
}

Accordian.propTypes = {
  head: PropTypes.element.isRequired,
  body: PropTypes.element.isRequired,
}

export default Accordian;
