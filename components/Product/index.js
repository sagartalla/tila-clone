import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
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
import ProductPrice from './includes/ProductPrice';
import AddToCart from './includes/BuyNow';
import ProductDetails from './includes/ProductDetails';
import ReviewRatingList from '../RatingReviews/List';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const getProductComponent = (isPreview) => {
  const Product = ({ productData }) => {
    const { catalog, titleInfo, keyfeatures, imgUrls, offerInfo, details, pricedetails } = productData;
    return (
      <div>
        {
          isPreview ? null : <HeaderBar />
        }
        <div className={`${styles['pb-30']} ${styles['page-details-slider']}`}>
          <Row className={styles['m-0']}>
            <Col xs={12} md={8} className={styles['pl-0']}>
              <Dispalay imgs={imgUrls} />
            </Col>
            {/* <Col xs={12} md={4}> */}
              <div className={`${styles['details-right-part']}`}>
                <div className={`${styles['details-right-part-inn']}`}>
                  <TitleInfo {...titleInfo} />
                  <ProductDetails produdetils= {details} />
                  <KeyFeatures features={keyfeatures} />
                  <ProductPrice price= {pricedetails} />
                  {/* <NoSSR>
                    <Variants />
                  </NoSSR> */}
                  {/* {
                    isPreview ? null : <Offers offerInfo={offerInfo}/>
                  } */}

                </div>
                <AddToCart />
              </div>
            {/* </Col> */}
          </Row>
        </div>
        <div className={`${styles['border-b']} ${styles['border-t']} ${styles['pb-30']} ${styles['pt-30']}`}>
          <Grid>
            <Row>
              <Col xs={12}>
                <Catalog catalog={catalog} />
              </Col>
            </Row>
          </Grid>
        </div>
        {/* <Grid>
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
        </Grid> */}
        {/* <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Tab 1">
           Tab 1 content
          </Tab>
          <Tab eventKey={2} title="Tab 2">
            Tab 2 content
          </Tab>
        </Tabs> */}
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
