import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../../store/ratingReviews';
import constants from '../../../constants';
import lang from '../../../utils/language';
import { languageDefinations } from '../../../utils/lang/';
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
      <div className={`${styles.box} ${styles.flex} ${styles['flex-colum']}`}>
        <div>
          <h2 className={`${styles['fs-18']}`}><span className={`${styles.fontW600}`}>You have Rated & Reviewed</span> <span className={`${styles['fs-12']}`}> {userReviews.length} items</span></h2>
          <div>
            {userReviews.length > 0 &&
              userReviews.map(rev => (
                <div>
                  <div>
                    <img className={styles.img} alt="" src={`${constants.mediaDomain}/${rev.images}`} />
                  </div>
                  <div>
                    <div>{rev.comment}</div>
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

