import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import constants from '../../../constants';
import StarRating from '../../common/StarRating';
import Button from '../../common/CommonButton';
import SVGCompoent from '../../common/SVGComponet';
import ReviewThankYou from '../../Product/includes/ReviewThankYou';
import ReviewFeedBackModal from '../../Product/includes/reviewFeedbackModal';
import { actionCreators, selectors } from '../../../store/product';
import { selectors as personalDetailsSelectors } from '../../../store/cam/personalDetails'
import lang from '../../../utils/language';
import { languageDefinations } from '../../../utils/lang/';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './reviews_en.styl';
import styles_ar from './reviews_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { REVIEWS } = languageDefinations();


const Review = ({ rev, deleteReview, submitUserReview, setReviewImages, userInfo, documentId, downloadPic}) => {
  const [openModal, setModal] = useState(false);
  const [showReviews, setReviews] = useState(true);

  const catalogObj = {
    catalog_id: rev.catalog_id,
    product_id: rev.product_id,
    variant_id: rev.variant_id,
    review_id: rev.review_id,
    item_type: rev.item_type,
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

  const closeModal = () => {
    document.getElementsByTagName('BODY')[0].style.overflow = 'auto';
    setModal(false);
    setReviews(true);
  };

  const showModal = () => {
    document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    setModal(true);
  };

  return (
    <div key={rev.review_id} className={`${styles.relative} ${styles.review} ${styles['pl-15']} ${styles['pr-15']} ${styles['pt-15']} ${styles['flex-center']}`}>
      <div>
        <img className={styles.icon} alt="" src={`${constants.mediaDomain}/${rev.product_image_url}`} />
      </div>
      <div className={`${styles['pl-15']} ${styles['pr-15']} ${styles['pt-15']} ${styles['pb-30']} ${styles['border-b']}`}>
        <div className={`${styles['pb-10']} ${styles['fs-14']} ${styles.fontW600}`}>{rev.title}</div>
        <StarRating
          interactive={false}
          count={5}
          rating={rev.ratings}
          clsStyl={{ width: '15px', marginRight: '5px' }}
        />
        <div className={`${styles['pt-10']} ${styles['fs-12']} ${styles['dottes-gry-clr']} ${styles['cam-reviw']}`}>{rev.comment}</div>
        {!rev.comment &&
          <Button
            id={rev.review_id}
            className={`${styles.flex} ${styles['preference-save']} ${styles.fontW600} ${styles['fs-10']} ${styles['text-uppercase']}`}
            btnText={REVIEWS.WRITE_A_REVIEW}
            onClick={showModal}
          />}
      </div>
      <div className={`${styles.absolute} ${styles.right30P} ${styles['icon-pos']}`}>
        <a data-id={rev.review_id} className={`${styles.flex}`} onClick={deleteReview}>
          <SVGCompoent src="icons/delete-icon/delete-icon" clsName={styles['del-icon']} />
        </a>
        <a data-id={rev.review_id} className={`${styles.flex} ${styles['ml-10']}`} onClick={showModal}>
          <SVGCompoent src="icons/edit-icon/edit-icon" clsName={styles['del-icon']} />
        </a>
      </div>
      <div>
        {openModal ?
          <React.Fragment>
            <div onClick={closeModal} className={openModal ? `${styles.modalContainer} ${styles.showDiv}` : `${styles.modalContainer} ${styles.hideDiv}`}>
              <div className={`${styles.disabled}`} />
            </div>
            <div className={`${styles['overflow-y-auto']} ${styles['p-30']} ${openModal ? `${styles.openModal}` : `${styles.closeModal}`}`}>
              <div className={styles['p-40']}>
                <h4 className={`${styles.flex} ${styles['justify-flex-end']} ${styles['m-0']} ${styles['mb-20']}`}>
                  <a onClick={closeModal} href className={`${styles['fs-22']} ${styles['black-color']}`}>X</a>
                </h4>
                <div>
                  {showReviews ?
                    <ReviewFeedBackModal
                      catalogObj={catalogObj}
                      rating={rev.ratings}
                      comment={rev.comment}
                      titleInfo={titleInfo}
                      images={rev.images}
                      feedbackSubmit={postUserReview}
                      setReviewImages={setReviewImages}
                      cid={userInfo.contactInfo.user_account_id}
                      documentId={documentId}
                      downloadPic={downloadPic}
                    />
                    :
                    <ReviewThankYou toggleReviewModal={closeModal} />
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
};

const mapStateToProps = (store) => ({
  userInfo: personalDetailsSelectors.getUserInfo(store),
  documentId: selectors.getReviewPicDocumentId(store),
  reviewImage: selectors.getReviewImage(store),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setReviewImages: actionCreators.setReviewImages,
  downloadPic: actionCreators.downloadReviewPics,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Review);
