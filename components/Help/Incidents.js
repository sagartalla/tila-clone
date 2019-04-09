/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { actionCreators as helpActions } from '../../store/helpsupport';
import { selectors as authSelectors } from '../../store/auth';
import { mergeCss } from '../../utils/cssUtil';
import { mockData, mockInc } from './mockIncidents';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
const userCredentials = cookies.get('userCreds');

const styles = mergeCss('components/Help/help');

const statusColor = {
  'New': '#F5A624',
  'Solved': '#AFD75F'
}

class Incidents extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedIncident: '',
      msg: ''
    }
    userCredentials && userCredentials.username && this.initiateApiCalls();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.tktData !== this.props.tktData && nextProps.tktData.length) {
      const incidentId = (window.location.hash || '#').split('#')[1]
      incidentId ? this.selectTicket(Number(incidentId))() : this.selectTicket(nextProps.tktData[0].id)()
    }
  }
  initiateApiCalls = () => {
    const { username : emailId } = userCredentials;
    this.props.getAllTickets({emailId}).then(res => {
      return res;
    }).catch(err => {
      console.log(err.response)
      return err
    });
  }
  handleMsg = (e) => {
    this.setState({
      msg: e.target.value
    })
  }
  handleAttachements = (e) => {
    e.persists();
    console.log(e);
  }
  updateIncident = () => {
    const ticketId = {ticketNumber: this.state.selectedIncident}
    const serverData = {
      // "fileAttachments": {
      //   "data": "string",
      //   "fileName": "string"
      // },
      "threads": {
        "entryType": {
          "id": 3
        },
        "text": this.state.msg
      }
    }
    this.props.updateTicket(ticketId, serverData).then(res => {
      this.setState({
        msg: ''
      }, () => {
        this.props.getTicketDetail({ticketNumber: this.state.selectedIncident})
      })
    })
  }
  selectTicket = (tktId) => (e) => {
    this.setState({
      selectedIncident: tktId
    }, () => {
      this.props.getTicketDetail({ticketNumber: tktId})
    })
  }
  renderTktTitle = (tkt) => {
    const {id, createdTime, referenceNumber, subject, statusTiLa} = tkt;
    const isSelected = id === this.state.selectedIncident;
    return (
      <div key={id} onClick={this.selectTicket(id)} style={{ lineHeight: 1.5, backgroundColor: isSelected ? '#F8F8F8' : 'transparent', cursor: 'pointer', padding: '0px 20px', height: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: '0.5px solid #f2f2f2'}}>
        <div style={{ fontSize: '14px' }}>{subject}</div>
        <div style={{ fontSize: '13px', color: '#636363'}}>{referenceNumber}</div>
        <div style={{ fontSize: '12px', color: '#636363', display: 'flex', justifyContent: 'space-between' }}>
          <div>{new Date(createdTime).toDateString()}</div>
          <div style={{ color: statusColor[statusTiLa] || '#F5A624'}}>{statusTiLa}</div>
        </div>
      </div>
    )
  }
  renderTicketColumn = () => {
    const {tktData} = this.props;
    return (
      <div>
        <h4 style={{padding: '0px 20px'}}>MY TICKETS</h4>
        {tktData.length ? tktData.map(this.renderTktTitle) : <div style={{padding: '0px 20px'}}>No Incidents Available</div>}
      </div>
    )
  }
  renderThread = (threadObj, index) => {
    const { nameOfPerson, createdTs, msg } = threadObj
    return(
      <div key={String(index)} style={{ padding: '20px 0px', borderBottom: '0.5px solid #f2f2f2'}}>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '14px', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#CFCFCF', margin: '10px 10px 10px 0px'}}/>
            <div>
              <div>{nameOfPerson || 'User'}</div>
              <div style={{ fontSize: '12px', color: '#98989D'}}>Title</div>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#98989D'}}>
            <div>{new Date(createdTs).toDateString()}</div>
            <div>{new Date(createdTs).toLocaleTimeString()}</div>
          </div>
        </div>
        <div style={{ fontSize: '13px', color: '#98989D'}}>{msg}</div>
        {index === 0 ? 
          <div style={{ padding: '10px 0px'}}>
            <textarea style={{    
              width: '100%',
              borderRadius: '5px',
              borderColor: '#d2d2d2',
              outline: 0,
              fontSize: '14px',
              padding: '10px',
              minHeight:'100px',
              resize: 'vertical'
            }} placeholder='Reply to this message' value={this.state.msg} onChange={this.handleMsg} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '20px 0px'}}>
              <div style={{ position: 'relative', cursor: 'pointer', padding: '5px 10px', border: '1px solid #44689A', color: '#44689A', borderRadius: '5px'}}>
                UPLOAD
                <input type='file' onChange={this.handleAttachements} style={{opacity: 0, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}} />
              </div>
              <div onClick={this.updateIncident} style={{ cursor: 'pointer', padding: '5px 25px', backgroundColor: '#44689A', color: '#ffffff', borderBottomRightRadius: '25px'}}>SEND MESSAGE</div>
            </div>
          </div>
        : null}
      </div>
    )
  }
  renderTicketDetail = () => {
    const { id, referenceNumber, subject, threadTiLaList, statusTiLa} = this.props.tktDetailData || {};
    const threads = (threadTiLaList || []).reverse();
    return(
      <div>
        <div style={{ padding: '10px 0px'}}>{subject}</div>
        <div>{threads.map(this.renderThread)}</div>
      </div>
    )
  }
  render(){
    const { pathname } = window.location;
    console.log(this.props.query);
    const helpCenterUrl = pathname.replace(this.props.query, `faq`)
    return(
      <div>
        <div style={{margin: '10px 2px', fontSize: '13px'}}>
          <a href={helpCenterUrl}>Back to Help Center</a>
        </div>
        <div style={{ width: '100%', display: 'flex'}}>
          <div className={styles['categoryContainer']}>{this.renderTicketColumn()}</div>
          <div className={styles['answersContainer']}>{this.renderTicketDetail()}</div>
          <div><a href='https://fptsuae.custhelp.com/app/chat/chat_landing' target="_blank" /></div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    tktData: state.helpSupportReducer.tktData,
    tktDetailData: state.helpSupportReducer.tktDetailData,
    raiseTktData: state.helpSupportReducer.raiseTktData,
    updateTktData: state.helpSupportReducer.updateTktData,
    userCredentials: authSelectors.getUserCreds(state)
  }), {
    ...helpActions
  }
)(Incidents)