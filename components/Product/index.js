import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';

import selectors from '../../store/product/selectors'
import HeaderBar from '../HeaderBar/index';
import Dispalay from './Display';
import TitleInfo from './TitleInfo';
import KeyFeatures from './KeyFeatures';
import Variants from './Variants';
import Catalog from './Catalog';

import styles from './product.styl';

const getProductComponent = (isPreview) => {
  const Product = ({ productData, isPreview }) => {
    const { catalog, titleInfo, keyfeatures, imgUrls } = productData;
    return (
      <div>
        <HeaderBar />
        <Grid>
          <Row>
            <Col xs={12} md={5}>
              <Dispalay imgs={imgUrls} />
            </Col>
            <Col xs={12} md={7}>
              <TitleInfo {...titleInfo} />
              <KeyFeatures features={keyfeatures} />
              {/* <NoSSR>
                <Variants />
              </NoSSR> */}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Catalog catalog={catalog} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div><b>Compare</b></div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div><b>Accessories</b></div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div><b>Frequently Bought Together</b></div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div><b>Rating and Reviews</b></div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  };

  const mapStateToProps = (store) => ({
    productData: isPreview ? selectors.getPreview(store) : selectors.getProduct(store)
  });

  Product.propTypes = {
    productData: PropTypes.object.isRequired
  };

  return connect(mapStateToProps, null)(Product);
}

export default getProductComponent;
