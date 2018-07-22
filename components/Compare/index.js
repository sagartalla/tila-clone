import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { languageDefinations } from '../../utils/lang';
const { COMPARE } = languageDefinations();
''
const ICONS = {
  screenSize: '/icons/common-icon/display-screen',
  camera: 'icons/common-icon/camera-icon',
  processor: 'icons/common-icon/processor-icon',
  batteryPower: 'icons/common-icon/battery',
}

const Compare = ({compareCount}) => {
  return (
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
          products.map((product) => {
            <Col md={3} key={product.id}>
              <div className={styles['compare-dtls']}>
                <div className={`${styles['compare-dtls-img']} ${styles['flex']} ${styles['justify-center']}`}>
                  <img src={product.imgSrc} className="img-responsive" />
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
          })
        }
      </Row>
      <div className={styles['compare-main-items']}>
        {
          productsFeatures.map((productFeature) => {
            return (
              <Row className={`${styles['compare-product-spficication']} ${styles['flex-center']} ${styles['m-0']}`}>
                <Col md={3}>
                  <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['dispy-screen']}`}>
                    <SVGCompoent clsName={`${styles['screen-icon']}`} src={ICONS[item.id]} />
                    <span className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>{productFeature.name}</span>
                  </div>
                </Col>
                {
                  productFeature.items.map((item) => {
                    return (
                      <Col key={item.id} md={3}>
                        <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles['fontW600']}`}>
                          <span>{item.value}</span>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
            );
          })
        }
      </div>
    </div>
  );
}


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
      id: shortID,
      name: string,
      items: [
        {
          id: shortID,
          value: string
        },
        ...
      ]
    }
  ]
}
*/
