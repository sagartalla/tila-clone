import React, { Component } from 'react';
import { Col,Button } from 'react-bootstrap';
import SVGCompoent from '../../common/SVGComponet';
import StarRating from '../../common/StarRating';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang';
import Theme from '../../helpers/context/theme';
import FormValidator from '../../common/FormValidator';

const styles = mergeCss('components/Product/product');

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
      textValue:value
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
    const { rating,validation } = this.state;
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
                value={this.state.textValue}
                name="message" rows='1' cols='50'
                onChange={this.handleTextChange}
                className={`${styles['review-textarea']}`}
                >
              </textarea>
              {
                validation.textValue.isInValid ?
                <div className={`${styles['fs-12']} ${styles['thick-red']}`}>
                  <span>{validation.textValue.message}</span>
                </div>: null
              }

            </div>

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
                  clsStyl={`${styles['star-icon']}`}
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
                className={`${styles['btn-style']} ${styles['fs-16']}`}
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
