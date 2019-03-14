import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Cookies from 'universal-cookie';

import { Link } from '../../../routes';
import { Grid, Row, Col } from 'react-bootstrap';
import constants from '../../../constants';
// import userAgent from '../../../utils/user-agent';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const cookies = new Cookies();
const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
// const maxImages = userAgent.isiPad ? 3 : 4;

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  getUrl = (crum) => {
    return `/${country}/${language}/srp/${crum.display_name_en.toLowerCase().split(' ').join('-')}?search=${crum.display_name_en}&isListed=false&sid=${crum.id}`;
  }

  render() {
    const { imgs, extraOffers, breadcrums } = this.props;
    return (
      <div className={`${styles['ht-100per']}`}>
        {breadcrums.length > 0 &&
          <div className={styles['p-10']}>
            {breadcrums.map((crum, index) => (
              <span>
                <Link route={this.getUrl(crum)}>{crum.display_name_en}</Link>
                {breadcrums.length - 1 !== index &&
                  <span>&nbsp;&nbsp;{'/'}&nbsp;&nbsp;</span>}
              </span>
            ))}
          </div>
        }
        <div className={`${styles['display-item-wrap']}`}>
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            lazyLoad={true}
            className={styles['ht-100per']}
          >
            {imgs.map(({url}) => {
              return (
                <div className={styles['selected-item-wrap']} key={url}>
                  <img src={`${constants.mediaDomain}/${url}`} />
                </div>
              )
            })}
          </Slider>
        </div>
        <div className={`${styles['bottom-slider']} ${styles['flex']} ${styles['border-t']}`}>
          <Col md={4} sm={4}>
            <Slider
              asNavFor={this.state.nav1}
              ref={slider => (this.slider2 = slider)}
              slidesToShow={imgs.length > 4 ? 4 : imgs.length}
              swipeToSlide={true}
              focusOnSelect={true}
              lazyLoad={true}
              className={styles['sub-slider']}
            >
              {
                imgs.map(({url}, index) => {
                  return (
                    <div className={styles['carousel-item-wrap']} key={url}>
                      <img src={`${constants.mediaDomain}/${url}`} />
                    </div>
                  );
                })
              }
            </Slider>
          </Col>
          {
            extraOffers && extraOffers.length
              ?
              <Fragment>
              {
                extraOffers[0]
                ?
                  <Col md={4} sm={4}>
                    <div className={`${styles['thick-gry-clr']} ${styles['copon-code']} ${styles['pl-15']}`}>
                      <h5 className={`${styles['mb-5']} ${styles['fontW600']}`}>{extraOffers[0]}</h5>
                      {/*<span className={styles['fs-12']}>Buy fashion for AED 1000/- and get 10% Extra Discount</span>*/}
                    </div>
                  </Col>
                :
                  null
                }
              {
                extraOffers[1]
                ?
                <Col md={4} sm={4}>
                  <div className={`${styles['thick-gry-clr']} ${styles['copon-code']} ${styles['pl-15']}`}>
                    <h5 className={`${styles['mb-5']} ${styles['fontW600']}`}>{extraOffers[1]}</h5>
                    {/*<span className={styles['fs-12']}>Buy fashion for AED 1000/- and get 10% Extra Discount</span>*/}
                  </div>
                </Col>
                :
                  null
                }
              </Fragment>
              :
               null
          }

        </div>
      </div>
    );
  }
}

Display.propTypes = {
  imgs: PropTypes.array.isRequired
}

export default Display;
