import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { selectors, actionCreators } from '../../store/ratingReviews';

import { TABS } from './constants';

import { mergeCss } from '../../utils/cssUtil';
const styles = mergeCss('components/RatingReviews/ratingReviews');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onTabClick = this.onTabClick.bind(this);
    this.selectRating = this.selectRating.bind(this);
  }

  componentDidMount() {
    const { getRatingsAndReviews } = this.props;
    getRatingsAndReviews();
  }

  onTabClick(e) {
    const { getRatingsAndReviews } = this.props;
    getRatingsAndReviews({
      [TABS[e.target['data-id']].param]: true
    })
  }

  selectRating(e) {
    const { getRatingsAndReviews } = this.props;
    getRatingsAndReviews({
      ratings: e.target.value
    });
  }

  render() {
    const { activeTab } = this.state;
    const { isLoading, userReviews } = this.props;
    return (
      isLoading
      ?
      'Loading Reviews...'
      :
      <div className={styles['rating-review-cont']}>
        <div className={styles['header-bar']}>
          <div className={`${styles['tabs-container']} ${styles['float-l']}`}>
            {
              _.map(TABS, (tab, key) => <div data-id={key} key={tab.label} onClick={this.onTabClick} className={`${styles['tab-item']} ${styles['p-10']} ${tab.id === activeTab ? styles['active'] : ''}`}>{tab.label}</div> )
            }
          </div>
          <div className={styles['float-r']}>
            <div className={styles['p-10']}>
              <label for="rating-filter" >Filter By</label>
              <select id="rating-filter" onChange={this.selectRating}>
                <option>All Starts</option>
                {
                  [1, 2, 3, 4, 5].map((n) => <option value={n}> {n} Start</option>)
                }
              </select>
            </div>
          </div>
        </div>
        <div className={styles['reviews-content']}>
          <Grid>
            {
              userReviews.length
              ?
              'No Reviews'
              :
              userReviews.map((userReview) => {
                return (
                  <Row key={userReview.uniqId}>
                    <Col md={2}>
                      <div>{userReview.reviewerName}</div>
                      <div>{userReview.rating}</div>
                      {
                        userReview.certifiedBuyer
                        ?
                        <div>Certified Buyer</div>
                        :
                        null
                      }
                    </Col>
                    <Col md={8}>
                      <div>{userReview.date}</div>
                      <div>{userReview.comment}</div>
                    </Col>
                    <Col md={2}>
                      <div>{userReview.likes} like</div>
                      <div>{userReview.dislikes} dislike</div>
                    </Col>
                  </Row>
                )
              })
            }
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  console.log(selectors);
  return ({
    userReviews: selectors.getReviewsRatings(store),
    isLoading: selectors.isLoading(store),
  });
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRatingsAndReviews: actionCreators.getRatingsAndReviews
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
