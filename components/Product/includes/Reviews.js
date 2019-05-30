import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Theme from '../../helpers/context/theme';
import { selectors, actionCreators } from '../../../store/product';
import { selectors as personalDetailsSelectors } from '../../../store/cam/personalDetails';
import ReviewThankYou from './ReviewThankYou';
import { languageDefinations } from '../../../utils/lang';
import ReviewFeedBackModal from './reviewFeedbackModal';
import StarRating from '../../common/StarRating';
import AuthWrapper from '../../common/AuthWrapper';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const { PDP_PAGE } = languageDefinations();


const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class Review extends Component {
  state = {
    reviewData: [],
    openModal: false,
    showReviews: false,
  }

  componentDidMount() {
    const { catalogObj } = this.props;
    const { catalog_id, product_id, item_type } = catalogObj;
    let paramsobj = {
      catalog_id,
      product_id,
      item_type,
      ratings: 0,
      page_no: 0,
      most_recent: true,
      most_relevant: true,
      review_type: 'USER',
    };
    this.props.getRatingsAndReviews(paramsobj);
  }
  componentWillReceiveProps(nextProps) {
    const { reviewData } = nextProps;
    this.setState({ reviewData });
  }
  toggleReviewModal = () => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      showReviews: true,
    }));
  }
  popupClosed = () => {
    this.setState({
      openModal: true,
    });
  }
  popupOpened = () => {
    this.setState({
      openModal: false,
    });
  }
  submituserreview = (reviewObj) => {
    const { userInfo } = this.props;
    this.props.submitUserReview({
      ...reviewObj,
      reviewer_name: userInfo.personalInfo.user_name,      
    }).then(() => {
      this.setState({
        showReviews: false,
      });
    });
  }

  renderReviewDetails = (reviewData, categoryType) => {
    return reviewData.map((data, i) => {
      return (
        <Col md={12} key={'review_' + i}>
          <Col md={4}>
            <div className={`${styles['mb-10']} ${styles['flex-center']}`}>
              <div className={`${styles['profile-img']} ${styles['flex']}`}>
                <span></span>
              </div>
              <div className={`${styles['pl-20']} ${styles['thick-gry-clr']}`}>
                <h5 className={`${styles['mb-0']} ${styles['fontW600']}`}>{data.reviewer_name}</h5>
                <div className={`${styles['flex']} ${styles['review-start-inn']} ${styles['pb-5']} ${styles['pt-5']}`}>
                  <StarRating
                    interactive={false}
                    count={5}
                    rating={data.ratings}
                    clsStyl={{ width: '15px', marginRight: '5px' }}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col md={8} className={styles['p-0']}>
            <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>
              {data.comment}
            </p>
          </Col>
        </Col>
      );
    });
  }

  render() {
    const { reviewData, openModal, showReviews } = this.state;
    const { catalogObj, titleInfo } = this.props;
    // if(!reviewData.length) {
    //   return <div> Fetching reviews for the product please wait....</div>
    // }

    return (
      <Theme.Consumer>
        {
          categoryType => (
            <div className={`${styles['review-main']}`}>
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
                      className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['wrt-btn']} ${styles['small-btn']}`}
                      onClick={this.toggleReviewModal}
                    >
                      {PDP_PAGE.WRITE_REVIEW}
                    </a>
                  </Col>
                </Col>
              </div>
              <React.Fragment>
                {
                  reviewData.length ? this.renderReviewDetails(reviewData, categoryType) : <div> {PDP_PAGE.NO_REVIEWS_AVAILABLE} </div>
                }
              </React.Fragment>
              <div>
                {
                  openModal ?
                    // <AuthWrapper
                    //   popupClosed={this.popupClosed}
                    //   >
                    //     <Modal
                    //       {...this.props}
                    //       show={openModal}
                    //       onHide={this.toggleReviewModal}
                    //       dialogClassName="custom-modal"
                    //       >
                    //     <Modal.Header
                    //       closeButton
                    //       className={`${styles['modal-headerStyl']}`}
                    //     >
                    //       <Modal.Title>{PDP_PAGE.SHARE_YOUR_EXPERIENCE}</Modal.Title>
                    //     </Modal.Header>
                    //    <Modal.Body>
                    //      <ReviewFeedBackModal
                    //       catalogObj={catalogObj}
                    //       feedbackSubmit={this.submituserreview}
                    //      />
                    //    </Modal.Body>
                    //   </Modal>
                    // </AuthWrapper>
                    <React.Fragment>
                      <AuthWrapper
                        popupClosed={this.popupClosed}
                        popupOpened={this.popupOpened}
                      >
                        <div onClick={this.closeSlider} className={openModal ? `${styles['modalContainer']} ${styles['showDiv']}` : `${styles['modalContainer']} ${styles['hideDiv']}`}>
                          <div className={`${styles['disabled']}`} />
                        </div>
                        <div className={`${styles['overflow-y-auto']} ${styles['p-30']} ${openModal ? `${styles['openModal']}` : `${styles['closeModal']}`}`}>
                          <div className={styles['p-40']}>
                            <h4 className={`${styles['flex']} ${styles['justify-flex-end']} ${styles['m-0']} ${styles['mb-20']}`}>
                              <a onClick={this.toggleReviewModal} className={`${styles['fs-22']} ${styles['black-color']}`}>X</a>
                            </h4>
                            <div>
                              {showReviews ?
                                <ReviewFeedBackModal
                                  catalogObj={catalogObj}
                                  titleInfo={titleInfo}
                                  feedbackSubmit={this.submituserreview}
                                />
                                :
                                <ReviewThankYou closePopup={this.popupClosed} />
                              }
                            </div>
                          </div>
                        </div>
                      </AuthWrapper>
                    </React.Fragment>

                    : null
                }
              </div>
            </div>
          )
        }
      </Theme.Consumer>
    );
  }
}

const mapStateToProps = store => ({
  reviewData: selectors.getReviewRatings(store),
  reviewResponse: selectors.getReviewResponse(store),
  userInfo: personalDetailsSelectors.getUserInfo(store),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRatingsAndReviews: actionCreators.getRatingsAndReviews,
  submitUserReview: actionCreators.submitUserReview,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Review);
