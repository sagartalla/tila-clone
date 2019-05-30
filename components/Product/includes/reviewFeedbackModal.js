import React, { Component } from 'react';
import { Col,Button } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import StarRating from '../../common/StarRating';

import { languageDefinations } from '../../../utils/lang';
import Theme from '../../helpers/context/theme';
import FormValidator from '../../common/FormValidator';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from '../product_en.styl';
import styles_ar from '../product_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

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
      textValue: '',
      rating: 0,
      validation: this.validations.valid(),
      charsLeft:300
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.retrieveRating = this.retrieveRating.bind(this);
    this.sumbitFeedBack = this.sumbitFeedBack.bind(this);
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

  handleTextChange({target:{value}}){
    this.setState({
      textValue:value,
      charsLeft: 300 - value.length
    })
  }
  retrieveRating(e,rating){
    this.setState({ rating })
  }
  sumbitFeedBack() {

    let validation = this.validations.validate(this.state)
    const { rating, textValue} = this.state

    this.setState({ validation })

    if(validation.isValid) {
      let textContent = textValue
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

      let params = {
        ratings:rating,
        comment:textContent,
        review_type:"USER"
      }

      let paramsObj = Object.assign({},this.props.catalogObj,params)
      this.props.feedbackSubmit(paramsObj)
    }


  }
  render() {
    const { rating,validation,charsLeft } = this.state;
    return (
      <Theme.Consumer>
      {
        categoryType => (
          <div className={styles['review-main']}>
            <div
              className=
              {`${styles['review-block']} ${styles['mt-20']} ${styles['mb-20']} ${styles['t-c']}`}
              >
              <textarea
                placeholder={PDP_PAGE.ANY_OTHER_SUGGESTIONS}
                type='text'
                name="message" rows='3' cols='70'
                maxlength="300"
                onChange={this.handleTextChange}
                className={`${styles['review-textarea']}`}
                >
                {this.state.textValue}
              </textarea>
              {
                validation.textValue.isInValid ?
                <div className={`${styles['fs-12']} ${styles['thick-red']}`}>
                  <span>{validation.textValue.message}</span>
                </div>: null
              }

            </div>
            <div className={`${styles['fl-rt']} ${styles['fs-12']}`}>
              <span>maxLength</span>
              <span>{charsLeft}</span>
            </div>
            <div className={styles['cl-bth']}></div>
            <div
              className={`${styles['flex-center']}
              ${styles['review-rating-block']}
              ${styles['space-between']} ${styles['mr-20']} ${styles['ml-20']}
              ${styles['mt-20']} ${styles['mb-20']} ${styles['p-15']}`} >

              <div className={`${styles['flex-center']}
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
              </div>
              <div
              className =
              {`${styles['flex']} ${styles['review-start']} ${styles['mt-5']}
               ${styles['max-ht100']} ${styles['ht-25']} `}>
                <StarRating
                  rating={rating}
                  total={5}
                  clsName={`${styles['star-icon']}`}
                  onRate={this.retrieveRating}
                />
              </div>
            </div>
            {
              validation.rating.isInValid ?
              <div className={`${styles['fs-12']} ${styles['t-rt']} ${styles['thick-red']}`}>
                <span>{validation.rating.message}</span>
              </div> : null
            }

            <div className={styles['t-c']}>
              <Button
                variant="primary"
                onClick={this.sumbitFeedBack}
                className={`${styles['btn-style']} ${styles['fs-16']} ${styles['text-uppercase']}`}
              >
              {PDP_PAGE.SUBMIT_FEEDBACK}
              </Button>
            </div>
          </div>
        )
      }
      </Theme.Consumer>
    )
  }
}
