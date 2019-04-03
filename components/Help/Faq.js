/*eslint-disable*/
import React, {Component} from 'react';
import axios from 'axios'
import { mergeCss } from '../../utils/cssUtil';

const styles = mergeCss('components/Help/help');

const QUERY = 'Select id, question, Categories.id as CategoryID, Categories.ParentCategory.ParentCategory.id as ParentID from Answers LIMIT 100'

export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.getQuestions();
    this.state = {
      qObj : {}
    }
  }

  getQuestions = () => {
    fetch(`https://fptsuae.custhelp.com/services/rest/connect/v1.3/queryResults?query=${encodeURIComponent(QUERY)}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic YWRtaW5pc3RyYXRvcjpGcHRzQDEyMzQ1Ng=='
      }
    }).then(res => res.ok && res.text()).then((res) => {
      const { items } = JSON.parse(res);
      const { columnNames, rows: questions } = items[0];
      const qObj = questions.reduce((acc, q, i) => ({
        ...acc, 
        ...(!!q[3] 
            ? {[q[3]]: acc[q[3]] ?  {...acc[q[3]], [q[0]]: q} : {[q[0]]: q}}
            : {[q[2]]: acc[q[2]] ?  {...acc[q[2]], [q[0]]: q} : {[q[0]]: q}} 
           )
        }),{});
      this.setState({
        qObj
      })
    }).catch(err => alert('err'))
  }

  renderQuestions = (topicKey) => (questionKey, index) => {
    const questionArr = this.state.qObj[topicKey][questionKey];
    return (
      <div key={questionKey}>
        <a href={`answers/${topicKey}/${questionArr[2]}/${questionKey}`} style={{ fontSize: 13, color: '#848484'}}>
          {questionArr[1]}
        </a>
      </div>
    )
  }

  renderTopics = (topicKey, index) => {
    const questionKeys = Object.keys(this.state.qObj[topicKey]).sort((a, b) => a - b);
    const remaining = questionKeys.splice(4);
    return (
      <div key={topicKey} className={styles['topicContainer']}>
        <h4>{this.props.categoriesObj[topicKey].name}</h4>
        <div style={{ height: 175}}>
          {questionKeys.map(this.renderQuestions(topicKey))}
        </div>
        {remaining.length > 0 ? <a href={`answers/${topicKey}`}style={{ fontSize: 12, color: '#476A9B', alignSelf: 'flex-end' }}>{`${remaining.length} more >`}</a> : <div />}
      </div>
    )
  }

  render(){
    const questionTypeKeys = Object.keys(this.state.qObj).sort((a, b) => a - b);
    return(
      <div>
        <h4>TOPICS</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {questionTypeKeys.map(this.renderTopics)}
        </div>
      </div>
    )
  }
}