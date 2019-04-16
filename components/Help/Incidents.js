/*eslint-disable*/
import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { actionCreators as helpActions } from '../../store/helpsupport';
import { selectors as authSelectors } from '../../store/auth';
import { mergeCss } from '../../utils/cssUtil';

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';
const userCredentials = cookies.get('userCreds');

const styles = mergeCss('components/Help/help');

const statusColor = {
  'New': '#F5A624',
  'Solved': '#AFD75F'
}

const getBase64 = async (file) => {
  let fileObj = {};
  
  return fileObj;
}

const ReplyBox = (props) => {
  const [msg, setMsg] = useState('');
  const [files, setFiles] = useState({});
  const handleMsg = (e) => setMsg(e.target.value);
  const handleAttachements = (e) => {
    const file = e.target.files[0];
    if(file) {
      if(file.size < 10485760) {
        const reader = new FileReader();
        reader.onload = () => { setFiles({[file.name]: reader.result}) };
        reader.onerror = (error) => { console.log('Error: ', error) };
        reader.readAsDataURL(file);
      } else {
        alert('File size limit is 10MB')
      }
    }  
  }
  const removeFile = (fileName) => (e) => {
    const newFileObj = {...files};
    delete newFileObj[fileName]
    setFiles(newFileObj);
  }
  const renderFiles = (fileName, index) => (
    <div key={String(index)} className={`${styles['flex']} ${styles['justify-between']} ${styles['wh-250']}`}>
      <div className={styles['fileNameCont']}>
        <a href={files[fileName]} download={fileName}>{fileName}</a>
      </div>
      <div className={styles['fileNameDelete']} onClick={removeFile(fileName)}>x</div>
    </div>
  )
  return(
    <div className={styles['pV-10']}>
      <textarea className={styles['MsgTextArea']} placeholder='Reply to this message' value={msg} onChange={handleMsg} />
      <div className={styles['MsgBoxContainer']}>
        <div className={styles['UploadButton']}>
          UPLOAD
          <input type='file' onChange={handleAttachements} className={styles['fileInput']} />
        </div>
        <div onClick={props.updateIncident(msg, files)} className={styles['SendMsgButton']}>SEND MESSAGE</div>
      </div>
      {Object.keys(files).length ? 
            <div className={styles['fs-12p']}>
              <div>{`Attachments (${Object.keys(files).length})`}</div>
                {Object.keys(files).map(renderFiles)}
            </div>
          : null}
    </div>
  )
}

