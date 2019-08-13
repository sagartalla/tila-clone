import React from 'react';
import { bindActionCreators } from 'redux';
import { NextSeo } from 'next-seo';
import withRedux from 'next-redux-wrapper';
import Cookies from 'universal-cookie';
import lang from '../utils/language';
import { languageDefinations } from '../utils/lang';
import Base, { baseActions } from './base';
import makeStore from '../store';
import { actionCreators } from '../store/product';
import { actionCreators as MegamenuActionsCreators } from '../store/megamenu';
// import { actionCreators as reviewRatingActionCreators } from '../store/ratingReviews';

import Layout from '../layout/main';
import getProductComponent from '../components/Product';

import main_en from '../layout/main/main_en.styl';
import main_ar from '../layout/main/main_ar.styl';
import styles_en from '../components/Product/product_en.styl';
import styles_ar from '../components/Product/product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { SEO_CONTENT } = languageDefinations();

const cookies = new Cookies();

class ProductPage extends Base {
  constructor(props) {
    super(props);
    this.product = getProductComponent(this.props.url.query.isPreview, this.props.url.query.taskCode);
  }
  static async getInitialProps({
    store, query, isServer, req,
  }) {
    
    const { country, language } = query;
    const shippingData = req ? req.universalCookies.get('shippingInfo') : cookies.get('shippingInfo');
    const { city: shippingCity, country: shippingCountry } = shippingData || {};
    const {
      pid, vid, cid,
    } = query;
    const productId = pid;
    // if (taskCode) {
    //   await store.dispatch(actionCreators.getPreview({
    //     taskCode,
    //     itemType,
    //     accessToken: req.universalCookies.get('accessToken'),
    //   }));
    // } else {
    const options = {
      city_code: shippingCity,
      country_code: country || 'SAU',
      flags: {
        catalog_details: true,
        category_tree_bread_crumb: true,
        category_tree_finance: true,
        include_offers: true,
        include_policies: true,
        include_related_products: true,
        shipping: true,
      },
      language,
      product_ids: [
        productId,
      ],
      size: 'LARGE',
    };

      // if (variantId) {
      //   options.variant_ids = [
      //     variantId,
      //   ];
      // }

    await Promise.all([
      store.dispatch(actionCreators.getProduct(options)),
      store.dispatch(MegamenuActionsCreators.getMegamenu()),
      // TODO  SF-96
      // await store.dispatch(reviewRatingActionCreators.getRatingsAndReviews({
      //   itemType: query.itemType,
      //   catalogId: query.catalogId
      // }))
    ]);
    // }
    return { isServer };
  }

  pageName = 'PRODUCT';

  render() {
    const Product = this.product;
    const { url, loaderProps, allState } = this.props;
    const { pid: productId, vid: variantId } = url.query;
    return (
      <div>
        <NextSeo
          title={`${SEO_CONTENT.PDP_H2} ${allState.productReducer && allState.productReducer.data && allState.productReducer.data[0].product_details && allState.productReducer.data[0].product_details.product_details_vo && allState.productReducer.data[0].product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value} ${SEO_CONTENT.PDP_H2_TITLE}`}
          description={`${allState.productReducer && allState.productReducer.data && allState.productReducer.data[0].product_details && allState.productReducer.data[0].product_details.product_details_vo && allState.productReducer.data[0].product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value} ${SEO_CONTENT.PDP_META_CONTENT} ${SEO_CONTENT.PDP_META_CONTENT2}`}
          openGraph={{
            title: `${SEO_CONTENT.PDP_H2}``${allState.productReducer && allState.productReducer.data && allState.productReducer.data[0].product_details && allState.productReducer.data[0].product_details.product_details_vo && allState.productReducer.data[0].product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value}``${SEO_CONTENT.PDP_H2_TITLE}`,
            site_name: 'Tila',
            description: `${SEO_CONTENT.PDP_META_CONTENT}``${allState.productReducer && allState.productReducer.data && allState.productReducer.data[0].product_details && allState.productReducer.data[0].product_details.product_details_vo && allState.productReducer.data[0].product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value}``${SEO_CONTENT.PDP_META_CONTENT2}`,
            fb_app_id: '',
            locale: 'en_SA',
            locale_ar: 'ar_SA',
            type: 'website',
            image: 'logo image url',
          }}
        />
        <h1 className={`${styles.display_none}`}>{allState.productReducer && allState.productReducer.data && allState.productReducer.data[0].product_details && allState.productReducer.data[0].product_details.product_details_vo && allState.productReducer.data[0].product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value}</h1>
        <Layout>
          <Product
            variantId={variantId}
            productId={productId}
            loaderProps={loaderProps}
          />
        </Layout>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  allState: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...baseActions,
      getProduct: actionCreators.getProduct,
      getPreview: actionCreators.getPreview,
    },
    dispatch,
  );

export default withRedux(makeStore, mapStatetoProps, mapDispatchToProps)(ProductPage);
