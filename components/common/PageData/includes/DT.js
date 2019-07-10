import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import PageData from '../index';
import { Router } from '../../../../routes';
import constants from '../../../../constants';
import lang from '../../../../utils/language';
import SVGComponent from '../../../common/SVGComponet';
import { actionCreators, selectors } from '../../../../store/landing';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

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

  routeChange = (productId, catalogId, itemType) => {
    Router.pushRoute(`/${country}/${language}/product?productId=${productId}&catalogId=${catalogId}&itemType=${itemType}`);
  }

  render() {
    const { listingsData, content } = this.props;
    const { config = {}, data } = content;
    const listingsArr = _.chunk(listingsData, config.listing_ids_to_be_grouped);

    console.log('kjhv', listingsData);
    return (
      <div>
        {listingsArr.length > 0 && listingsArr.map((listings, index) => {
          return (
            <React.Fragment>
              <Row className={`${styles['mt-20']} ${styles['mb-20']}`}>
                <Col md={12} sm={12} xs={12} className={`${styles.flex} ${styles['flex-wrp']}`}>
                  {listings.length > 0 &&
                    listings.map(listing => (
                      <div key={listing.listingId} className={`${styles.flex} ${styles['pb-20']} ${styles['pr-40']}`} style={{ width: '20%' }}>
                        <div
                          className={`${styles.flex} ${styles['flex-colum']} ${styles.relative} ${styles['l-item']}`}
                          onClick={() => this.routeChange(listing.productId, listing.catalogId, listing.itemType)}
                        >
                          <div className={styles['l-img-container']}>
                            <img src={`${constants.mediaDomain}/${listing.image}`} className={styles['l-img']} alt={listing.image} />
                          </div>
                          <div className={`${styles['pl-10']} ${styles['pr-10']} ${styles['l-title']}`}><span className={`${styles.fontW600}`}>{listing.brand}</span> - {listing.name}</div>
                          <div className={`${styles['flx-space-bw']} ${styles['pl-10']} ${styles['pr-10']} ${styles['pb-30']} ${styles['pt-5']}`}>
                            <div>
                              <span className={`${styles['fs-12']} ${styles['pr-5']}`}>{listing.sellingPrice.currency_code}</span>
                              <span className={`${styles['fs-18']} ${styles.fontW600}`}>{listing.sellingPrice.display_value.split('.')[0]}.</span>
                              <span className={`${styles['fs-12']} ${styles.fontW600}`}>{listing.sellingPrice.display_value.split('.')[1]}</span>
                            </div>
                            <div className={styles.flex}>
                              <SVGComponent src="icons/cart/blue-cart-icon" clsName={styles['img-icon']} />
                            </div>
                          </div>
                        </div>
                      </div>
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
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getListings: actionCreators.getListings,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(DT);
