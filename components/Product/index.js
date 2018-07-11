import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';

import selectors from '../../store/product/selectors'
import HeaderBar from '../HeaderBar/index';
import Dispalay from './includes/Display';
import TitleInfo from './includes/TitleInfo';
import KeyFeatures from './includes/KeyFeatures';
import Variants from './includes/Variants';
import Catalog from './includes/Catalog';
import Offers from './includes/Offers';
import Shipping from './includes/Shipping';
import ReviewRatingList from '../RatingReviews/List';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const getProductComponent = (isPreview) => {
  const Product = ({ productData }) => {
    const { catalog, titleInfo, keyfeatures, imgUrls, offerInfo, shippingInfo, returnInfo } = productData;
    return (
      <div>
        {
          isPreview ? null : <HeaderBar />
        }
        <Grid className={`${styles['pb-30']} ${styles['pt-30']}`}>
          <Row>
            <Col xs={12} md={6}>
              <Dispalay imgs={imgUrls} />
            </Col>
            <Col xs={12} md={6}>
              <TitleInfo {...titleInfo} />
              <KeyFeatures features={keyfeatures} />
              <NoSSR>
                <Variants />
              </NoSSR>
              {
                isPreview ? null : <Shipping {...shippingInfo} {...returnInfo}/>
              }
              {
                isPreview ? null : <Offers offerInfo={offerInfo}/>
              }
            </Col>
          </Row>
        </Grid>
        <div className={`${styles['border-b']} ${styles['border-t']} ${styles['pb-30']} ${styles['pt-30']}`}>
          <Grid>
            <Row>
              <Col xs={12}>
                <Catalog catalog={catalog} />
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid>
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
              <div>
                <ReviewRatingList />
              </div>
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
