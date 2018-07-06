import React, { Fragment } from 'react';
import { languageDefinations } from '../../../utils/lang/';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Blocker from '../../common/Blocker';
import CartStepper from './CartStepper';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cart/cart');

const MiniCartBody = props => {
  const { showBlocker, increaseItemCnt, decreaseItemCnt, data, removeCartItem, editCartDetails } = props;
  const { items, error } = data;
  const flag = data && items && items.length;
  const cnt = flag > 0 ? items.length : 0;
  const { CART_PAGE } = languageDefinations();

  return (
    <div className={`${styles['cart-container']} ${styles['mini-cart']} ${styles['p-20']} ${styles['border-t']}`}>
      {
        showBlocker ? <Blocker /> : ''
      }
      <div>
        <h5>
          <span>{cnt + ' Items'}</span>
        </h5>
      </div>
      <div>
        {
          items.map((item, index) => {
            const { item_id, img, name, price, cur, quantity, max_limit, inventory, brand_name } = item;
            return (
              <Row key={item_id}>
                <Col md={2}>
                  <img style={{ height: '50px' }} className={styles['img']} src={img} />
                </Col>
                <Col md={10}>
                  <h6 className={`${styles['m-0']}`}>{name}</h6>
                  {
                    editCartDetails
                      ?
                      <div id={item_id} onClick={removeCartItem}><a className={styles['fs-12']}>Remove</a></div>
                      : null
                  }
                  <div className={`${styles['flx-space-bw']}`}>
                    <div>{price + ' ' + cur}</div>
                    <div>
                      {
                        editCartDetails ?
                          <CartStepper
                            item={item}
                            decreaseItemCnt={decreaseItemCnt}
                            increaseItemCnt={increaseItemCnt}
                          />
                          : ''
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            )
          })
        }
      </div>
    </div>
  );
};

MiniCartBody.propTypes = {
  removeCartItem: PropTypes.func.isRequired,
  decreaseItemCnt: PropTypes.func.isRequired,
  increaseItemCnt: PropTypes.func.isRequired,
  showBlocker: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

MiniCartBody.defaultProps = {

};

export default MiniCartBody;