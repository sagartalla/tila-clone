/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators as helpActions } from '../../store/helpsupport';
import { mergeCss } from '../../utils/cssUtil';
import Orders from './Orders';

const styles = mergeCss('components/Help/help');

const QUERY = 'Select id, question, solution, Categories.CategoriesList.id as CategoryID, Categories.ParentCategory.ParentCategory.id as ParentID from Answers'

const getQuery = (selectedId, childIds) => {
  let query = `${QUERY} Where Categories.id=${selectedId} LIMIT 100`;
  childIds.length > 0 && (query = `${QUERY} Where Categories.id in (${childIds.join(',')})`);
  return query;
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
    parentCategoryId !== 'orders' && props.getAnswers(getQuery(this.state.selectedCategory, props.categoriesObj[this.state.selectedCategory] ? props.categoriesObj[this.state.selectedCategory].child : []));
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
        style={{ borderTop: index !==0 ? '0.25px solid #f2f2f2' : 0, backgroundColor : isOpened ? '#F8F8F8' : 'transparent'}}>
          <div 
            className={styles['categoryValue']}
            style={{
              fontWeight: fromParent ? '800' : '400',
              backgroundColor: isSelected ? '#45689A' : 'transparent',
            }}
          >
           {childLength ?
              <div className={styles['categoryWithChild']} style={{color: isSelected ? '#ffffff' : '#000000'}} onClick={this.openCategory(categoryObj.id)}>
                <div>{categoryObj.name}</div>
                <div>v</div>
              </div>
              : <a 
                  href={this.getUrl(fromParent, categoryId, parentId, childLength ? categoryObj.child[0] : null)} 
                  style={{color: isSelected ? '#ffffff' : '#000000', fontWeight: isSelected ? '800' : '500'}} 
                >
                  {categoryObj.name}
                </a>
            }
          </div>
          {childLength ? 
          <div style={{ overflow: 'hidden', transition: 'all 0.25s', height: this.state.openedCategory === categoryObj.id ?  (childLength * 55) : 0}}>
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
      <div key={id} style={{ backgroundColor: isOpened ? '#F8F8F8' : '#FFFFFF', padding: '0px 10px'}}>
        <div 
          onClick={this.openAnswer(id)} 
          dangerouslySetInnerHTML={{__html: question}}
          style={{ 
            cursor: 'pointer', 
            fontSize: 14, 
            height: 40, 
            color: isOpened ? '#45689A' : '#000000',
            fontWeight: isOpened ? '800' : '500',
            borderBottom: isOpened ? '0' : '0.25px solid #f2f2f2', overflow: 'hidden', display: 'flex', alignItems: 'center'
          }}
        >
        </div>
        <div 
          dangerouslySetInnerHTML={{__html: ans}}
          style={{ margin: '10px 0px', fontSize: 13, borderBottom: !isOpened ? '0' : '0.25px solid #f2f2f2', overflow: 'hidden', height: isOpened ? '' : 0}} 
        >
        </div>
      </div>
    )
  }
  renderRecentOrderTab = () => {
    const isSelected = this.state.selectedCategory === 'orders';
    return (
      <a 
        className={styles['categoryValue']} 
        href={'orders'}
        style={{
          fontWeight: 800,
          backgroundColor: isSelected ? '#45689A' : 'transparent',
          color: isSelected ? '#ffffff' : '#000000',
        }}
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
        <a href={helpCenterUrl} style={{margin: '1px', fontSize: '13px'}}>Back to Help Center</a>
        <div style={{ display: 'flex', padding: '10px 0px', maxHeight: '800px', height: '100%'}}>
          <div className={styles['categoryContainer']}>
            {this.props.isLoggedIn ? this.renderRecentOrderTab() : null}
            {Object.keys(this.props.categoriesObj).sort(sort).map(this.renderCategories(true, null))}
          </div>
          <div className={styles['answersContainer']}>
          { this.state.selectedCategory !== 'orders' 
            ? answerKeys.length > 0 ? answerKeys.map(this.renderAnswers) : <div> No Questions Available </div> 
            : 
              <div style={{ height: '100%'}}>
                <Orders isLoggedIn={this.props.isLoggedIn} renderContactCard={this.props.renderContactCard} handleContactClick={this.props.handleContactClick}/>
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