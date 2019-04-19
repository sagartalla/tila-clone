import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Dropdown } from 'react-bootstrap';

import constants from '../../constants';
import HeaderBar from '../HeaderBar';
import FooterBar from '../Footer';
import SVGCompoent from '../common/SVGComponet';
import { actionCreators, selectors } from '../../store/compare';
import { actionCreators as cartActionCreators,  } from '../../store/cart';
import { selectors as cartSelectors } from '../../store/search';
import { languageDefinations } from '../../utils/lang';
import Button from '../common/CommonButton';

import lang from '../../utils/language';

import styles_en from './compare_en.styl';
import styles_ar from './compare_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const { COMPARE, PDP_PAGE } = languageDefinations();

const ICONS = {
  screenSize: '/icons/common-icon/display-screen',
  camera: 'icons/common-icon/camera-icon',
  processor: 'icons/common-icon/processor-icon',
  batteryPower: 'icons/common-icon/battery',
};

class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroups: {}, /* props.features.reduce((acc, a) => ({...acc, [a.key]: true}), {}) */
      selectedBrand: '',
    };
    this.selectGroup = this.selectGroup.bind(this);
    this.clearAllChecks = this.clearAllChecks.bind(this);
  }

  componentDidMount() {
    // read from local store productIds
    this.props.getCompareItemsData();
    this.props.getBrands();
  }

  componentWillReceiveProps(nextProps) {
    const { compareInfo, productList } = nextProps;
    if (!this.state.init && compareInfo.features && compareInfo.features.length) {
      this.setState({
        selectedGroups: compareInfo.features.reduce((acc, a) => ({ ...acc, [a.key]: true }), {}),
        init: true,
      });
    }
    if (compareInfo.compareCount !== this.props.compareInfo.compareCount) {
      this.setState({
        selectedBrand: '',
      });
    }
  }

  addToCart = ({ currentTarget }) => {
    const { addToCartAndFetch } = this.props;
    addToCartAndFetch({
      listing_id: currentTarget.getAttribute('id'),
    });
  }

  selectGroup(e) {
    const id = e.currentTarget.getAttribute('id');
    const { checked } = e.currentTarget;
    this.setState({
      selectedGroups: {
        ...this.state.selectedGroups,
        [id]: checked,
      },
    });
  }

  clearAllChecks() {
    const { selectedGroups } = this.state;
    Object.keys(selectedGroups).forEach((feature) => {
      selectedGroups[feature] = false;
    });
    this.setState({
      selectedGroups,
    });
  }

  selectBrand = ({ target }) => {
    if (target.value) {
      this.setState({
        selectedBrand: target.value,
      });
      this.props.getProducts(target.value);
    }
  }

  removeItem = ({ target }) => {
    const { removeCompareItem } = this.props;
    removeCompareItem(target.getAttribute('data-prod-id'));
  }

  selectProduct = ({ target }) => {
    if (target.value) {
      const {
        itemtype, productId, displayName, media,
      } = JSON.parse(target.value);

      const src = `${constants.mediaDomain}/${media[0]}`;
      this.props.getCompareItemsData({
        itemtype,
        productId,
        src,
        displayName,
      });
    }
  }

  render() {
    const { compareInfo = {}, brands = [], productList = [], cartButtonLoaders } = this.props;
    const {
      compareCount = 0, features = [], products = [], productsFeatures = [],
    } = compareInfo;
    const { selectedBrand } = this.state;
    return (
      <div>
        <HeaderBar />
        <div className={`${styles['compare-main']} ${styles['p-25']}`}>
          <h4 className={`${styles['fs-16']} ${styles.fontW600}`}>{COMPARE.TILA_COMPARE_1}{compareCount} {COMPARE.TILA_COMPARE_2}</h4>
          <Row className={styles.flex}>
            <Col md={3}>
              <div className={styles['compare-product']}>
                <div className={styles['compare-product-inn']}>
                  <h5 className={`${styles['flx-space-bw']}`}>
                    <span className={styles.fontW600}>{COMPARE.FEATUERS}</span>
                    <span className={`${styles['lgt-blue']} ${styles.pointer}`} onClick={this.clearAllChecks}>{COMPARE.CLEAR_ALL}</span>
                  </h5>
                  {
                    features.map(feature => (
                      <div key={feature.key} className={styles['checkbox-material']}>
                        <input id={feature.key} type="checkbox" onClick={this.selectGroup} checked={this.state.selectedGroups[feature.key]} />
                        <label htmlFor={feature.key}>{feature.value} </label>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Col>
            {
              products.map(product => (
                <Col md={3} key={product.id}>
                  <div className={`${styles['compare-dtls']} ${styles['ht-100per']}`}>
                    <div className={`${styles['ht-290']} ${styles.flex} ${styles['justify-center']}`}>
                      <img alt={product.name} src={`${constants.mediaDomain}/${product.imgSrc}`} className={`img-responsive ${styles['object-scale-down']}`} />
                    </div>
                    <div className={`${styles['compare-dtls-inn']} ${styles['pt-20']} ${styles['t-c']}`}>
                      <span className={`${styles['fs-12']} ${styles['lgt-blue']}`}>{product.brand}</span>
                      <div>
                        <span className={styles.fontW600}>{product.price} {product.currency}</span>
                        <span className={`${styles['fs-12']} ${styles['google-clr']}`}>{product.offer}</span>
                      </div>
                      <span className={`${styles['fs-10']} ${styles['thick-gry-clr']}`}>{product.name}</span>
                    </div>
                    <div className={`${styles.flex} ${styles['justify-center']}`}>
                      <Button
                        className={product.addedToCart ? `${styles['p-10']} ${styles['flex-center']} ${styles['added-btn']}` :  `${styles['p-10']} ${styles['flex-center']} ${styles['cart-btn']}`}
                        id={product.listing_id}
                        onClick={product.addedToCart === false && this.addToCart}
                        btnText={product.addedToCart ? PDP_PAGE.ADDED_TO_CART : PDP_PAGE.ADD_TO_CART}
                        showImage={product.addedToCart ? 'icons/cart/added-cart-icon' : 'icons/cart/blue-cart-icon'}
                        btnLoading={cartButtonLoaders && cartButtonLoaders[product.listing_id]}
                      />
                    </div>
                    {compareCount > 1 && <span className={`${styles['close-item']} ${styles.pointer}`} data-prod-id={product.id} onClick={this.removeItem}>x</span>}
                  </div>
                </Col>
              ))
            }
            {compareCount < 5 &&
            <Col md={3}>
              <div className={`${styles['flex-center']} ${styles['ht-100per']} ${styles['bg-white']} ${styles['justify-center']} ${styles['flex-colum']}`}>
                <div className={styles['add-icon']}>+</div>
                <div className={`${styles.width100} ${styles['p-10-40']}`}>
                  <select className={styles.width100} value={selectedBrand} onChange={this.selectBrand}>
                    <option value="">{COMPARE.SELECT_BRAND}</option>
                    {brands.length > 0 &&
                    brands.map(brand => (
                      <option key={brand.Param} value={brand.Param}>{brand.attributeValue}</option>
                    ))}
                  </select>
                </div>
                {productList.length > 0 &&
                <div className={`${styles.width100} ${styles['p-10-40']}`}>
                  <select className={styles.width100} onChange={this.selectProduct}>
                    <option value="">{COMPARE.SELECT_PRODUCT}</option>
                    {productList.length > 0 &&
                      productList.map(product => (
                        <option key={product.id} value={JSON.stringify(product)}>{product.displayName}</option>
                    ))}
                  </select>
                </div>}
              </div>
            </Col>}
          </Row>
          <div className={styles['compare-main-items']}>
            {
              productsFeatures.map(productFeature =>
                (this.state.selectedGroups[productFeature.key] ? (
                  <div id={productFeature.key} key={productFeature.key}>
                    <Row>
                      <Col md={12}>
                        <h3>{productFeature.name}</h3>
                      </Col>
                    </Row>
                    {
                      productFeature.attributes.map(attr => (
                        <Row key={attr.name} className={`${styles['compare-product-spficication']} ${styles['flex-center']} ${styles['pt-5']} ${styles['pb-5']}`}>
                          <Col md={3}>
                            <div className={`${styles['flex-center']} ${styles['flex-colum']} ${styles['dispy-screen']}`}>
                              {/* <SVGCompoent clsName={`${styles['screen-icon']}`} src={ICONS[item.id]} /> */}
                              <span className={`${styles['fs-10']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>{attr.name}</span>
                            </div>
                          </Col>
                          {
                            attr.items.map(item => (
                              <Col key={item.id} md={3}>
                                <div className={`${styles['compare-product-spficication-inn']} ${styles['flex-center']} ${styles['flex-colum']} ${styles['fs-12']} ${styles.fontW600}`}>
                                  <span>{item.value.map(i => i.value).join(' ')} {item.value[0].qualifier_unit}</span>
                                </div>
                              </Col>
                            ))
                          }
                          {compareCount < 5 && <Col md={3} />}
                        </Row>
                      ))
                    }
                  </div>
                ) : null))
            }
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  compareInfo: selectors.getCompareInfo(store),
  brands: selectors.getBrandsInfo(store),
  productList: selectors.getProductList(store),
  cartButtonLoaders: cartSelectors.getCartButtonLoaders(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCompareItemsData: actionCreators.getCompareItemsData,
      getBrands: actionCreators.getBrands,
      removeCompareItem: actionCreators.removeCompareItem,
      getProducts: actionCreators.getProducts,
      addToCartAndFetch: cartActionCreators.addToCartAndFetch,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Compare);

/*
{
  compareCount: number,
  features: [
    {
      key: string,
      value: string
    }
    ...
  ],
  products: [
    {
      id: shortID,
      imgSrc: string,
      brand: string,
      price: string,
      currency: string,
      offer: string,
      name: string,
    }
  ],
  productsFeatures: [
    {
      name: string(cat-name),
      attributes: [{
        name: string(attr-name)
        items: [
          {
            value:  string(att-val)
          }
        ]
      }]
    }
  ]
}
*/
