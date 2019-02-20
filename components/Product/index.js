import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { selectors } from '../../store/product';
import HeaderBar from '../HeaderBar/index';
import Dispalay from './includes/Display';
import TitleInfo from './includes/TitleInfo';
import Offers from './includes/Offers';
import Shipping from './includes/Shipping';

import AddToCart from './includes/AddToCart';
import RecentView from './includes/RecentView';
import Review from './includes/Reviews';
import ReviewsTab from './includes/ReviewTab';
import ElectronicsTab from './includes/ElectronicsTab';
import ProductDetails from './includes/ProductDetails';
import ReviewRatingList from '../RatingReviews/List';
import FooterBar from '../Footer/index';
import Theme from '../helpers/context/theme';
import CompareWidget from '../common/CompareWidget';

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
        },
        recentlyViewed: [],
      }
      this.detailsRef = React.createRef();
      this.bottomRef = React.createRef();
      this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
      if (window.localStorage && !isPreview) {
        const { productData } = this.props;
        const { offerInfo, titleInfo, imgUrls, shippingInfo } = productData;
        digitalData.page.pageInfo.pageName = titleInfo.title
        digitalData.page.category = {primaryCategory:productData.categoryType}
        digitalData.page.pageInfo.breadCrumbs = productData.breadcrums.map((item) => {
          return item.display_name_en
        })
        if (offerInfo.price) {
          const pr = offerInfo.price.split(' ');
          const recentData = localStorage.getItem('rv');
          let arr = recentData ? JSON.parse(recentData) : [];
          let index = _.findIndex(arr, function (o) { return o.id == shippingInfo.listing_id; })


          // if (index > -1 && arr.length <= 5) {
          //   arr = arr.slice(index, 1);
          // } else
          if (arr.length == 5) {
            arr.pop()
          }

          if (index == -1) {
            arr.unshift({
              'nm': titleInfo.title,
              'im': imgUrls[0].url,
              'pr': pr[0],
              'cd': pr[1],
              'uri': location.href,
              'id': shippingInfo.listing_id
            });
            localStorage.setItem('rv', JSON.stringify(arr));
          }
          this.setState({ recentlyViewed: arr })
        }
      }

      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
      let scrollTop = event.currentTarget.pageYOffset;
      let detailsRect = this.detailsRef.current.getBoundingClientRect();
      let bottomRefRect = this.bottomRef.current.getBoundingClientRect();
      if (bottomRefRect.top <= window.innerHeight && this.state.stickyElements.details !== 'stateBottom') {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateBottom',
          }
        });
        return;
      }
      if (bottomRefRect.top > window.innerHeight && detailsRect.top <= 61 && this.state.stickyElements.details !== 'stateMiddle') {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateMiddle',
          }
        });
        return;
      }
      if (detailsRect.top > 61) {
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
      const { catalog, titleInfo, keyfeatures, imgUrls, offerInfo, shippingInfo, returnInfo, details, categoryType = '' } = productData;
      const { stickyElements, recentlyViewed } = this.state;
      return (
        <Theme.Provider value={categoryType.toLowerCase()}>
          <div className={`${styles['pdp-wrap']} ${categoryType.toLowerCase()} ${styles[categoryType.toLowerCase()]}`}>
            {
              isPreview ? null : <HeaderBar />
            }
            <div className={`${styles['relative']}`}>
              <div className={`${styles['page-details-slider']}`}>
                <Row className={`${styles['m-0']} ${styles['ht-100per']}`}>
                  <Col xs={12} md={8} sm={12} className={`${styles['pl-0']} ${styles['ht-100per']} ${styles['pdp-img-prt']}`}>
                    <NoSSR>
                      <Dispalay imgs={imgUrls} />
                    </NoSSR>
                  </Col>
                  <div className={styles['details-pixel']} ref={this.detailsRef}></div>
                  <Col sm={12} className={`${styles['details-right-part']} ${styles[stickyElements.details]}`}>
                    <div className={`${styles['details-right-part-inn']}`}>
                      <div className={`${styles['ipad-details']} ${styles['ipad-pr-15']}`}>
                        <TitleInfo {...titleInfo} isPreview={isPreview} />
                        <ProductDetails details={details} keyfeatures={keyfeatures} isPreview={isPreview} />
                      </div>
                      <div className={`${styles['ipad-details']} ${styles['bdr-lt']} ${styles['ipad-pl-15']}`}>
                        {
                          isPreview ? null : <Shipping shippingInfo={shippingInfo} offerInfo={offerInfo} />
                        }
                        {
                          isPreview ? null : <AddToCart offerInfo={offerInfo} />
                        }
                      </div>
                    </div>

                  </Col>
                </Row>
              </div>
              <div className={styles['bg-white']}>
                <Grid>
                  <Row>
                    <Col md={8}>
                      {
                        isPreview ? null : <NoSSR> <RecentView recentlyViewed={recentlyViewed} shippingInfo={shippingInfo} /> </NoSSR>
                      }
                    </Col>
                    {/*<Col md={8}>
                    {
                      isPreview ? null : <ReviewsTab />
                    }
                    </Col>*/}
                    <Col md={8}>
                      <ElectronicsTab catalog={catalog} />
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
          <CompareWidget />
        </Theme.Provider>
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
