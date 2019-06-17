import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/product'
import lang from '../../../utils/language'
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './quickview_en.styl';
import styles_ar from './quickview_ar.styl';
import QuickViewContent from './quickView'

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class RenderResults extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      animationClass: ''
    }
  }
  scrollToRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  componentDidMount() {
    const { options, getProduct } = this.props

    getProduct(options)
    setTimeout(() => {
      this.setState({
        animationClass: 'animationClass'
      });
    }, 50);

    this.myRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps',nextProps.productId);
    if(nextProps.renderQuickView
      &&
      nextProps.productId !== this.props.productId
    ){

      this.props.getProduct(nextProps.options)
    }
  }

  render() {
    const
    { renderQuickView,
      elementNo,
      index,
      getLoadingStatus,
      getErrorMessage,
      prev,
      next,
      productVariantId,
      productId,
      onClose,
      renderProductPage
    } = this.props;
    const {
      animationClass
    } = this.state;
    return (
      <div
        ref={this.myRef}
        className={`${styles['render-view-main']} ${styles[animationClass]}`}
      >
        <QuickViewContent
          prev={prev}
          next={next}
          onClose={onClose}
          productVariantId={productVariantId}
          productId={productId}
          renderProductPage={renderProductPage}
        >
        </QuickViewContent>
      </div>
    )

  }
}
const mapStateToProps = (store) => {
  return ({
    getLoadingStatus:selectors.getLoadingStatus(store),
    getErrorMessage:selectors.getErrorMessage(store),
  })
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProduct:actionCreators.getProduct
    },
    dispatch
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(RenderResults)
