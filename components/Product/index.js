import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import NoSSR from 'react-no-ssr';
import PropTypes from 'prop-types';

import selectors from '../../store/product/selectors'
import HeaderBar from '../HeaderBar/index';
import Dispalay from './Display';
import TitleInfo from './TitleInfo';
import KeyFeatures from './KeyFeatures';
import Variants from './Variants';
import Catalog from './Catalog';

import styles from './product.styl';

// Dummy data start 

// const imgUrls = [
//   'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyysgmypxmazk.jpeg', 
//   'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyzyf8dyfgaaq.jpeg', 
//   'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyzzw2zrxkwug.jpeg', 
//   'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyzzw2zrxkwug.jpeg', 
//   'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyysge4tu4gva.jpeg',
//   'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyzzw2zrxkwug.jpeg', 
// ];

// const kf = [
//   '| 64.00 GB |',
//   '12MP Rear Camera | 7MP Front Camera',
//   'A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor',
// ] 

// const variants = [
//   {
//     title: 'Storage',
//     options: ['64 GB', '32 GB'],
//   },
//   {
//     title: 'Color',
//     options: ['Black', 'Grey'],
//   }
// ];

// Dummy data section END

const Product = ({productData}) => {
  const { catalog, titleInfo, keyfeatures, imgUrls } = productData;
  return (
    <div>
      <HeaderBar />
      <Grid>
        <Row>
          <Col xs={12} md={5}>
            <Dispalay imgs={imgUrls}/>
          </Col>
          <Col xs={12} md={7}>
            <TitleInfo {...titleInfo} />
            <KeyFeatures features={keyfeatures} />
            <NoSSR>
              {/* <div>
                {
                  variants.map((variant) => {
                    return <Variants {...variant} />;
                  })
                }
              </div> */}
              <Variants />
            </NoSSR>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Catalog catalog={catalog}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div><b>Compare</b></div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div><b>Accessories</b></div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div><b>Frequently Bought Together</b></div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div><b>Rating and Reviews</b></div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (store) => ({
  productData: selectors.getProduct(store)
});


Product.propTypes = {
  productData: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(Product);
