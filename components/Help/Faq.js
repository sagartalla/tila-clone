/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/helpsupport';
import { Link } from '../../routes';

import lang from '../../utils/language';

import styles_en from './help_en.styl';
import styles_ar from './help_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


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
        <Link route={`answers/${topicKey}/${questionArr[2]}#${questionKey}`} ><a className={`${styles['fs-13p']} ${styles['greyColor']}`} dangerouslySetInnerHTML={{__html: questionArr[1]}} /></Link>
      </div>
    )
  }

  renderTopics = (topicKey, index) => {
    const questionKeys = Object.keys(this.props.questionData[topicKey]).sort(sort);
    const remaining = questionKeys.splice(4);
    return (
      <div key={topicKey} className={styles['topicContainer']}>
        <h4>{this.props.categoriesObj[topicKey].name}</h4>
        <div className={styles['ht-175']}>
          {questionKeys.map(this.renderQuestions(topicKey))}
        </div>
        {remaining.length > 0 ? <Link route={`answers/${topicKey}`}><a className={`${styles['fs-13p']} ${styles['greyColor']} ${styles['as-flex-end']}`}>{`${remaining.length} more >`}</a></Link> : <div />}
      </div>
    )
  }

  render(){
    const questionTypeKeys = Object.keys(this.props.questionData).sort(sort);
    return(
      <div>
        <h4>TOPICS</h4>
        <div className={`${styles['flex']} ${styles['flexWrap']} ${styles['justify-between']}`}>
          {questionTypeKeys.map(this.renderTopics)}
        </div>
        {this.props.isLoggedIn ?
          <div>
            <h4>MY INCIDENTS</h4>
            <div className={styles['incidentContainer']}>
              <div>
                <h4>MY TICKETS</h4>
                <div className={`${styles['fs-13p']} ${styles['greyColor']}`} >All your tickets in one place.</div>
              </div>
              <div><Link route='incidents'><a className={styles['fs-13p']}>View More</a></Link></div>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

export default connect(({helpSupportReducer}) => ({ questionData: helpSupportReducer.questionData}), {...actionCreators})(Faq)
