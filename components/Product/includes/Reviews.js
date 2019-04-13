import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeCss } from '../../../utils/cssUtil';
import { Grid, Row, Col, Tabs, Tab, ProgressBar } from 'react-bootstrap';
import Theme from '../../helpers/context/theme';
import { selectors, actionCreators } from '../../../store/product'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {Modal} from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
const styles = mergeCss('components/Product/product');
import {languageDefinations} from '../../../utils/lang';
const {PDP_PAGE} = languageDefinations();
import ReviewFeedBackModal from './reviewFeedbackModal'
import StarRating from '../../common/StarRating';
import AuthWrapper from '../../common/AuthWrapper';

class Review extends Component {
  state = {
    reviewData:[],
    openModal:false
  }

  componentDidMount() {
    const { catalogObj } = this.props
    const { catalog_id, product_id, item_type } = catalogObj
    let paramsobj = {
      catalog_id,
      product_id,
      item_type,
      ratings:0,
      page_no:0,
      most_recent:true,
      most_relevant:true,
      review_type:"USER"
    }
    this.props.getRatingsAndReviews(paramsobj)
  }
  componentWillReceiveProps(nextProps) {
    const { reviewData } = nextProps
    this.setState({reviewData})
  }
  toggleReviewModal = () => {
    this.setState((prevState) => ({
      openModal:!prevState.openModal
    }))
  }
  popupClosed = () => {
    this.setState({
      openModal:false
    })
  }
  submitUserReview = (reviewObj) => {
    this.setState({
      openModal:false
    }, () => this.props.submitUserReview(reviewObj))
  }

  renderReviewDetails = (reviewData,categoryType) => {
    return reviewData.map((data,i) => {
      return (
        <Col md={12} key={'review_'+i}>
          <Col md={4}>
            <div className={`${styles['mb-10']} ${styles['flex-center']}`}>
               <div className={`${styles['profile-img']} ${styles['flex']}`}>
                 <span></span>
               </div>
              <div className={`${styles['pl-20']} ${styles['thick-gry-clr']}`}>
                <h5 className={`${styles['mb-0']} ${styles['fontW600']}`}>{data.reviewer_name}</h5>
                <div className={`${styles['flex']} ${styles['review-start-inn']} ${styles['pb-10']}`}>
                  <StarRating
                    interactive={false}
                    count= {5}
                    rating={data.ratings}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col md={8} className={styles['p-0']}>
            <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>
              { data.comment }
            </p>
          </Col>
        </Col>
      )
    })
  }

  render() {
    const { reviewData, openModal } = this.state
    const { catalogObj } = this.props
    // if(!reviewData.length) {
    //   return <div> Fetching reviews for the product please wait....</div>
    // }

    return (
      <Theme.Consumer>
        {
          categoryType => (
            <div className={styles['review-main']}>
              <div className={`${styles['flex']} ${styles['pt-40']} ${styles['pb-40']}`}>
                <Col md={6} className={styles['thck-gry-rt-border']}>
                  <Col md={6} className={styles['t-c']}>
                  </Col>
                  <Col md={6}></Col>
                </Col>
                <Col md={6} className={styles['flex-center']}>
                    <Col md={6} className={styles['t-c']}>
                      <span>{PDP_PAGE.SHARE_EXPIERENCE}</span>
                    </Col>
                    <Col md={6} >
                      <div className={`${styles['flex']} ${styles['review-start']} ${styles['pb-10']}`}>
                        <StarRating interactive={false} total={5} />
                      </div>
                      <a
                      className={`${styles['fp-btn']} ${styles['fp-btn-default']}
                      ${styles['wrt-btn']} ${styles['small-btn']}`}
                      onClick={this.toggleReviewModal}
                      >
                      {PDP_PAGE.WRITE_REVIEW}
                     </a>
                  </Col>
                </Col>
                </div>
                <React.Fragment>
                  {
                    reviewData.length ? this.renderReviewDetails(reviewData,categoryType) : <div> {PDP_PAGE.NO_REVIEWS_AVAILABLE} </div>
                  }
                </React.Fragment>
                <div>
                  {
                    openModal ?
                    <AuthWrapper
                      popupClosed={this.popupClosed}
                      >
                      <Modal
                        {...this.props}
                        show={openModal}
                        onHide={this.toggleReviewModal}
                        dialogClassName="custom-modal"
                        >
                      <Modal.Header
                        closeButton
                        className={`${styles['modal-headerStyl']}`}
                      >
                        <Modal.Title>{PDP_PAGE.SHARE_YOUR_EXPERIENCE}</Modal.Title>
                      </Modal.Header>
                     <Modal.Body>
                       <ReviewFeedBackModal
                        catalogObj={catalogObj}
                        feedbackSubmit={this.submitUserReview}
                       />
                     </Modal.Body>
                    </Modal>
                  </AuthWrapper>
                  : null
                  }

                </div>
            </div>
          )
        }
      </Theme.Consumer>
    )
  }
}

const mapStateToProps = (store) => {
  return ({
    reviewData:selectors.getReviewRatings(store),
    reviewResponse:selectors.getReviewResponse(store)
  })
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators (
    {
      getRatingsAndReviews:actionCreators.getRatingsAndReviews,
      submitUserReview:actionCreators.submitUserReview
    },
    dispatch
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(Review);
