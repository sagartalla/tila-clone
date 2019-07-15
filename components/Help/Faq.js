/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/helpsupport';
import { Link } from '../../routes';
import { categoryImages } from './helpConstants';
import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './help_en.styl';
import styles_ar from './help_ar.styl';
import SVGComponent from '../common/SVGComponet';
import { languageDefinations } from '../../utils/lang';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const languageLabel = languageDefinations();

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
        <div className={styles['faqIcon']}>
          <SVGComponent src={`helpsupport/${categoryImages[topicKey]}`}/>
        </div>
        <h4>{this.props.categoriesObj[topicKey].name}</h4>
        <div className={styles['ht-185']}>
          {questionKeys.map(this.renderQuestions(topicKey))}
        </div>
        {remaining.length > 0 ? <Link route={`answers/${topicKey}`}><a className={`${styles['viewMoreBtn']} ${styles['fs-13p']} ${styles['greyColor']} ${styles['as-flex-end']}`}>{`${remaining.length} ${languageLabel['HNS']['MORE']} >`}</a></Link> : <div />}
      </div>
    )
  }

  render(){
    const questionTypeKeys = Object.keys(this.props.questionData).sort(sort);
    return(
      <div>
        <h4>{languageLabel['HNS']['TOPICS']}</h4>
        <div className={`${styles['flex']} ${styles['flexWrap']} ${styles['justify-between']}`}>
          {questionTypeKeys.map(this.renderTopics)}
        </div>
        {this.props.isLoggedIn ?
          <div>
            <h4>{languageLabel['HNS']['MY_INCIDENTS']}</h4>
            <div className={styles['incidentContainer']}>
              <div className={styles['fa']}>
                <div className={styles['incidentIcon']}>
                  <SVGComponent src="helpsupport/help_tickets"/>
                </div>
                <div>
                <h4>{languageLabel['HNS']['MY_TICKETS']}</h4>
                <div className={`${styles['fs-13p']} ${styles['greyColor']}`} >{languageLabel['HNS']['TKTS_ONE_PLACE']}</div>
                </div>
              </div>
              <div><Link route='incidents'><a className={styles['fs-13p']}>{languageLabel['HNS']['VIEW_MORE']}</a></Link></div>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

export default connect(({helpSupportReducer}) => ({ questionData: helpSupportReducer.questionData}), {...actionCreators})(Faq)
