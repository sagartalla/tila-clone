import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import Card from './Card';
import PageData from '../index';
import lang from '../../../../utils/language';
import { ftbSkeletonLoader } from '../../../common/Loader/skeletonPlaceHolder';
import { actionCreators, selectors } from '../../../../store/landing';
import { actionCreators as authActionCreators, selectors as authSelectors } from '../../../../store/auth';
import { actionCreators as cartActionCreators, selectors as cartSelectors } from '../../../../store/cart';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };


class DT extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { content, getListings } = this.props;
    if (content.data && content.data.listing_ids) {
      getListings(content.data.listing_ids[lang]);
    }
  }

  addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const pId = e.currentTarget.getAttribute('data-pId');
    const lId = e.currentTarget.getAttribute('data-lId');
    const isAddedToCart = e.currentTarget.getAttribute('data-isAddedToCart');
    const { addToCartAndFetch } = this.props;
    if (isAddedToCart === 'false') {
      addToCartAndFetch({
        listing_id: lId,
        product_id: pId,
      });
    }
  }

  render() {
    const {
      listingsData = [], content, isLoggedIn, showLoginScreen, isListingLoading,
    } = this.props;
    const { config = {}, data } = content;
    const listingsArr = _.chunk(listingsData, config.listing_ids_to_be_grouped);
    return (
      <div className={styles['mt-20']}>
        {isListingLoading && listingsData.length === 0 ? ftbSkeletonLoader : ''}
        {!isLoggedIn &&
          <div className={`${styles['mb-20']} ${styles['mt-20']} ${styles.width100} ${styles.pointer}`} onClick={showLoginScreen}>
            <img src="/static/img/icons/login-ftb.png" alt="" width="100%" />
          </div>}
        {listingsArr.length > 0 && listingsArr.map((listings, index) => {
          return (
            <React.Fragment>
              <Row className={`${styles['mb-20']} ${styles['mt-20']}`}>
                <Col md={12} sm={12} xs={12} className={`${styles.flex} ${styles['flex-wrp']}`}>
                  {listings.length > 0 &&
                    listings.map(listing => (
                      <Card listing={listing} isLoggedIn={isLoggedIn} addToCart={this.addToCart} />
                    ))}
                </Col>
              </Row>
              {data.banner_set[index] && <PageData content={data.banner_set[index]} />}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  listingsData: selectors.getListings(store),
  isListingLoading: selectors.getIsListingLoading(store),
  isLoggedIn: authSelectors.getLoggedInStatus(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getListings: actionCreators.getListings,
    addToCartAndFetch: cartActionCreators.addToCartAndFetch,
    showLoginScreen: authActionCreators.showLoginScreen,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(DT);
