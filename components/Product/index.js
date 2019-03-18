import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { selectors } from '../../store/product';
import HeaderBar from '../HeaderBar/index';
import Dispalay from './includes/Display';
import TitleInfo from './includes/TitleInfo';
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
import { actionCreators as wishlistActionCreators } from '../../store/cam/wishlist';

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
        notifyEmail: null,
        emailErr: '',
      };
      this.detailsRef = React.createRef();
      this.bottomRef = React.createRef();
      this.onChangeField = this.onChangeField.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.notify = this.notify.bind(this);
    }

    componentDidMount() {
      if (window.localStorage && !isPreview) {
        const { productData } = this.props;
        const {
          offerInfo, titleInfo, imgUrls, shippingInfo,
        } = productData;
        digitalData.page.pageInfo.pageName = titleInfo.title;
        digitalData.page.category = { primaryCategory: productData.categoryType };
        digitalData.page.pageInfo.breadCrumbs = productData.breadcrums.map(item => item.display_name_en);
        if (offerInfo.price) {
          const pr = offerInfo.price.split(' ');
          const recentData = localStorage.getItem('rv');
          const arr = recentData ? JSON.parse(recentData) : [];
          const index = _.findIndex(arr, (o) => o.id == shippingInfo.listing_id);


          // if (index > -1 && arr.length <= 5) {
          //   arr = arr.slice(index, 1);
          // } else
          if (arr.length == 5) {
            arr.pop();
          }

          if (index == -1) {
            arr.unshift({
              nm: titleInfo.title,
              im: imgUrls[0].url,
              pr: pr[0],
              cd: pr[1],
              uri: location.href,
              id: shippingInfo.listing_id,
            });
            localStorage.setItem('rv', JSON.stringify(arr));
          }
          this.setState({ recentlyViewed: arr });
        }
      }

      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    onChangeField({ target }) {
      this.setState({
        notifyEmail: target.value,
      });
    }

    notify() {
      const { productData, userDetails, notifyMe } = this.props;
      let { emailErr, notifyEmail } = this.state;
      const params = {
        product_id: productData.product_id,
      };
      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!userDetails.isLoggedIn) {
        if (emailReg.test(notifyEmail)) {
          params.email = notifyEmail;
          notifyMe(params);
          emailErr = '';
          notifyEmail = '';
        } else {
          emailErr = 'Enter Valid EmailID';
        }
      } else {
        notifyMe(params);
      }
      this.setState({
        emailErr,
        notifyEmail,
      });
    }

    handleScroll(event) {
      const scrollTop = event.currentTarget.pageYOffset;
      const detailsRect = this.detailsRef.current.getBoundingClientRect();
      const bottomRefRect = this.bottomRef.current.getBoundingClientRect();
      if (bottomRefRect.top <= window.innerHeight && this.state.stickyElements.details !== 'stateBottom') {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateBottom',
          },
        });
        return;
      }
      if (bottomRefRect.top > window.innerHeight && detailsRect.top <= 61 && this.state.stickyElements.details !== 'stateMiddle') {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateMiddle',
          },
        });
        return;
      }
      if (detailsRect.top > 61) {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateTop',
          },
        });
      }
    }

    render() {
      const { productData, userDetails } = this.props;
      const {
        catalog, titleInfo, keyfeatures, extraOffers, imgUrls, offerInfo, shippingInfo, returnInfo, details, productDescription, catalogObj, categoryType = '', warranty, breadcrums
      } = productData;
      const {
        stickyElements, recentlyViewed, notifyEmail, emailErr,
      } = this.state;
      return (
        <Theme.Provider value={categoryType.toLowerCase()}>
          <div className={`${styles['pdp-wrap']} ${categoryType.toLowerCase()} ${styles[categoryType.toLowerCase()]}`}>
            {
              isPreview ? null : <HeaderBar />
            }
            <div className={`${styles.relative}`}>
              <div className={`${styles['page-details-slider']}`}>
                <Row className={`${styles['m-0']} ${styles['ht-100per']}`}>
                  <Col xs={12} md={8} sm={12} className={`${styles['pl-0']} ${styles['ht-100per']} ${styles['pdp-img-prt']}`}>
                    <NoSSR>
                      <Dispalay
                        imgs={imgUrls}
                        extraOffers={extraOffers}
                        breadcrums={breadcrums}
                      />
                    </NoSSR>
                  </Col>
                  <div className={styles['details-pixel']} ref={this.detailsRef} />
                  <Col sm={12} className={`${styles['details-right-part']} ${styles[stickyElements.details]}`}>
                    <div className={`${styles['details-right-part-inn']}`}>
                      <div className={`${styles['ipad-details']} ${styles['ipad-pr-15']}`}>
                        <TitleInfo {...titleInfo} isPreview={isPreview} />
                        <ProductDetails details={details} keyfeatures={keyfeatures} isPreview={isPreview} />
                      </div>
                      <div className={`${styles['ipad-details']} ${styles['bdr-lt']} ${styles['ipad-pl-15']}`}>
                        {
                          isPreview ? null : <Shipping shippingInfo={shippingInfo} offerInfo={offerInfo} warranty={warranty}/>
                        }
                        {
                          isPreview ? null : <AddToCart offerInfo={offerInfo} />
                        }
                        {
                          (offerInfo.stockError || offerInfo.availabilityError) &&
                          <div className={`${styles['flx-space-bw']} ${styles['align-baseline']}`}>
                            {!userDetails.isLoggedIn &&
                            <div className={`${styles['mb-0']} ${styles['fp-input']} ${styles['pb-10']}`}>
                              <input onChange={this.onChangeField} name="notify" type="text" value={notifyEmail} required />
                              <label>GetNotified</label>
                              {emailErr &&
                                <span className={styles['error-msg']}>{emailErr}</span>
                              }
                            </div>}
                            <a className={`${styles['flex-center']} ${styles.notify_me_btn}`} onClick={this.notify}>
                              <span className={`${styles['p-10-40']} ${styles['fs-20']}`}>Notify Me</span>
                            </a>
                          </div>
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
                    {/* <Col md={8}>
                    {
                      isPreview ? null : <ReviewsTab />
                    }
                    </Col> */}
                    <Col md={8}>
                      <ElectronicsTab catalog={catalog} catalogObj={catalogObj} productDescription={productDescription} />
                    </Col>
                  </Row>
                </Grid>
              </div>
              <div className={styles['pdp-bottom-ref']} ref={this.bottomRef} />
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
  }

  const mapStateToProps = store => ({
    productData: taskCode ? selectors.getPreview(store) : selectors.getProduct(store),
    userDetails: store.authReducer.data,
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        notifyMe: wishlistActionCreators.notifyMe,
      },
      dispatch,
    );

  Product.propTypes = {
    productData: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Product);
};

export default getProductComponent;
