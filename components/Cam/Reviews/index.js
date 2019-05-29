import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SVGCompoent from '../../common/SVGComponet';
import { actionCreators, selectors } from '../../../store/ratingReviews';
import constants from '../../../constants';
import lang from '../../../utils/language';
import { languageDefinations } from '../../../utils/lang/';
import StarRating from '../../common/StarRating';
import Button from '../../common/CommonButton';

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

  render() {
    const { userReviews } = this.props;
    return (
      <div className={`${styles.box} ${styles.flex} ${styles['flex-colum']} ${styles['my-review']}`}>
        <div className={`${styles['p-20-40']} ${styles['my-review-head']} ${styles['flex-center']}`}>
          <div className={`${styles.flex}`}>
            <SVGCompoent src="icons/illustration" clsName={styles.icon} />
          </div>
          <div className={`${styles['pl-30']}`}>
            <h3 className={`${styles['fs-22']} ${styles['m-0']}`}>My Reviews & Ratings</h3>
            <span className={`${styles['fs-12']} ${styles['dottes-gry-clr']}`}>All your reviews & ratings at one place</span>
          </div>
        </div>
        <div className={styles['my-review-inn']}>
          <h2 className={`${styles['fs-18']} ${styles['pt-15']} ${styles['pb-15']} ${styles['pl-40']} ${styles['bg-light-gray']}  ${styles['m-0']}`}>
            <span className={`${styles.fontW600}`}>You have Rated & Reviewed</span> <span className={`${styles['fs-12']}`}> {userReviews.length} items</span>
          </h2>
          <div>
            {userReviews.length > 0 &&
              userReviews.map(rev => (
                <div key={rev.review_id} className={`${styles['pl-15']} ${styles['pr-15']} ${styles['pt-15']} ${styles['flex-center']}`}>
                  <div>
                    <img className={styles.icon} alt="" src={`${constants.mediaDomain}/${rev.product_image_url}`} />
                  </div>
                  <div className={`${styles['pl-15']} ${styles['pr-15']} ${styles['pt-15']} ${styles['pb-30']} ${styles['border-b']} ${styles.width100}`}>
                    <div className={`${styles['pb-10']} ${styles['fs-14']} ${styles.fontW600}`}>{rev.title}</div>
                    <StarRating
                      interactive={false}
                      count={5}
                      rating={rev.ratings}
                      clsStyl={{ width: '15px', marginRight: '5px' }}
                    />
                    <div className={`${styles['pt-10']} ${styles['fs-12']} ${styles['dottes-gry-clr']}`}>{rev.comment}</div>
                    {!rev.comment &&
                      <Button
                        id={rev.review_id}
                        className={`${styles.flex} ${styles['preference-save']} ${styles.fontW600} ${styles['fs-10']} ${styles['text-uppercase']}`}
                        btnText="Write a review"
                        onClick={this.savePreferences}
                      />}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userReviews: selectors.getUserReviews(store),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getMyReviews: actionCreators.getMyReviews,
    // postPreferences: actionCreators.postPreferences,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

