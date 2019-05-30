import React, { useState } from 'react';

import constants from '../../../constants';
import StarRating from '../../common/StarRating';
import Button from '../../common/CommonButton';
import SVGCompoent from '../../common/SVGComponet';
import ReviewThankYou from '../../Product/includes/ReviewThankYou';
import ReviewFeedBackModal from '../../Product/includes/reviewFeedbackModal';

import lang from '../../../utils/language';
import { languageDefinations } from '../../../utils/lang/';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './reviews_en.styl';
import styles_ar from './reviews_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { REVIEWS } = languageDefinations();


const Review = ({ rev, deleteReview, submitUserReview }) => {
  const [openModal, setModal] = useState(false);
  const [showReviews, setReviews] = useState(true);

  const catalogObj = {
    catalog_id: rev.catalog_id,
    product_id: rev.product_id,
    variant_id: rev.variant_id,
    review_id: rev.review_id,
  };

  const titleInfo = {
    title: rev.title,
    media: rev.product_image_url,
  };

  const postUserReview = (reviewObj) => {
    submitUserReview(reviewObj).then(() => {
      setReviews(false);
    });
  };

  return (
    <div key={rev.review_id} className={`${styles.relative} ${styles.review} ${styles['pl-15']} ${styles['pr-15']} ${styles['pt-15']} ${styles['flex-center']}`}>
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
            onClick={() => setModal(true)}
          />}
      </div>
      <div className={`${styles.absolute} ${styles.right30P} ${styles['icon-pos']}`}>
        <a data-id={rev.review_id} className={`${styles.flex}`} onClick={deleteReview}>
          <SVGCompoent src="icons/delete-icon/delete-icon" clsName={styles['del-icon']} />
        </a>
        <a data-id={rev.review_id} className={`${styles.flex} ${styles['ml-10']}`} onClick={() => setModal(true)}>
          <SVGCompoent src="icons/edit-icon/edit-icon" clsName={styles['del-icon']} />
        </a>
      </div>
      <div>
        {openModal ?
          <React.Fragment>
            <div onClick={() => setModal(false)} className={openModal ? `${styles.modalContainer} ${styles.showDiv}` : `${styles.modalContainer} ${styles.hideDiv}`}>
              <div className={`${styles.disabled}`} />
            </div>
            <div className={`${styles['overflow-y-auto']} ${styles['p-30']} ${openModal ? `${styles.openModal}` : `${styles.closeModal}`}`}>
              <div className={styles['p-40']}>
                <h4 className={`${styles.flex} ${styles['justify-flex-end']} ${styles['m-0']} ${styles['mb-20']}`}>
                  <a onClick={() => setModal(false)} href className={`${styles['fs-22']} ${styles['black-color']}`}>X</a>
                </h4>
                <div>
                  {showReviews ?
                    <ReviewFeedBackModal
                      catalogObj={catalogObj}
                      rating={rev.ratings}
                      comment={rev.comment}
                      titleInfo={titleInfo}
                      feedbackSubmit={postUserReview}
                    />
                    :
                    <ReviewThankYou closePopup={() => setModal(false)} />
                  }
                </div>
              </div>
            </div>
          </React.Fragment>
          : null
        }
      </div>
    </div>
  );
}

export default Review;
