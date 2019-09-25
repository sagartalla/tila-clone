import React, { Component } from 'react';
import SVGComponent from '../../common/SVGComponet';
import StarRating from '../../common/StarRating';

import { languageDefinations } from '../../../utils/lang';
import Theme from '../../helpers/context/theme';
import FormValidator from '../../common/FormValidator';
import Button from '../../common/CommonButton';
import lang from '../../../utils/language';
import constants from '../../../constants';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { PDP_PAGE } = languageDefinations();

export default class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'textValue',
        method: this.validateTextArea,
        message: PDP_PAGE.DESCRIPTION_CANNOT_BE_EMPTY,
        validWhen: false,
      },
      {
        field: 'rating',
        method: this.validateStarRating,
        message: PDP_PAGE.PLEASE_SELECT_THE_STAR_RATING,
        validWhen: false,
      },
    ]);
    this.state = {
      textValue: props.comment || '',
      rating: props.rating || 0,
      validation: this.validations.valid(),
      charsLeft: props && props.comment === undefined ? 300 : (300 - (props && props.comment && props.comment.length)) < 0 ? 300 : (300 - (props && props.comment && props.comment.length)),
      images: props.images || [],
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.retrieveRating = this.retrieveRating.bind(this);
    this.sumbitFeedBack = this.sumbitFeedBack.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.documentId && JSON.stringify(nextProps.documentId) !== JSON.stringify(this.props.documentId)) {
      this.props.downloadPic(nextProps.documentId).then((data) => {
        this.setState({
          images: data.action.payload,
        })
      })
    }
  }
  validateTextArea = (fieldvalue, state) => {
    if (fieldvalue === '') {
      return true;
    }
    return false;
  }
  validateStarRating = (fieldvalue, state) => {
    if (fieldvalue === 0) {
      return true;
    }

    return false;
  }

  handleTextChange({ target: { value } }) {
    this.setState({
      textValue: value,
      charsLeft: 300 - value.length,
    });
  }
  retrieveRating(e, rating) {
    this.setState({ rating });
  }

  handleImageUpload = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    this.props.setReviewImages(formData, this.props.cid)
  }

  sumbitFeedBack() {

    const validation = this.validations.validate(this.state);
    const { rating, textValue, images } = this.state;

    this.setState({ validation });

    if (validation.isValid) {
      const textContent = textValue
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

      const params = {
        ratings: rating,
        comment: textContent,
        review_type: 'USER',
        images: images,
      };

      const paramsObj = Object.assign({}, this.props.catalogObj, params);
      this.props.feedbackSubmit(paramsObj);
    }
  }

  removeImage = (e) => {
    this.state.images.splice(e.target.getAttribute('data_id'), 1)
    this.setState({
      images: this.state.images,
    })
  }

  triggerInputFile = () => this.fileInput.click()

  render() {
    const { rating, validation, charsLeft, images } = this.state;
    const { titleInfo } = this.props;
    const { title, media } = titleInfo;
    return (
      <Theme.Consumer>
        {
          categoryType => (
            <div className={styles['review-main']}>
              <div className={`${styles['share-review-img']} ${styles.flex}`}>
                <img src={`${constants.mediaDomain}/${media}`} />
              </div>
              <h4 className={`${styles['fs-14']} ${styles.fontW600} ${styles['t-c']} ${styles['mb-15']}`}>{title && title.attribute_values ? title.attribute_values[0].value : title}</h4>
              <div
                className={`${styles.flex} ${styles['review-start']} ${styles['justify-center']} ${styles['mt-5']}
               ${styles['max-ht100']} ${styles['ht-25']}`}
              >
                <StarRating
                  rating={rating}
                  total={5}
                  clsName={`${styles['star-icon']}`}
                  onRate={this.retrieveRating}
                />
              </div>
              {
                validation.rating.isInValid ?
                  <div className={`${styles['fs-12']} ${styles['t-c']} ${styles['thick-red']}`}>
                    <span>{validation.rating.message}</span>
                  </div> : null
              }
              <div className={`${styles['review-block']} ${styles['mt-35']} ${styles['t-c']}`}>
                <textarea
                  placeholder={PDP_PAGE.ANY_OTHER_SUGGESTIONS}
                  type="text"
                  name="message"
                  rows="3"
                  cols="70"
                  maxLength="300"
                  onChange={this.handleTextChange}
                  className={`${styles['review-textarea']}`}
                >
                  {this.state.textValue}
                </textarea>
                {
                  validation.textValue.isInValid ?
                    <div className={`${styles['fs-12']} ${styles['thick-red']}`}>
                      <span>{validation.textValue.message}</span>
                    </div> : null
                }

              </div>
              <div className={`${styles['fl-rt']} ${styles['fs-12']} ${styles['pb-20']} ${styles['pt-10']}`}>
                <span>{PDP_PAGE.MAX_LENGTH} </span>
                <span>{charsLeft}</span>
              </div>
              <div className={styles['mt-10']} onClick={this.triggerInputFile}>
                <button className={` ${styles['fs-14']} ${styles['flex-center']} ${styles['justify-center']} ${styles['border-radius2']}`}>
                  <SVGComponent clsName={`${styles['image-width']}`} src="icons/common-icon/attach" />
                  <span className={`${styles['pl-5']} ${styles.width11vw} ${styles['fs-13']}`}>{PDP_PAGE.ADD_IMAGES}&nbsp;<small className={styles['text-lgt-gray']}>{PDP_PAGE.MAX_FIVE}</small></span>
                </button>
              </div>
              <input ref={fileInput => this.fileInput = fileInput} type='file' className={`${styles['file-input']}`} onChange={this.handleImageUpload} multiple />
              <div className={`${styles['image-container']}`}>
                {
                  images && images.length > 0 ?
                    images.map((image, index) => {
                      return (
                        <div className={`${styles.relative} ${styles.width20} ${styles['m-5']}`}>
                          <span data_id={index} className={`${styles.thumbnail} `} onClick={this.removeImage}>&times;</span>
                          <img src={image} className={`${styles.width100} ${styles['ht-07']} ${styles['border-lg']} ${styles['m-5']}`} />
                        </div>
                      )
                    }) : null
                }
              </div>
              {/* <div className={styles['cl-bth']}></div> */}
              {/* <div
              className={`${styles['flex-center']}
              ${styles['review-rating-block']}
              ${styles['space-between']} ${styles['mr-20']} ${styles['ml-20']}
              ${styles['mt-20']} ${styles['mb-20']} ${styles['p-15']}`} > */}

              {/* <div className={`${styles['flex-center']}
                ${styles['p-10']} ${styles['ht-40']}`}
                >
                <div
                  className={`${styles['review-start']} ${styles['flex']}`}
                  >
                  <SVGCompoent
                    clsName={`${styles['product-box']}`}
                    src={`icons/common-icon/product-box`}
                  />
                </div>
                <div className={`${styles['ml-15']} ${styles['mt-10']}`}>{PDP_PAGE.RATE_THE_PRODUCT}</div>
              </div> */}
              {/* <div
              className =
              {`${styles['flex']} ${styles['review-start']} ${styles['mt-5']}
               ${styles['max-ht100']} ${styles['ht-25']} `}>
                <StarRating
                  rating={rating}
                  total={5}
                  clsName={`${styles['star-icon']}`}
                  onRate={this.retrieveRating}
                />
              </div> */}
              {/* </div> */}
              {/* {
              validation.rating.isInValid ?
              <div className={`${styles['fs-12']} ${styles['t-rt']} ${styles['thick-red']}`}>
                <span>{validation.rating.message}</span>
              </div> : null
            } */}

              <div className={styles['t-c']}>
                <Button
                  className={`${styles['btn-style']} ${styles['btn-style-override']} ${styles['fs-14']} ${styles['text-uppercase']}`}
                  btnText={PDP_PAGE.SUBMIT_FEEDBACK}
                  onClick={this.sumbitFeedBack}
                />
              </div>
            </div>
          )
        }
      </Theme.Consumer>
    );
  }
}
