/*eslint-disable*/
import React, {Component} from 'react';
import axios from 'axios'
import { mergeCss } from '../../utils/cssUtil';

const styles = mergeCss('components/Help/help');

const QUERY = 'Select id, question, solution, Categories.CategoriesList.id as CategoryID, Categories.ParentCategory.ParentCategory.id as ParentID from Answers'

const getQuery = (selectedId, childIds) => {
  console.log(selectedId, childIds);
  let query = `${QUERY} Where Categories.id=${selectedId} LIMIT 100`;
  childIds.length > 0 && (query = `${QUERY} Where Categories.id in (${childIds.join(',')})`);
  return query;
}

export default class Answers extends Component {
  constructor(props){
    super(props);
    const [parentCategoryId, categoryId, answerId] = props.url;
    this.state = {
      selectedCategory: categoryId || parentCategoryId,
      openedCategory: parentCategoryId,
      openedAnswer: answerId,
      aObj: {}
    }
    console.log(props);
    this.getAnswers(getQuery(this.state.selectedCategory, props.categoriesObj[this.state.selectedCategory].child));
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
  getAnswers = (query) => {
    fetch(`https://fptsuae.custhelp.com/services/rest/connect/v1.3/queryResults?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic YWRtaW5pc3RyYXRvcjpGcHRzQDEyMzQ1Ng=='
      }
    }).then(res => res.ok && res.text()).then((res) => {
      const { items } = JSON.parse(res);
      const { columnNames, rows: answers } = items[0];
      const aObj = answers.reduce((acc, a, i) => ({
        ...acc, 
        [a[0]]: a
        }),{});
      this.setState({
        aObj
      })
    }).catch(err => alert('err'))
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
        <div key={categoryObj.id} style={{ backgroundColor : isOpened ? '#F8F8F8' : 'transparent'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', padding: '0px 10px', height: '40px', fontWeight: fromParent ? '800' : '400' }}>
            <a href={this.getUrl(fromParent, categoryId, parentId, childLength ? categoryObj.child[0] : null)} style={{color: isSelected ? '#45689A' : '#000000', fontWeight: isSelected ? '800' : '500'}} >{categoryObj.name}</a>
            {childLength ? <div onClick={this.openCategory(categoryObj.id)}>v</div> : null}
          </div>
          {childLength ? 
          <div style={{ overflow: 'hidden', transition: 'all 0.25s', height: this.state.openedCategory === categoryObj.id ?  (childLength * 40) : 0}}>
            {categoryObj.child.map(this.renderCategories(false, categoryId))}
          </div> : null}
        </div>
      )
    }
    return null
  }
  renderAnswers = (answerKey, index) => {
    const [id, question, ans, categoryId, parentId] = this.state.aObj[answerKey];
    const isOpened = id === this.state.openedAnswer;
    return (
      <div key={id} style={{ backgroundColor: isOpened ? '#F8F8F8' : '#FFFFFF', padding: '0px 10px'}}>
        <div 
          onClick={this.openAnswer(id)} 
          style={{ cursor: 'pointer', fontSize: 13, height: 40, 
            color: isOpened ? '#45689A' : '#000000',
            fontWeight: isOpened ? '800' : '500',
            borderBottom: isOpened ? '0' : '0.25px solid #f2f2f2', overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
          {question}
        </div>
        <div style={{ margin: '10px 0px', fontSize: 13, borderBottom: !isOpened ? '0' : '0.25px solid #f2f2f2', overflow: 'hidden', height: isOpened ? '' : 0}}>{ans}</div>
      </div>
    )
  }
  render(){
    const answerKeys = Object.keys(this.state.aObj).sort((a,b) => a - b);
    return(
      <div>
        <div style={{margin: 'auto'}}>Answers Component</div>
        <div style={{ display: 'flex', padding: '10px 0px', maxHeight: '800px', height: '100%'}}>
          <div style={{ margin: '0px 1px', width: '20%', height: '100%', overflow: 'scroll', borderRight: '0.25px solid #f2f2f2'}}>
            {Object.keys(this.props.categoriesObj).sort((a,b) => a - b).map(this.renderCategories(true, null))}
          </div>
          <div style={{ width: '80%', overflow: 'scroll', padding: '0px 50px'}}>
          { answerKeys.length > 0 ? answerKeys.map(this.renderAnswers) : <div> No Questions Available </div>}
          </div>
        </div>
      </div>
    )
  }
}