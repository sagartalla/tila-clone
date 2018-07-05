// params: { columnIndex, key, rowIndex, style }
import { Link } from '../../../routes';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Waypoint from 'react-waypoint';
import constants from '../../../constants';
import { Grid, Row, Col } from 'react-bootstrap';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Search/search');

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setImg = this.setImg.bind(this);
  }

  setImg() {
    const { media = []} = this.props;
    this.setState({
      style: { backgroundImage: `url(${constants.mediaDomain}/${media[0]})` }
    });
  }

  render() {
    const {
      media = [],
      displayName,
      variants,
      productId,
      catalogId,
      itemtype,
      priceRange,
    } = this.props;
    return (
      <Link route={`/product?productId=${productId}&catalogId=${catalogId}&itemType=${itemtype}`}>
        <Col md={3} xs={12} className={`${styles['pr-0']} ${styles['pb-25']} ${styles['product-items']}`}>
          <div className={`${styles['img-cont']} ${styles['p-20']}`}>
            <Waypoint onEnter={this.setImg}>
              <div style={this.state.style} className={styles['image-div']} />
            </Waypoint>
          </div>
          <div className={styles['desc-cont']}>
            <div className={`${styles['prdt-name']} ${styles['fs-12']} ${styles['pt-15']} ${styles['pb-5']}`}><a href="#">{displayName}</a></div>
            <div>{priceRange}</div>
            <div className={styles['variant-info']}>
              {
                _.map(variants, (variantValues, key) => <div key={key}>{`${key} : ${variantValues.join(', ')}`}</div>)
              }
            </div>
          </div>
        </Col>
      </Link>
    );
  }
}

Product.propTypes = {
  media: PropTypes.array.isRequired,
  displayName: PropTypes.array.isRequired,
  variants: PropTypes.object.isRequired,
}


export default Product;
