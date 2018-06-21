import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../store/ratingReviews';

import { TABS } from './constants';

import styles from './ReviewRatings.styl'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const { activeTab } = this.state;
    const { isLoading, userReviews } = this.props;
    return (
      isLoading
      ?
      'Loading Reviews...'
      :
      <div>
        <div className={styles['tabs-container']}>
          {
            TABS.map(tab => <div className={`${styles['tab-item']} ${tab.id === activeTab ? styles['active'] : ''}`}>tab.label</div> )
          }
        </div>
        <div className={styles['reviews-content']}>
          <Grid>
            {
              userReviews.map((userReview) => {
                return (
                  <Row>
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
