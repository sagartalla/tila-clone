import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';

import { selectors } from '../../store/product';
import HeaderBar from '../HeaderBar/index';
import Dispalay from './includes/Display';
import TitleInfo from './includes/TitleInfo';
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
import FooterBar from '../Footer/index';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/Product/product');

const getProductComponent = (isPreview, taskCode) => {
  const Product = ({ productData }) => {
    const { catalog, titleInfo, keyfeatures, imgUrls, offerInfo, shippingInfo, returnInfo, details } = productData;
    console.log('productData', productData);
    return (
      <div>
        {
          isPreview ? null : <HeaderBar />
        }
        <div className={`${styles['page-details-slider']}`}>
          <Row className={`${styles['m-0']} ${styles['relative']}`}>
            <Col xs={12} md={8} className={styles['pl-0']}>
              <Dispalay imgs={imgUrls} />
            </Col>
              <div className={`${styles['details-right-part']} ${styles['absolute']}`}>
                <div className={`${styles['details-right-part-inn']}`}>
                  <TitleInfo {...titleInfo} isPreview={isPreview}/>
                  <ProductDetails details={details} keyfeatures={keyfeatures} isPreview={isPreview}/>
                  {
                    isPreview ? null : <Shipping shippingInfo={shippingInfo} />
                  }
                  {
                    isPreview ? null : <ProductPrice offerInfo={offerInfo} />
                  }
                </div>
                {
                  isPreview ? null : <AddToCart offerInfo={offerInfo} />
                }
              </div>
          </Row>
        </div>
         <div className={styles['bg-white']}>
            <Grid>
              <Row>
                <Col md={8}>
                {
                  isPreview ? null : <RecentView />
                }
                </Col>
                <Col md={8}>
                {
                  isPreview ? null : <ReviewsTab />
                }
                </Col>
                <Col md={8}>
                  <ElectronicsTab catalog={catalog}/>
                </Col>
              </Row>
            </Grid>
          </div>
        <div className={`${styles['border-b']} ${styles['border-t']} ${styles['pb-30']} ${styles['pt-30']}`}>
        {
          isPreview ? null : <FooterBar />
        }
      </div>
      </div>
    );
  };

  const mapStateToProps = (store) => ({
    productData: taskCode ? selectors.getPreview(store) : selectors.getProduct(store)
  });

  Product.propTypes = {
    productData: PropTypes.object.isRequired
  };

  return connect(mapStateToProps, null)(Product);
}

export default getProductComponent;
