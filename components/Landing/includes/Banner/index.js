import React, { Component } from 'react';

class Banner extends Component {
  render() {
    const { img } = this.props;
    return (
      <div className={styles['main-banner']}>
        <img src={img} className={styles['img-responsive']} />
      </div>
    )
  }
}
