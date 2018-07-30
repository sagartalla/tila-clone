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
  class Product extends Component {
    constructor(props) {
      super(props);
      this.state = {
        stickyElements: {
          details: 'stateTop',
          slidebar: 'stateTop',
        }
      }
      this.detailsRef = React.createRef();
      this.bottomRef = React.createRef();
      this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
      let scrollTop = event.currentTarget.pageYOffset;
      let detailsRect = this.detailsRef.current.getBoundingClientRect();
      let bottomRefRect = this.bottomRef.current.getBoundingClientRect();
      console.log('asdsad', detailsRect.top, bottomRefRect.top);
      if(bottomRefRect.top <= window.innerHeight && this.state.stickyElements.details !== 'stateBottom'){
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateBottom',
          }
        });
        return;
      }
      if(bottomRefRect.top > window.innerHeight && detailsRect.top <= 61 && this.state.stickyElements.details !== 'stateMiddle') {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateMiddle',
          }
        });
        return;
      }
      if(detailsRect.top > 61) {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateTop',
          }
        });
        return;
      }
    }

    render() {
      const { productData } = this.props;
      const { catalog, titleInfo, keyfeatures, imgUrls, offerInfo, shippingInfo, returnInfo, details } = productData;
      const { stickyElements } = this.state;
      return (
        <div className={styles['pdp-wrap']}>
          {
            isPreview ? null : <HeaderBar />
          }
          <div className={`${styles['relative']}`}>
            <div className={`${styles['page-details-slider']}`}>
              <Row className={`${styles['m-0']} ${styles['ht-100per']}`}>
                <Col xs={12} md={8} className={`${styles['pl-0']} ${styles['ht-100per']}`}>
                  <Dispalay imgs={imgUrls} />
                </Col>
                <div className={styles['details-pixel']} ref={this.detailsRef}></div>
                <div className={`${styles['details-right-part']} ${styles[stickyElements.details]}` }>
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
            <div className={styles['pdp-bottom-ref']} ref={this.bottomRef}></div>
          </div>
          <div className={`${styles['border-b']} ${styles['border-t']} ${styles['pb-30']} ${styles['pt-30']}`}>
          {
            isPreview ? null : <FooterBar />
          }
          </div>
        </div>
      );
    }
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
