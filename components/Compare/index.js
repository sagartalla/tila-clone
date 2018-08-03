import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import constants from '../../constants'
import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';
import { actionCreators, selectors } from '../../store/compare';
import { languageDefinations } from '../../utils/lang';
import { mergeCss } from '../../utils/cssUtil';

const styles = mergeCss('');
const { COMPARE } = languageDefinations();

const ICONS = {
  screenSize: '/icons/common-icon/display-screen',
  camera: 'icons/common-icon/camera-icon',
  processor: 'icons/common-icon/processor-icon',
  batteryPower: 'icons/common-icon/battery',
}

class Compare extends Component {

  componentDidMount() {
    //read from local store productIds
    this.props.getCompareItemsData();
  }

  render() {
    const { compareInfo={} } = this.props;
    const { compareCount=0, features=[], products=[], productsFeatures=[] } = compareInfo;
    return (
      <div>
        <HeaderBar />
        <div className={`${styles['compare-main']} ${styles['pt-25']} ${styles['pb-25']}`}>
          <h4 className={`${styles['fs-16']} ${styles['fontW600']}`}>{COMPARE.TILA_COMPARE_1}{compareCount} {COMPARE.TILA_COMPARE_2}</h4>
          <Row className={styles['feature-part']}>
            <Col md={3}>
              <div className={styles['compare-product']}>
                <div className={styles['compare-product-inn']}>
                  <h5 className={`${styles['flx-space-bw']}`}>
                    <span className={styles['fontW600']}>{COMPARE.FEATUERS}</span>
                    <span className={styles['lgt-blue']}>{COMPARE.CLEAR_ALL}</span>
                  </h5>
                  {
                    features.map((feature) => (
                      <div key={feature.key} className={styles['checkbox-material']}>
                        <input id="camera" type="checkbox" />
                        <label htmlFor="camera"> {feature.value} </label>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Col>
            {
              products.map((product) => (
                <Col md={3} key={product.id}>
                  <div className={styles['compare-dtls']}>
                    <div className={`${styles['compare-dtls-img']} ${styles['flex']} ${styles['justify-center']}`}>
                      <img src={`${constants.mediaDomain}/${product.imgSrc}`} className="img-responsive" />
                    </div>
                    <div className={`${styles['compare-dtls-inn']} ${styles['pt-20']} ${styles['t-c']}`}>
                      <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>{product.brand}</span>
                      <div>
                        <span className={styles['fontW600']}>{product.price} {product.currency}</span>
                        <span className={`${styles['fs-12']} ${styles['google-clr']}`}>{product.offer}</span>
                      </div>
                      <span className={`${styles['fs-10']} ${styles['thick-gry-clr']}`}>{product.name}</span>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
          <div className={styles['compare-main-items']}>
            {
              productsFeatures.map((productFeature) => {
                return (
                  <div key={productFeature.name}>
                    <Row>
                      <Col md={12}>
                        <span>{productFeature.name}</span>
                      </Col>
                    </Row>
                    {
                      productFeature.attributes.map((attr) => (
                        <Row className={`${styles['compare-product-spficication']} ${styles['flex-center']} ${styles['m-0']}`}>
                          <Col md={3}>
                            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['dispy-screen']}`}>
                              {/*<SVGCompoent clsName={`${styles['screen-icon']}`} src={ICONS[item.id]} />*/}
                              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>{attr.name}</span>
                            </div>
                          </Col>
                          {
                            attr.items.map((item) => {
                              return (
                                <Col key={item.id} md={3}>
                                  <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
                                    <span>{item.value.map((i) => i.value).join(' ')}</span>
                                  </div>
                                </Col>
                              )
                            })
                          }
                        </Row>
                      ))
                    }
                </div>
                );
              })
            }
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  compareInfo: selectors.getCompareInfo(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCompareItemsData: actionCreators.getCompareItemsData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Compare);

/*
{
  compareCount: number,
  features: [
    {
      key: string,
      value: string
    }
    ...
  ],
  products: [
    {
      id: shortID,
      imgSrc: string,
      brand: string,
      price: string,
      currency: string,
      offer: string,
      name: string,
    }
  ],
  productsFeatures: [
    {
      name: string(cat-name),
      attributes: [{
        name: string(attr-name)
        items: [
          {
            value:  string(att-val)
          }
        ]
      }]
    }
  ]
}
*/
