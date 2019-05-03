/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators as helpActions } from '../../store/helpsupport';
import Orders from './Orders';

import lang from '../../utils/language';

import styles_en from './help_en.styl';
import styles_ar from './help_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

const getIds = (selectedId, childIds) => {
  let id = [selectedId];
  childIds.length > 0 && (id = childIds);
  return id;
}

const sort = (a,b) => a - b;

class Answers extends Component {
  constructor(props){
    super(props);
    const [parentCategoryId, categoryId] = props.url;
    const answerId = window.location.hash ? window.location.hash.split('#')[1] : ''
    this.state = {
      selectedCategory: categoryId || parentCategoryId,
      openedCategory: parentCategoryId,
      openedAnswer: answerId,
    }
    parentCategoryId !== 'orders' && props.getAnswers(getIds(this.state.selectedCategory, props.categoriesObj[this.state.selectedCategory] ? props.categoriesObj[this.state.selectedCategory].child : []));
  }
  openCategory = (categoryId) => (e) => {
    this.setState({
      openedCategory: categoryId
    })
  }
  openAnswer = (answerId) => (e) => {
    this.setState({
      openedAnswer: answerId
    })
  }
  getUrl = (fromParent, categoryId, parentId, childId) => {
    const { pathname } = window.location;
    if(fromParent){
      return pathname.replace(this.props.query, `answers/${categoryId}/${childId ? childId : ''}`);
    }
    return pathname.replace(this.props.query, `answers/${parentId}/${categoryId}`);
  }
  renderCategories = (fromParent, parentId) => (categoryId, index) => {
    const categoryObj = this.props.categoriesObj[categoryId];
    const childLength = categoryObj.child.length;
    const isOpened = categoryObj.child.includes(this.state.selectedCategory);
    const isSelected = categoryId === this.state.selectedCategory;
    if ((fromParent && !categoryObj.hasParent) || (!fromParent)) {
      return(
        <div key={categoryObj.id}
          className={`${index !==0 && styles['bT']} ${isOpened && styles['openBGColor']}`}
        >
          <div
            className={`${styles['categoryValue']} ${isSelected && styles['selectedBG']} ${fromParent && styles['fwBolder']}`}
          >
           {childLength ?
              <div className={`${styles['categoryWithChild']} ${isSelected && styles['whiteColor']}`} onClick={this.openCategory(categoryObj.id)}>
                <div>{categoryObj.name}</div>
                <div>v</div>
              </div>
              : <a
                  href={this.getUrl(fromParent, categoryId, parentId, childLength ? categoryObj.child[0] : null)}
                  className={`${isSelected ? `${styles['whiteColor']} ${styles['fwBolder']}` : styles['blackColor']}`}
                >
                  {categoryObj.name}
                </a>
            }
          </div>
          {childLength ?
          <div className={styles['categoryCont']}
            style={{ height: this.state.openedCategory === categoryObj.id ?  (childLength * 55) : 0}}>
            {categoryObj.child.map(this.renderCategories(false, categoryId))}
          </div> : null}
        </div>
      )
    }
    return null
  }
  renderAnswers = (answerKey, index) => {
    const [id, question, ans, categoryId, parentId] = this.props.answerData[answerKey];
    const isOpened = id === this.state.openedAnswer;
    return (
      <div key={id} className={`${styles['ansContainer']} ${isOpened && styles['openBGColor']}`}>
        <div
          onClick={this.openAnswer(id)}
          dangerouslySetInnerHTML={{__html: question}}
          className={isOpened ? styles['questionBox-open'] : styles['questionBox-close']}
        >
        </div>
        <div
          dangerouslySetInnerHTML={{__html: ans}}
          className={`${styles['answers']} ${isOpened && styles['openedAnswers']}`}
        >
        </div>
      </div>
    )
  }
  renderRecentOrderTab = () => {
    const isSelected = this.state.selectedCategory === 'orders' && !window.location.hash;
    const { pathname } = window.location;
    const ordersUrl = pathname.replace(this.props.query, `answers/orders`)
    return (
      <a
        href={ordersUrl}
        className={`${styles['categoryValue']} ${styles['fwBolder']} ${isSelected ? `${styles['selectedBG']} ${styles['whiteColor']}` : styles['blackColor']}`}
      >
        Recent Orders
      </a>
    )
  }
  render(){
    const answerKeys = Object.keys(this.props.answerData).sort(sort);
    const { pathname } = window.location;
    const helpCenterUrl = pathname.replace(this.props.query, `faq`)
    return(
      <div>
        <a href={helpCenterUrl} className={styles['backHelp']}>Back to Help Center</a>
        <div className={styles['contentContainer']}>
          <div className={styles['categoryContainer']}>
            {this.renderRecentOrderTab()}
            {Object.keys(this.props.categoriesObj).sort(sort).map(this.renderCategories(true, null))}
          </div>
          <div className={styles['answersContainer']}>
          { this.state.selectedCategory !== 'orders'
            ? answerKeys.length > 0 ? answerKeys.map(this.renderAnswers) : <div> No Questions Available </div>
            :
              <div className={styles['ht-100P']}>
                <Orders query={this.props.query} isLoggedIn={this.props.isLoggedIn} renderContactCard={this.props.renderContactCard} handleContactClick={this.props.handleContactClick}/>
              </div>
          }
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  answerData: state.helpSupportReducer.answerData,
}), {...helpActions})(Answers)
