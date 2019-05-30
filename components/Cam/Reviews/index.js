import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SVGCompoent from '../../common/SVGComponet';
import { actionCreators, selectors } from '../../../store/ratingReviews';
import { actionCreators as productActionCreators } from '../../../store/product';
import { selectors as personalDetailsSelectors } from '../../../store/cam/personalDetails';
import constants from '../../../constants';
import lang from '../../../utils/language';
import { languageDefinations } from '../../../utils/lang/';
import StarRating from '../../common/StarRating';
import Button from '../../common/CommonButton';
import Review from './Review';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './reviews_en.styl';
import styles_ar from './reviews_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { REVIEWS } = languageDefinations();

class Reviews extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getMyReviews();
  }

  deleteReview = ({ currentTarget }) => {
    this.props.deleteReview(currentTarget.getAttribute('data-id'));
  }

  submitUserReview = (review) => {
    const { userInfo } = this.props;
    return this.props.submitUserReview({
      ...review,
      reviewer_name: userInfo.personalInfo.user_name,
    });
  }

  render() {
    const { userReviews } = this.props;
    return (
      <div className={`${styles.box} ${styles.flex} ${styles['flex-colum']} ${styles['my-review']}`}>
        <div className={`${styles['p-20-40']} ${styles['my-review-head']} ${styles['flex-center']}`}>
          <div className={`${styles.flex}`}>
            <SVGCompoent src="icons/illustration" clsName={styles.icon} />
          </div>
          <div className={`${styles['pl-30']}`}>
            <h3 className={`${styles['fs-22']} ${styles['m-0']}`}>{REVIEWS.TITLE}</h3>
            <span className={`${styles['fs-12']} ${styles['dottes-gry-clr']}`}>{REVIEWS.SUB_TITLE}</span>
          </div>
        </div>
        <div className={styles['my-review-inn']}>
          <h2 className={`${styles['fs-18']} ${styles['pt-15']} ${styles['pb-15']} ${styles['pl-40']} ${styles['bg-light-gray']}  ${styles['m-0']}`}>
            <span className={`${styles.fontW600}`}>{REVIEWS.RATED_REVIEWS}</span> <span className={`${styles['fs-12']}`}> {userReviews.length} {REVIEWS.ITEMS}</span>
          </h2>
          <div>
            {userReviews.length > 0 &&
              userReviews.map(rev => (
                <Review rev={rev} deleteReview={this.deleteReview} submitUserReview={this.submitUserReview} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userReviews: selectors.getUserReviews(store),
  userInfo: personalDetailsSelectors.getUserInfo(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getMyReviews: actionCreators.getMyReviews,
    deleteReview: actionCreators.deleteReview,
    submitUserReview: productActionCreators.submitUserReview,
    // postPreferences: actionCreators.postPreferences,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

