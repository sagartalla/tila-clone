/*eslint-disable*/
import React, {Component} from 'react';
import HeaderBar from '../HeaderBar';
import { mergeCss } from '../../utils/cssUtil';
import Faq from './Faq';
import Answers from './Answers';

const styles = mergeCss('components/Help/help');

const QUERY = 'Select id, lookupname, parent from ServiceCategories'

const ContactTabs = [
  { type: 'email', icon: '', text: ['Want to mail us ?', 'Email us now'] },
  { type: 'chat', icon: '', text: ['Want to chat ?', 'Chat with us now'] },
  { type: 'call', icon: '', text: ['Phone Support', 'Call us now'] }
]

const helpComponents = {
  'faq': (url, categoriesObj, query) => <Faq url={url} categoriesObj={categoriesObj} query={query}/>,
  'answers': (url, categoriesObj, query) => <Answers url={url} categoriesObj={categoriesObj} query={query}/>,
  'incidents': (url, categoriesObj, query) => <div>Incidents</div>,
}

export default class Help extends Component {
  constructor(props){
    super(props);
    const { 0 : urlQuery } = props.query;
    const [type, ...url] = urlQuery.split('/');
    this.state = {
      type,
      url,
      categoriesObj: {}
    }
    this.getCategories();
  }
  getCategories = () => {
    fetch(`https://fptsuae.custhelp.com/services/rest/connect/v1.3/queryResults?query=${encodeURIComponent(QUERY)}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic YWRtaW5pc3RyYXRvcjpGcHRzQDEyMzQ1Ng=='
      }
    }).then(res => res.ok && res.text()).then((res) => {
      const { items } = JSON.parse(res);
      const { columnNames, rows: categories } = items[0];
      const categoriesObj = categories.reduce((acc, c, i) => {
        c[2] && (acc[c[2]] = {...acc[c[2]], child: [...acc[c[2]].child, c[0]]})
        return {
          ...acc, [c[0]]: {name: c[1], id: c[0], hasParent: !!c[2], child:[]}
        }
      }, {})
      this.setState({
        categoriesObj
      })
    }).catch(err => alert('err'))
  } 
  renderContactCard = (type, index) => (
    <div key={type.type} className={styles['flexCenterContainer']}
      style={{
        margin: '10px 0px', 
        width: '200px', 
        display: 'flex',
        ...(index !== 0 && {borderLeft: '0.5px solid rgba(0,0,0,0.25)'})
      }}
    >
      <div style={{ margin: '10px', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#8DD7C2'}}></div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 'bolder'}}>{type.text[0]}</div>
        <div style={{ fontSize: '12px', color: '#7891B6' }}>{type.text[1]}</div>
      </div>
    </div>
  )

  render(){
    return(
      Object.keys(this.state.categoriesObj).length > 0 ?
      <div style={{ height: '100%', overflow: 'hidden'}}>
        <HeaderBar />
        <div style={{ height: `calc(100% - 110px)`, overflow: 'auto'}}>
          <div>
            <div className={`${styles['flexCenterContainer']} ${styles['helpHeroContainer']}`}>
              <div className={`${styles['flexColCenterContainer']}`} style={{width: '100%'}}>
                <h3>Hi, How can we help you today ?</h3>
                <div className={styles['searchContainer']}></div>
              </div>
              <div className={styles['contactContainer']}>
                {ContactTabs.map(this.renderContactCard)}
              </div>
            </div>
            <div style={{ backgroundColor: '#fff'}}>
              <div className={styles['helpContentContainer']}>
                {helpComponents[this.state.type](this.state.url, this.state.categoriesObj, this.props.query[0])}
              </div>
            </div>
          </div>
        </div>
      </div> : null
    )
  }
}