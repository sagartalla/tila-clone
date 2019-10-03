import React, { Component } from 'react';
import lang from '../utils/language';
import { Router } from '../routes';
import main_en from '../layout/main/main_en.styl';
import main_ar from '../layout/main/main_ar.styl';
import styles_en from '../components/Product/product_en.styl';
import styles_ar from '../components/Product/product_ar.styl';
import { route } from 'next-server/dist/server/router';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };



class mobilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  mobileApp = () => {
    window.location.href = "https://apps.apple.com/uy/app/tila-online-shopping-app/id1477171024";
  }

  googlePlay = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.fptechscience.tila&hl=en_US';
  }

  render() {
    return (
      <div className={`${styles['backgroundImgMobilePage']} ${styles['displayItems']} ${styles['height']} "col-lg-4 col-md-4 col-sm-8"`}>
        <div className={`${styles['normalwidth']} ${styles['margin']}`}>
          <span>
            <img
            className={`${styles['imagewidth']} col-lg-12 col-md-8 col-sm-4`}
            src="/static/img/bg-img/TilaLogo.png" />
          </span>
        </div>
        <div className={`${styles['normalwidth']}`}>
          <span>
            <img
            className={`${styles['imagewidth']} ${styles['margin']} col-lg-12 col-md-8 col-sm-4`}
            src="/static/img/bg-img/For-amazing.png" />
          </span>
        </div>
        <div className={`${styles['normalwidth']}`}>
          <span>
            <img
            className={`${styles['imagewidth']} ${styles['margin']} col-lg-12 col-md-8 col-sm-4`}
            onClick={this.mobileApp}
            src="/static/img/bg-img/app-strore.jpg" />
          </span>
        </div>
        <div className={`${styles['normalwidth']}`}>
          <span>
            <img
            className={`${styles['imagewidth']} ${styles['margin']} col-lg-12 col-md-8 col-sm-4`}
            onClick={this.googlePlay}
            src="/static/img/bg-img/google.jpg" />
          </span>
        </div>
      </div>
    )
  }
}

mobilePage.propTypes = {

};

mobilePage.defaultProps = {

};

export default mobilePage;