class Incidents extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedIncident: (window.location.hash || '#').split('#')[1],
    }
    this.scrollTimeout = '';
    userCredentials && userCredentials.username && this.initiateApiCalls();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.tktData !== this.props.tktData && nextProps.tktData.length &&!this.props.tktData.length) {
      this.selectTicket(nextProps.tktData[0].id)() 
    }
  }
  initiateApiCalls = () => {
    const { username : emailId } = userCredentials;
    this.props.getAllTickets({emailId})
  }
  handleMsg = (e) => {
    this.setState({
      msg: e.target.value
    })
  }
  updateIncident = (msg, files) => (e) => {
    const ticketId = {ticketNumber: this.state.selectedIncident}
    const fileArr = Object.entries(files);
    let contentType = '';
    let data = '';
    if(fileArr.length) {
      const stringArr = fileArr[0][1].split(',');
      data = stringArr[1];
      contentType = stringArr[0].replace('data:','').replace(';base64','')
    }
    const serverData = {
      "threads": {
        "entryType": {
          "id": 3
        },
        "text": msg,
      },
      ...(fileArr.length && {
        "fileAttachments": {
          "fileName": fileArr[0][0],
          data,
          contentType
        },
      })
    }
    msg ? this.props.updateTicket(ticketId, serverData).then(res => {
        this.props.getTicketDetail({ticketNumber: this.state.selectedIncident})
    }) : alert('Enter a message');
  }
  selectTicket = (tktId) => (e) => {
    this.setState({
      selectedIncident: tktId
    }, () => {
      this.props.getTicketDetail({ticketNumber: tktId})
    })
  }
  downloadFile = (incidentId, fileId, fileName, contentType) => (e) => {
    this.props.downloadFileAttachment(incidentId, fileId).then(res => {
      const data = res.value.data.data;
      const dataURL = `data:${contentType};base64,${data}`;
      const attachmentWindow = window.open();
      const element = document.createElement('a');
      element.setAttribute('href', dataURL);
      element.setAttribute('download', fileName);
      element.style.display = 'none';
      attachmentWindow.document.body.appendChild(element);
      element.click();
      attachmentWindow.close();
    })
  }
  renderTktTitle = (tkt) => {
    const {id, createdTime, referenceNumber, subject, statusTiLa} = tkt;
    const isSelected = id === this.state.selectedIncident;
    return (
      <div key={id} onClick={this.selectTicket(id)} className={`${styles['TktTitleContainer']} ${isSelected && styles['openBGColor']}`}>
        <div className={styles['fs-14p']}>{subject}</div>
        <div className={`${styles['fs-13p']} ${styles['greyColor']}`}>{referenceNumber}</div>
        <div className={`${styles['fs-12p']} ${styles['greyColor']} ${styles['flex']} ${styles['justify-between']}`}>
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
        <h4 className={styles['pH-20']}>MY TICKETS</h4>
        <div className={styles['tktClmCont']}>
          {tktData.length ? tktData.map(this.renderTktTitle) : <div className={styles['pH-20']}>No Incidents Available</div>}
        </div>
      </div>
    )
  }
  renderThread = (threadObj) => (threadId, index) => {
    const { nameOfPerson, createdTs, msg, threadSequence } = threadObj[threadId];
    return(
      <div key={threadSequence} className={`${styles['pV-20']} ${styles['bB']}`}>
        <div className={styles['threadContainer']}>
          <div className={`${styles['flex']} ${styles['align-center']}`}>
            <div className={styles['userProfile']}/>
            <div>
              <div>{nameOfPerson || 'User'}</div>
              <div className={`${styles['fs-12p']} ${styles['greyColor']}`}>Title</div>
            </div>
          </div>
          <div className={`${styles['fs-12p']} ${styles['greyColor']}`}>
            <div>{new Date(createdTs).toDateString()}</div>
            <div>{new Date(createdTs).toLocaleTimeString()}</div>
          </div>
        </div>
        <div className={`${styles['fs-13p']} ${styles['greyColor']}`}>{msg}</div>
        {index === 0 ? 
          <ReplyBox updateIncident={this.updateIncident} />
        : null}
      </div>
    )
  }
  renderFile = (fileObj,incidentId) => (fileId, index) => {
    const {fileName, contentType} = fileObj[fileId];
    return (
      <div key={fileId}>
        <a onClick={this.downloadFile(incidentId, fileId, fileName, contentType)}>{fileName}</a>
      </div>
    )
  }
  renderTicketDetail = () => {
    const { id, referenceNumber, subject, threadTiLaList, statusTiLa, fileAttachmentTiLaList} = this.props.tktDetailData || {};
    const threads = (threadTiLaList || []).reduce((acc, val, i) => {
      return {...acc, [val.threadSequence]: val}
    },{});
    const fileAttachments = (fileAttachmentTiLaList || []).reduce((acc, val, i) => {
      return {...acc, [val.fileId]: val}
    },{});
    const fileIds = Object.keys(fileAttachments).sort((a,b) => b - a);
    const threadIds = Object.keys(threads).sort((a,b) => b - a);
    return(
      <div>
        <div className={styles['pV-10']}>{subject}</div>
        <div>{threadIds.map(this.renderThread(threads))}</div>
        {fileIds.length ? 
          <div className={`${styles['pV-10']} ${styles['fs-14p']}`}>
            <div>{`All Attachments (${fileIds.length})`}</div>
            <div>{fileIds.map(this.renderFile(fileAttachments, id))}</div>
          </div>
        : null}
        
      </div>
    )
  }
  render(){
    const { pathname } = window.location;
    const helpCenterUrl = pathname.replace(this.props.query, `faq`)
    return(
      <div>
        <div className={`${styles['mV-10']} ${styles['mH-5']} ${styles['fs-13p']}`}>
          <a href={helpCenterUrl}>Back to Help Center</a>
        </div>
        <div className={styles['tktContainer']}>
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