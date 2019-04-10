/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/helpsupport';
import { mergeCss } from '../../utils/cssUtil';
import { Link } from '../../routes';
const styles = mergeCss('components/Help/help');

const sort = (a,b) => a - b;

class Faq extends Component {
  constructor(props) {
    super(props);
    props.getQuestions();
  }

  renderQuestions = (topicKey) => (questionKey, index) => {
    const questionArr = this.props.questionData[topicKey][questionKey];
    return (
      <div key={questionKey}>
        <Link route={`answers/${topicKey}/${questionArr[2]}#${questionKey}`} ><a style={{ fontSize: 13, color: '#848484'}} dangerouslySetInnerHTML={{__html: questionArr[1]}} /></Link>
      </div>
    )
  }

  renderTopics = (topicKey, index) => {
    const questionKeys = Object.keys(this.props.questionData[topicKey]).sort(sort);
    const remaining = questionKeys.splice(4);
    return (
      <div key={topicKey} className={styles['topicContainer']}>
        <h4>{this.props.categoriesObj[topicKey].name}</h4>
        <div style={{ height: 175}}>
          {questionKeys.map(this.renderQuestions(topicKey))}
        </div>
        {remaining.length > 0 ? <Link route={`answers/${topicKey}`}><a style={{ fontSize: 12, color: '#476A9B', alignSelf: 'flex-end' }}>{`${remaining.length} more >`}</a></Link> : <div />}
      </div>
    )
  }

  render(){
    const questionTypeKeys = Object.keys(this.props.questionData).sort(sort);
    return(
      <div>
        <h4>TOPICS</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {questionTypeKeys.map(this.renderTopics)}
        </div>
        {this.props.isLoggedIn ? 
          <div>
            <h4>MY INCIDENTS</h4>
            <div className={styles['incidentContainer']}>
              <div>
                <h4>MY TICKETS</h4>
                <div style={{fontSize: 13, color: '#848484'}} >All your tickets in one place.</div>
              </div>
              <div><Link route='incidents'><a style={{fontSize: '12px'}}>View More</a></Link></div>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

export default connect(({helpSupportReducer}) => ({ questionData: helpSupportReducer.questionData}), {...actionCreators})(Faq)