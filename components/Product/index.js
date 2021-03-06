import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { languageDefinations } from '../../utils/lang';
import HeaderBar from '../HeaderBar/index';
import Display from './includes/Display';
import TitleInfo from './includes/TitleInfo';
import Shipping from './includes/Shipping';
import TilaCarePolicy from './includes/TilaCarePolciy';

import AddToCart from './includes/AddToCart';
import RecentView from './includes/RecentView';
import ElectronicsTab from './includes/ElectronicsTab';
import ProductDetails from './includes/ProductDetails';
import { actionCreators as userVaultActionCreators, selectors as userVaultSelectors } from '../../store/cam/userVault';
import FooterBar from '../Footer/index';
import Theme from '../helpers/context/theme';
import CompareWidget from '../common/CompareWidget';
import { actionCreators, selectors } from '../../store/product';
import { actionCreators as wishlistActionCreators, selectors as wishListSelectors } from '../../store/cam/wishlist';
import { actionCreators as addressActionCreators, selectors as addressSelectors } from '../../store/cam/address';
import { actionCreators as paymentActionCreators } from '../../store/payments';
import { selectors as authSelectors } from '../../store/auth';
import { selectors as cartSelectors } from '../../store/cart';
import { selectors as listingCartSelectors } from '../../store/listingCart'
import LoadingBar from '../common/Loader/skeletonLoader';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './product_en.styl';
import styles_ar from './product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

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
        rv: [],
        notifyEmail: null,
        emailErr: '',
        tilaPolicy: [],
        choosenPolicyData: props.selectedTilaPolicy,
        // positionStyle: 'fixed-style'
      };
      this.detailsRef = React.createRef();
      this.bottomRef = React.createRef();
      this.onChangeField = this.onChangeField.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.notify = this.notify.bind(this);
      this.setTilaPolicy = this.setTilaPolicy.bind(this);
    }

    componentDidMount() {
      const {
        productData, getCardResults, getRecentlyViewed,
        variantId, isLoggedIn, addProductToRV, isAddedToCart,
      } = this.props;
      const {
        offerInfo, titleInfo, imgUrls, tuin, product_id, catalogObj,
      } = productData;

      if (window.localStorage && !isPreview) {
        digitalData.page.pageInfo.pageName = titleInfo && titleInfo.title && titleInfo.title.attribute_values[0] && titleInfo.title.attribute_values[0].value;
        digitalData.page.category = { primaryCategory: productData.categoryType };
        digitalData.page.pageInfo.breadCrumbs = productData.breadcrums ? productData.breadcrums.map(item => item.display_name_en) : [];
        this.props.track({
          eventName: 'Product Viewed',
          ProductData: productData,
        });
      }
      getCardResults();
      if (isLoggedIn) {
        if (productData.catalogObj.variant_id) addProductToRV(variantId);
        getRecentlyViewed();
      } else if (offerInfo.offerPricing) {
        const pr = offerInfo && offerInfo.offerPricing && offerInfo.offerPricing.sellingPrice &&
          offerInfo.offerPricing.sellingPrice.display_value;
        const cd = offerInfo && offerInfo.offerPricing && offerInfo.offerPricing.sellingPrice &&
          offerInfo.offerPricing.sellingPrice.currency_code;
        const mrp = offerInfo && offerInfo.offerPricing && offerInfo.offerPricing.strickedPrice &&
        offerInfo.offerPricing.strickedPrice.display_value;
        const recentData = localStorage.getItem('rv');
        const arr = recentData ? JSON.parse(recentData) : [];
        const index = _.findIndex(arr, o => o.id === offerInfo.listingId);

        if (arr.length === 15) {
          arr.pop();
        }
        if (index === -1) {
          arr.unshift({
            nm: titleInfo && titleInfo.title && titleInfo.title.attribute_values && titleInfo.title.attribute_values[0].value,
            br: titleInfo && titleInfo.brand && titleInfo.brand.attribute_values && titleInfo.brand.attribute_values[0].value,
            im: imgUrls && imgUrls[0].url,
            pr,
            cd,
            mrp,
            uri: location.href,
            id: offerInfo.listingId,
            tuin,
            pid: product_id,
            vid: variantId,
            cid: catalogObj.catalog_id,
          });
          localStorage.setItem('rv', JSON.stringify(arr));
        }
        this.setState({ rv: arr });
      }
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
      const {
        getRecentlyViewed, productData,
        addProductToRV, isLoggedIn, isAddedToCart,
      } = this.props;
      const { rv } = this.state;
      if (isLoggedIn !== nextProps.isLoggedIn) {
        if (productData.catalogObj.variant_id) addProductToRV(productData.catalogObj.variant_id);
        getRecentlyViewed();
      }
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    onChangeField({ target }) {
      this.setState({
        notifyEmail: target.value,
      });
    }
    setTilaPolicy(data) {
      this.setState({
        choosenPolicyData: data,
        tilaPolicy: Object.values(data),
      }, () => this.props.setTilaPolicy(data));
    }
    handleScroll(e) {
      if (skipScroll) {
        return;
      }
      const shippingContainer = document.getElementById('shipping-cont');
      const buttonsCont = document.getElementById('cart-btn-cont');
      const [{ height: shippingHeight, top: shippingY }] = [shippingContainer.getBoundingClientRect()];
      btnY = btnY || document.getElementById('cart-btn-cont').getBoundingClientRect().top;
      this.setState({
        positionStyle: (shippingHeight + shippingY) < btnY ? 'absolute-style' : 'fixed-style',
        positionTop: btnY,
      });
    }

    notify() {
      const {
        productData, userDetails, notifyMe, variantId,
      } = this.props;
      let { emailErr, notifyEmail } = this.state;
      const params = {
        product_id: productData.product_id,
        variant_id: variantId,
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

    handleScroll(event) {
      const scrollTop = event.currentTarget.pageYOffset;
      const detailsRect = this.detailsRef.current && this.detailsRef.current.getBoundingClientRect() || {};
      const bottomRefRect = this.bottomRef.current && this.bottomRef.current.getBoundingClientRect() || {};
      const { isSearchPreview } = this.props;
      if (!isSearchPreview && bottomRefRect.top <= window.innerHeight && this.state.stickyElements.details !== 'stateBottom') {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateBottom',
          },
        });
        return;
      }
      if (!isSearchPreview && bottomRefRect.top > window.innerHeight && detailsRect.top <= 108 && this.state.stickyElements.details !== 'stateMiddle') {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateMiddle',
          },
        });
        return;
      }
      if (detailsRect.top > 108) {
        this.setState({
          stickyElements: {
            ...this.state.stickyElements,
            details: 'stateTop',
          },
        });
      }
    }
    render() {
      const {
        productData, userDetails, showLoading, query, variantId, productId, isLoggedIn,
        isSearchPreview, savedCardsData, loaderProps, selectedTilaPolicy, recentlyViewed, isAddedToCart,
      } = this.props;
      const {
        catalog, titleInfo, keyfeatures, extraOffers, imgUrls, offerInfo, shippingInfo, isWishlisted, returnInfo,
        details, productDescription, catalogObj, categoryType = '', warranty, breadcrums, product_id, wishlistId,
        tila_care_policy, newVariantId,
      } = productData;

      const { offerPricing } = offerInfo;
      const {
        stickyElements, notifyEmail, emailErr, positionStyle, positionTop, defaultPosition, tilaPolicy, rv,
      } = this.state;
      const { loadComponent, pathname } = loaderProps;
      return (
        <Theme.Provider value={categoryType.toLowerCase()}>
          <div className={`${styles['pdp-wrap']} ${categoryType.toLowerCase()} ${styles[categoryType.toLowerCase()]}`}>
            {isPreview || isSearchPreview ? null :
            <HeaderBar />
            }
            <LoadingBar loadComponent={loadComponent} pathname={pathname}>
              <div className={`${styles.relative}`}>
                <div className={`${styles['page-details-slider']}`}>
                  <Row className={`${styles['m-0']} ${styles['ht-100per']}`}>
                    <Col xs={12} md={8} sm={12} className={`${styles['pl-0']} ${styles['pdp-img-prt']} ${styles['p-0']}`}>
                      <NoSSR>
                        <Display
                          offerInfo={offerInfo}
                          product_id={product_id}
                          offerPricing={offerPricing}
                          catalogObj={catalogObj}
                          newVariantId={newVariantId}
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
                          <TitleInfo {...titleInfo} isPreview={isPreview} offerInfo={offerInfo} shippingInfo={shippingInfo} savedCardsData={savedCardsData} />
                          <ProductDetails
                            details={details}
                            keyfeatures={keyfeatures}
                            isPreview={isPreview}
                            productInfo={productData}
                            variantId={variantId}
                            productId={productId}
                            isSearchPreview={isSearchPreview}
                          />
                        </div>
                        <div className={`${styles['ipad-details']} ${styles['bdr-lt']} ${styles['ipad-pl-15']}`}>
                          {isPreview ? null :
                            <Shipping
                              shippingInfo={shippingInfo}
                              returnInfo={returnInfo}
                              offerInfo={offerInfo}
                              tila_care_policy={tila_care_policy}
                              warranty={warranty}
                            />
                          }
                          {Object.keys(warranty).length > 0 &&
                            <TilaCarePolicy
                              data={tila_care_policy}
                              warranty={warranty}
                              setTilaPolicy={this.setTilaPolicy}
                              choosenPolicyData={this.state.choosenPolicyData}
                              selectedTilaPolicy={selectedTilaPolicy}
                            />
                          }
                          {!isPreview &&
                            (shippingInfo === null || shippingInfo.shippable)
                              ?
                                <AddToCart
                                  offerInfo={offerInfo}
                                  productData={productData.product_id}
                                  shippingInfo={shippingInfo}
                                  isPreview={isPreview}
                                  emailErr={emailErr}
                                  userDetails={userDetails}
                                  notifyEmail={notifyEmail}
                                  notify={this.notify}
                                  showLoading={showLoading}
                                  onChangeField={this.onChangeField}
                                  tilaPolicy={tilaPolicy}
                                />
                              :
                              null
                          }
                          {/* {isPreview ? null :
                            (offerInfo.stockError || offerInfo.availabilityError) && ((shippingInfo && Object.keys(shippingInfo).length === 0) || (shippingInfo === null || shippingInfo.shippable)) &&
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
                          } */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                {
                  isSearchPreview ? null :
                  <div className={`${styles['bg-white']} ${styles['mt-30']}`}>
                    <Grid>
                      <Row>
                        <Col md={8}>
                          {
                            isPreview ? null :
                            <NoSSR>
                              <RecentView
                                isLoggedIn={isLoggedIn}
                                shippingInfo={shippingInfo}
                                recentlyViewed={isLoggedIn ? recentlyViewed : rv.map((item) => {
                                  item.isAddedToCart = isAddedToCart(item.id);
                                  return item;
                                })}
                              />
                            </NoSSR>
                          }
                        </Col>
                        {/* <Col md={8}>
                        {
                          isPreview ? null : <ReviewsTab />
                        }
                      </Col> */}
                        <Col md={8}>
                          <ElectronicsTab titleInfo={titleInfo} isPreview={isPreview} catalog={catalog} catalogObj={catalogObj} productDescription={productDescription} />
                        </Col>
                      </Row>
                    </Grid>
                  </div>
              }
                <div className={styles['pdp-bottom-ref']} ref={this.bottomRef} />
              </div>
            </LoadingBar>
            <div className={`${styles['border-b']} ${styles['border-t']} ${styles['pb-30']} ${styles['pt-30']}`}>
              {
                isPreview || isSearchPreview ? null : <FooterBar />
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
    showLoading: wishListSelectors.getNotifyLoading(store),
    selectedAddress: addressSelectors.getSelectedAddress(store),
    savedCardsData: userVaultSelectors.getCardResults(store),
    selectedTilaPolicy: selectors.getTilaPolicy(store),
    isLoggedIn: authSelectors.getLoggedInStatus(store),
    isAddedToCart: listingId => wishListSelectors.getCartStatus(store, listingId),
    recentlyViewed: wishListSelectors.recentlyViewed(store),
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        notifyMe: wishlistActionCreators.notifyMe,
        addProductToRV: wishlistActionCreators.addProductToRV,
        getRecentlyViewed: wishlistActionCreators.getRecentlyViewed,
        track: actionCreators.track,
        getShippingAddressResults: addressActionCreators.getShippingAddressResults,
        createOrder: paymentActionCreators.createOrder,
        getCardResults: userVaultActionCreators.getCardResults,
        setTilaPolicy: actionCreators.setTilaPolicy,
      },
      dispatch,
    );

  Product.propTypes = {
    productData: PropTypes.object.isRequired,
    isSearchPreview: PropTypes.bool,
  };
  Product.defaultProps = {
    isSearchPreview: false,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Product);
};

export default getProductComponent;
