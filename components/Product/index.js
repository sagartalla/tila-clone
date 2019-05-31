import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { languageDefinations } from '../../utils/lang';
import HeaderBar from '../HeaderBar/index';
import Display from './includes/Display';
import TitleInfo from './includes/TitleInfo';
import Shipping from './includes/Shipping';

import AddToCart from './includes/AddToCart';
import RecentView from './includes/RecentView';
import ElectronicsTab from './includes/ElectronicsTab';
import ProductDetails from './includes/ProductDetails';
import FooterBar from '../Footer/index';
import Theme from '../helpers/context/theme';
import CompareWidget from '../common/CompareWidget';
import { actionCreators, selectors } from '../../store/product';
import { actionCreators as wishlistActionCreators, selectors as wishListSelectors } from '../../store/cam/wishlist';
import Button from '../common/CommonButton';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './product_en.styl';
import styles_ar from './product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const { PDP_PAGE } = languageDefinations();
let btnY = null;
let skipScroll = false;

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
        // positionStyle: 'fixed-style'
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
        digitalData.page.pageInfo.breadCrumbs = productData.breadcrums ? productData.breadcrums.map(item => item.display_name_en) : [];
        this.props.track({
          eventName: 'Product Viewed',
          ProductData: productData,
        });
        if (offerInfo.offerPricing) {
          const pr = offerInfo && offerInfo.offerPricing && offerInfo.offerPricing.sellingPrice && offerInfo.offerPricing.sellingPrice.display_value;
          const cd = offerInfo && offerInfo.offerPricing && offerInfo.offerPricing.sellingPrice && offerInfo.offerPricing.sellingPrice.currency_code;
          const recentData = localStorage.getItem('rv');
          const arr = recentData ? JSON.parse(recentData) : [];
          const index = _.findIndex(arr, o => o.id == offerInfo.listingId);

          // if (index > -1 && arr.length <= 5) {
          //   arr = arr.slice(index, 1);
          // } else
          if (arr.length === 15) {
            arr.pop();
          }

          if (index === -1) {
            arr.unshift({
              nm: titleInfo.title,
              im: imgUrls && imgUrls[0].url,
              pr,
              cd,
              uri: location.href,
              id: shippingInfo.listing_id,
            });
            localStorage.setItem('rv', JSON.stringify(arr));
          }
          this.setState({ recentlyViewed: arr });
        }
      }

      window.addEventListener('scroll', this.handleScroll);
      setTimeout(() => {
        const shippingContainer = document.getElementById('shipping-cont');
        const buttonsCont = document.getElementById('cart-btn-cont');
        const [{height: shippingHeight, top: shippingY}, {height: btnHeight}] = [shippingContainer.getBoundingClientRect(), buttonsCont.getBoundingClientRect()];
        skipScroll = (shippingHeight + shippingY) < (window.innerHeight - btnHeight);
        this.setState({
          defaultPosition: skipScroll ? 'absolute-style' : 'fixed-style'
        });
      });
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    onChangeField({ target }) {
      this.setState({
        notifyEmail: target.value,
      });
    }

    handleScroll(e) {
      if(skipScroll) {
        return;
      }
      const shippingContainer = document.getElementById('shipping-cont');
      const buttonsCont = document.getElementById('cart-btn-cont');
      const [{height: shippingHeight, top: shippingY}] = [shippingContainer.getBoundingClientRect()];
      btnY = btnY || document.getElementById('cart-btn-cont').getBoundingClientRect().top;
      this.setState({
        positionStyle: (shippingHeight + shippingY) < btnY ? 'absolute-style' : 'fixed-style',
        positionTop: btnY
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
          emailErr = PDP_PAGE.ENTER_VALID_EMAIL;
        }
      } else {
        notifyMe(params);
      }
      this.setState({
        emailErr,
        notifyEmail,
      });
    }

/* eslint-disable */
    render() {
      const { productData, userDetails, showLoading, query } = this.props;
      const {
        catalog, titleInfo, keyfeatures, extraOffers, imgUrls, offerInfo, shippingInfo, isWishlisted, returnInfo,
        details, productDescription, catalogObj, categoryType = '', warranty, breadcrums, product_id, wishlistId,
      } = productData;
      const { offerPricing } = offerInfo;
      const {
        stickyElements, recentlyViewed, notifyEmail, emailErr, positionStyle, positionTop, defaultPosition
      } = this.state;
      console.log('dwadwq', shippingInfo);
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
                      <Display
                        product_id={product_id}
                        offerPricing={offerPricing}
                        catalogObj={catalogObj}
                        imgs={imgUrls}
                        isWishlisted={isWishlisted}
                        extraOffers={extraOffers}
                        breadcrums={breadcrums}
                        wishlistId={wishlistId}
                      />
                    </NoSSR>
                  </Col>
                  <div className={styles['details-pixel']} ref={this.detailsRef} />
                  <Col sm={12} className={`${styles['details-right-part']} ${styles[stickyElements.details]}`}>
                    <div className={`${styles['details-right-part-inn']}`}>
                      <div className={`${styles['ipad-details']} ${styles['ipad-pr-15']}`}>
                        <TitleInfo {...titleInfo} catalogObj={catalogObj} isPreview={isPreview} offerInfo={offerInfo} />
                        <ProductDetails
                          details={details}
                          keyfeatures={keyfeatures}
                          isPreview={isPreview}
                          productInfo={productData}
                          variantId={query.variantId}
                          productId={query.productId}
                        />
                      </div>
                      <div className={`${styles['ipad-details']} ${styles['bdr-lt']} ${styles['ipad-pl-15']}`}>
                        {
                          isPreview ? null : <Shipping shippingInfo={shippingInfo} returnInfo={returnInfo} offerInfo={offerInfo} warranty={warranty} />
                        }
                        {isPreview ? null :
                          (shippingInfo === null || shippingInfo.shippable) && 
                            <AddToCart
                              offerInfo={offerInfo}
                              productData={productData.product_id}
                              shippingInfo={shippingInfo}
                              isPreview={isPreview}
                              styling={positionStyle || defaultPosition}
                              top={positionStyle === 'absolute-style' ?  positionTop : null}
                            />
                        }
                        {
                          (offerInfo.stockError || offerInfo.availabilityError) && (Object.keys(shippingInfo).length === 0 || shippingInfo.shippable) &&
                          <div className={`${styles['flx-space-bw']} ${styles['align-baseline']}`}>
                            {!userDetails.isLoggedIn &&
                            <div className={`${styles['mb-0']} ${styles['fp-input']} ${styles['pb-10']}`}>
                              <input onChange={this.onChangeField} name="notify" type="text" value={notifyEmail} required />
                              <label>{PDP_PAGE.GET_NOTIFIED}</label>
                              {emailErr &&
                                <span className={styles['error-msg']}>{emailErr}</span>
                              }
                            </div>}
                            <Button
                              className={`${styles['flex-center']} ${styles.notify_me_btn} ${styles['fs-20']}`}
                              btnText={PDP_PAGE.NOTIFY_ME}
                              onClick={this.notify}
                              hoverClassName="hoverBlueBackground"
                              btnLoading={showLoading}
                            />
                          </div>
                        }
                      </div>
                    </div>

                  </Col>
                </Row>
              </div>
              <div className={`${styles['bg-white']} ${styles['mt-30']}`}>
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
    showLoading: wishListSelectors.getLoader(store),
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        notifyMe: wishlistActionCreators.notifyMe,
        track: actionCreators.track,

      },
      dispatch,
    );

  Product.propTypes = {
    productData: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Product);
};

export default getProductComponent;
