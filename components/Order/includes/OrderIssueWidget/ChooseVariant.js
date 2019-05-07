import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { selectors, actionCreators } from '../../../../store/order';
import { languageDefinations } from '../../../../utils/lang';

import lang from '../../../../utils/language';

import styles_en from './orderIssue_en.styl';
import styles_ar from './orderIssue_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const { ORDER_PAGE } = languageDefinations();

class ChooseVariant extends Component {
  constructor(props) {
    super(props)
    this.selectVariant = this.selectVariant.bind(this);
    this.renderExchangeVariants = this.renderExchangeVariants.bind(this)
    this.selectedSize = this.selectedSize.bind(this)
    this.sizeNotAvailable = this.sizeNotAvailable.bind(this)
    this.state = {
      message: 'emptyMsg'
    }
  }

  selectVariant(e) {
    const variantAttrKey = e.target.id;
    const variantAttrValue = e.target.value;
    const { exchangeOptions: computedExchangeOptions } = this.props;
    if(variantAttrValue  !== '') {
      this.props.setVariantOption({
        variantAttrKey,
        variantAttrValue,
        computedExchangeOptions,
      });
    }
  }

  componentDidMount() {
    const { orderIssue,variantId } = this.props;
    const { exchangeVariants } = orderIssue;

    // getExchangeVariants({
    //   orderItemId: selectedItem.id
    // });
  }
  sizeNotAvailable() {
    this.setState({
      message:'errorMsg'
    },() => {
      this.props.productNotAvailable()
    })
  }
  choosedVariant = (listing) => () => {
    const {listing_id,variant_id } = listing

    this.setState({
      message:'successMsg'
    }, () => {
      this.props.selectedVariant({listing_id,variant_id})
    })
  }
  selectedSize(variantId,exchangeVariants) {
    const data = exchangeVariants.filter((el,index) => {
      return el.listing.variant_id === variantId
    })
    return  data[0].variant_details.attribute_map.size.attribute_values[0].value
  }
  renderExchangeVariants(variants) {
    const data = variants.map((el,index) => {
      if(el.listing.total_inventory_count > 0) {
        return <li key={'variant_'+index}
          className={`${el.listing.total_inventory_count > 0 ? styles['productSize-Button'] : styles['product-StrikeButton']}`}
          onClick={el.listing.total_inventory_count > 0 ? this.choosedVariant(el.listing) : this.sizeNotAvailable}
          >
          {el.variant_details.attribute_map && el.variant_details.attribute_map.size && el.variant_details.attribute_map.size.attribute_values[0].value}
        </li>
      }
    })

    return data;
  }
  render() {
    const { orderIssue,variantId } = this.props;
    const { exchangeVariants } = orderIssue;
    const { message } = this.state;
    return (
      <div className={styles['exchange-items']}>

        <div className={styles['pb-10']}>
          <h5 className={`${styles['fontW600']} ${styles['m-0']}`}>{ORDER_PAGE.SIZE_TO_EXCHANGE} :</h5>
          <span className={`${styles['fs-12']} ${styles['textColor']}`}>
            {ORDER_PAGE.SIZE_NOT_AVALABLE}
          </span>
        </div>
        {
          Object.keys(exchangeVariants[0].variant_details.attribute_map).length > 0 &&
          <ul className={`${styles['flex']} ${styles['product-sizeContainer']}`}>
            { this.renderExchangeVariants(exchangeVariants) }
          </ul>
        }
        <div>
          {{
            errorMsg: <p className={`${styles['error-msg']} ${styles['fs-12']}`}>{ORDER_PAGE.SELECTED_SIZE_NOT_AVAILABLE}
          </p>,
          successMsg : <p className={`${styles['success-msg']} ${styles['fs-12']}`}>
            {ORDER_PAGE.SELECTED_SIZE_AVAILABLE_FOR_EXCHANGE}
          </p>,
          emptyMsg: '',
          }[message]}
        </div>
      </div>
    );
  }
}

ChooseVariant.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  getExchangeVariants: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
}

const mapStateToProps = (store) => {
	return ({
    orderIssue: selectors.getOrderIssue(store),
  })
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
      getExchangeVariants: actionCreators.getExchangeVariants,
      setVariantOption: actionCreators.setVariantOption
    },
		dispatch,
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseVariant);


// exchangeOptions: selectors.getExchangeOptions(store),
// <div>
//   <div>{ORDER_PAGE.SELECT_TYPE_EXCHANGE}</div>
//   {
//     _.map(variantDetails, (value, key) => (
//       <div>
//         <label for={key}>{value.name}</label>
//         <select id={key} key={key} onChange={this.selectVariant}>
//           <option value={''}>{ORDER_PAGE.SELECT_VARIANT}</option>
//           {
//             value.attrValues.map((value, index) => <option key={value} value={value}>{value}</option>)
//           }
//         </select>
//       </div>
//     ))
//   }
// </div>

// {/* <span className={`${styles['fontW600']} ${styles['pt-15']} ${styles['pb-15']} ${styles['flex']}`}>
//           {Object.keys(exchangeVariants[0].variant_details.attribute_map).length > 0 ? `Order Size : ${this.selectedSize(variantId,exchangeVariants)}`: null}
//         </span> */}
