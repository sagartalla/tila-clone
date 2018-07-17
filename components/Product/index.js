import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';

import { selectors } from '../../store/product';
import HeaderBar from '../HeaderBar/index';
import Dispalay from './includes/Display';
import TitleInfo from './includes/TitleInfo';
import Catalog from './includes/Catalog';
import Offers from './includes/Offers';
import Shipping from './includes/Shipping';
import ProductPrice from './includes/ProductPrice';
import AddToCart from './includes/AddToCart';
import RecentView from './includes/RecentView';
import Review from './includes/Reviews';
import ReviewsTab from './includes/ReviewTab';
import ElectronicsTab from './includes/ElectronicsTab';
import ProductDetails from './includes/ProductDetails';
import ReviewRatingList from '../RatingReviews/List';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const getProductComponent = (isPreview) => {
  const Product = ({ productData }) => {
    const { catalog, titleInfo, keyfeatures, imgUrls, offerInfo, shippingInfo, returnInfo, details } = productData;
    console.log('productData', productData);
    return (
      <div>
        {
          isPreview ? null : <HeaderBar />
        }
        <div className={`${styles['page-details-slider']}`}>
          <Row className={styles['m-0']}>
            <Col xs={12} md={8} className={styles['pl-0']}>
              <Dispalay imgs={imgUrls} />
            </Col>
              <div className={`${styles['details-right-part']}`}>
                <div className={`${styles['details-right-part-inn']}`}>
                  <TitleInfo {...titleInfo} />
                  <ProductDetails details={details} keyfeatures={keyfeatures} />
                  <ProductPrice offerInfo={offerInfo} />
                </div>
                <AddToCart offerInfo={offerInfo} />
              </div>
          </Row>
        </div>
        <div className={styles['bg-white']}>
          <Grid>
            <Row>
              <Col md={8}>
                <RecentView />
              </Col>
              <Col md={8}>
                <ReviewsTab />
              </Col>
              <Col md={8}>
                <ElectronicsTab/>
              </Col>
            </Row>
          </Grid>
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
