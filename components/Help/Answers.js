/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators as helpActions } from '../../store/helpsupport';
import Orders from './Orders';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './help_en.styl';
import styles_ar from './help_ar.styl';
import SVGComponent from '../common/SVGComponet';
import { languageDefinations } from '../../utils/lang';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const languageLabel = languageDefinations();

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
    this.searchQuery = window.location.search.split('=')[1] ? decodeURIComponent(window.location.search.split('=')[1]) : '';
    this.state = {
      answerData: {},
      selectedCategory: categoryId || parentCategoryId,
      openedCategory: parentCategoryId,
      openedAnswer: answerId,
      count: 0,
      size: 15,
      currentPage: 0,
      totalPages: 1,
      loading: true
    }
    this.scrollTimeout = '';
    parentCategoryId !== 'orders' && !!!this.searchQuery ? 
      props.getAnswers(getIds(this.state.selectedCategory, props.categoriesObj[this.state.selectedCategory] ? props.categoriesObj[this.state.selectedCategory].child : []))
      : 
      this.getAnswerByKeyword();
  }
  getAnswerByKeyword = () => {
    this.state.currentPage < this.state.totalPages && (() => {
      this.setState({
        loading: true
      });
      this.props.getAnswerByKeyword(this.searchQuery, {size: this.state.size, page: this.state.currentPage})
        .then(this.handlePageCount(this.state.currentPage));
    })()
  }
  handlePageCount = (currentPage) => (res) => {
    !!!currentPage ?
      this.setState({
        count: res.value.data.items[0].count,
        totalPages: Math.ceil(res.value.data.items[0].count/this.state.size),
        currentPage: this.state.currentPage + 1
      })
    : this.setState({
        currentPage: this.state.currentPage + 1
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.answerData !== this.props.answerData){
      this.setState({
        answerData: {...this.state.answerData, ...nextProps.answerData},
        loading: false
      })
    }
  }
  openCategory = (categoryId) => (e) => {
    this.setState({
      openedCategory: this.state.openedCategory === categoryId ? '' : categoryId
    })
  }
  openAnswer = (answerId) => (e) => {
    this.setState({
      openedAnswer: answerId === this.state.openedAnswer ? '' : answerId
    })
  }
  getUrl = (fromParent, categoryId, parentId, childId) => {
    const { pathname } = window.location;
    if(fromParent){
      return pathname.replace(this.props.query, `answers/${categoryId}/${childId ? childId : ''}`);
    }
    return pathname.replace(this.props.query, `answers/${parentId}/${categoryId}`);
  }
  handleScroll = (e) => {
    clearTimeout(this.scrollTimeout)
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if ((scrollTop + 10 + offsetHeight) > scrollHeight) {
      this.scrollTimeout = setTimeout(this.getAnswerByKeyword, 100)
    }
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
                <div style={{transform: this.state.openedCategory === categoryObj.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.25s'}}>v</div>
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
    const [id, question, ans, categoryId, parentId] = this.state.answerData[answerKey];
    const isOpened = (id === this.state.openedAnswer) || (index === 0 && !!this.searchQuery & !!!this.state.openedAnswer);
    return (
      <div key={id} className={`${styles['ansContainer']} ${isOpened && styles['openBGColor']}`}>
        <div className={`${styles['answerArrowIcon']}`}>
        {isOpened ? <SVGComponent src={`helpsupport/upArrow`} /> : <SVGComponent src={`helpsupport/downArrow`} />}
        </div>
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
        className={`${styles['categoryValue']} ${styles['fwBolder']} ${styles['bB']} ${isSelected ? `${styles['selectedBG']} ${styles['whiteColor']}` : styles['blackColor']}`}
      >
        {languageLabel['HNS']['RECENT_ORDERS']}
      </a>
    )
  }
  render(){
    const answerKeys = Object.keys(this.state.answerData).sort(sort);
    const { pathname } = window.location;
    const helpCenterUrl = pathname.replace(this.props.query, `faq`)
    return(
      <div>
        <div className={styles['answerNavContainer']}>
        <a href={helpCenterUrl} className={styles['backHelp']}>{languageLabel['HNS']['BACK_TO_HELP']}</a>
        {this.searchQuery ?
            <div className={styles['searchResultsTitleContainer']}>
              <div className={styles['searchResultsTitle']}>{languageLabel['HNS']['SEARCH_RESULTS']}</div>
              <div className={styles['searchResultsSummary']}>{`${this.state.count} ${languageLabel['HNS']['RESULTS_FOR']} ${this.searchQuery}`}</div>
            </div>
          : null}
        </div>
        <div className={styles['contentContainer']}>
          <div className={styles['categoryContainer']}>
            {this.renderRecentOrderTab()}
            {Object.keys(this.props.categoriesObj).sort(sort).map(this.renderCategories(true, null))}
          </div>
          <div className={styles['answersContainer']} onScroll={this.handleScroll}>
          { this.state.selectedCategory !== 'orders'
            ? answerKeys.length > 0 ? 
              <div>
                {answerKeys.map(this.renderAnswers)}
                { this.state.loading && 
                    <div className={`${styles['loader-div']}`} >
                      <SVGComponent clsName={`${styles['loader-styl']}`} src="icons/common-icon/circleLoader" />
                    </div>
                }
              </div>
            : <div>{this.state.loading ? languageLabel['HNS']['LOADING'] : languageLabel['HNS']['NO_Q_AVAILABLE']}</div>
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
