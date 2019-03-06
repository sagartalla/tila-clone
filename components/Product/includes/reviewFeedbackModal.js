import React , {Component} from 'react'
import SVGCompoent from '../../common/SVGComponet';
import StarRating from '../../common/StarRating';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Product/product');
import {languageDefinations} from '../../../utils/lang';
import Theme from '../../helpers/context/theme';
const {PDP_PAGE} = languageDefinations();
import { Col,Button } from 'react-bootstrap';
import FormValidator from '../../common/FormValidator'

export default class FeedbackModal extends Component {
  constructor(props) {
    super(props)
    this.validations = new FormValidator([
      {
        field:'textValue',
        method:this.validateTextArea,
        message:'Description cannot be empty',
        validWhen:false
      },
      {
        field:'rating',
        method:this.validateStarRating,
        message:'please select the starRating',
        validWhen:false
      }
    ])

    this.state = {
      textValue:'',
      rating:0,
      validation:this.validations.valid()
    }
  }
  validateTextArea = (fieldvalue,state) => {
    if(fieldvalue === '') {
      return true
    }
    return false;
  }
  validateStarRating = (fieldvalue,state) => {
    if(fieldvalue === 0) {
      return true
    }

    return false
  }

  handleTextChange =({target:{value}}) => {
    this.setState({
      textValue:value
      })
  }
  retrieveRating = (e,rating) => {
    this.setState({ rating })
  }
  sumbitFeedBack = () => {

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
                placeholder='Any Other Suggestions?Let Us Know'
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
              ${styles['space-between']} ${styles['mr-20']} ${styles['ml-20']}
              ${styles['mt-20']} ${styles['mb-20']} ${styles['ht-55']}`} >
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
                <div className={`${styles['ml-15']} ${styles['mt-10']}`}>Rate The Product</div>
              </div>
              <div
              className =
              {`${styles['flex']} ${styles['review-start']} ${styles['mt-5']}
               ${styles['max-ht100']}`}>
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
              submit FeedBack
              </Button>
            </div>
          </div>
        )
      }
      </Theme.Consumer>
    )
  }
}
