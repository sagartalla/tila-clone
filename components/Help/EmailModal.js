/*eslint-disable*/
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { actionCreators as helpActions } from '../../store/helpsupport';
import { selectors as orderSelectors, actionCreators as orderActions } from '../../store/cam/orders';
import { selectors as authSelectors } from '../../store/auth';
import { countryLanguageHelpCode as clCode } from './helpConstants';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './help_en.styl';
import styles_ar from './help_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

import constants from '../../constants';
import { toast } from 'react-toastify';
import ToastContent from '../common/ToastContent';
import SVGComponent from '../common/SVGComponet';


const cookies = new Cookies();

const language = clCode[cookies.get('language') || 'en'];
const country = clCode[cookies.get('country') || 'SAU'];
const userCredentials = cookies.get('userCreds');
const sort = (a, b) => a - b;

const FileAttachment = (props) => {
  const handleAttachements = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size < 10485760) {
        const reader = new FileReader();
        reader.onload = () => { props.setFiles({ [file.name]: reader.result }) };
        reader.onerror = (error) => { console.log('Error: ', error) };
        reader.readAsDataURL(file);
      } else {
        alert('File size limit is 10MB')
      }
    }
  }
  const removeFile = (fileName) => (e) => {
    const newFileObj = { ...props.files };
    delete newFileObj[fileName]
    props.setFiles(newFileObj);
  }
  const renderFiles = (fileName, index) => (
    <div key={String(index)} className={`${styles['flex']} ${styles['justify-between']} ${styles['wh-250']}`}>
      <div className={styles['fileNameCont']}>
        <a href={props.files[fileName]} download={fileName}>{fileName}</a>
      </div>
      <div className={styles['fileNameDelete']} onClick={removeFile(fileName)}>x</div>
    </div>
  )
  return (
    <div>
      <div className={styles['pV-10']}>
        <div className={styles['fileUploadInputCont']}>
          <input type="file" disabled={props.loading} onChange={handleAttachements} className={styles['fileInput']} />
          <div>
            <div className={styles['fa']}>
              <div className={styles['fileAttachIcon']}>
                <SVGComponent src={`helpsupport/hnsAttach`} />
              </div>
              <div>
                Attach Files
                      </div>
            </div>
            <div className={`${styles['fs-12p']} ${styles['greyColor']}`}>
              Jpeg, Pdf, PNG less than 8 MB
                    </div>
          </div>
        </div>
      </div>
      {Object.keys(props.files).length ?
        <div className={styles['fs-12p']}>
          <div>{`Attachments (${Object.keys(props.files).length})`}</div>
          {Object.keys(props.files).map(renderFiles)}
        </div>
        : null}
    </div>
  )
}


class EmailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
      dropDownType: '',
      selectedIssue: props.selectedIssue || '',
      selectedOrder: props.selectedOrder || '',
      orders: [],
      currentOrderPage: 0,
      totalOrderPages: 1,
      email: props.isLoggedIn ? userCredentials.username : '',
      firstname: '',
      lastname: '',
      incidentCreated: false,
      referenceNumber: '',
      incidentId: '',
      files: {}
    }
    this.state.selectedIssue && this.state.selectedIssue.orderRelated && this.getOrders();
    props.getAllIssues();
    this.scrollTimeout = '';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ordersData !== this.props.ordersData) {
      this.setState({
        orders: [...this.state.orders, ...nextProps.ordersData.orders],
        currentOrderPage: nextProps.ordersData.page + 1,
        totalOrderPages: nextProps.ordersData.total_pages
      })
    }
  }

  handleDropDown = (type) => (e) => {
    this.setState({
      showDropDown: !this.state.showDropDown,
      dropDownType: type === this.state.dropDownType ? '' : type
    })
  }
  handleUserInfoChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleMsg = (e) => {
    this.setState({
      msg: e.target.value
    })
  }
  handleIssueSelect = (issue) => (e) => {
    this.setState({
      selectedIssue: issue,
      showDropDown: false,
      dropDownType: '',
      selectedOrder: issue.orderRelated ? this.state.selectedOrder : ''
    }, () => {
      if (issue.orderRelated && !this.state.orders.length) {
        this.getOrders();
      }
    })
  }
  getOrders = () => {
    this.state.currentOrderPage < this.state.totalOrderPages && this.props.getOrderHistory(this.state.currentOrderPage);
  }
  openChat = () => {
    const baseURL = `https://fptsuae.custhelp.com/app/chat/chat_landing`;
    if (!this.state.email || !this.state.selectedIssue) {
      alert('Email and Issue is mandatory');
      return
    }
    const baseCustomObjectUrl = `/Incident.CustomFields.c`
    const firstName = this.state.firstname ? `/Contact.Name.First/${this.state.firstname}` : '';
    const lastName = this.state.lastname ? `/Contact.Name.Last/${this.state.lastname}` : '';
    const email = `/Contact.Email.0.Address/${this.state.email}`;
    const order_number = this.state.selectedOrder ? `${baseCustomObjectUrl}.order_number/${this.state.selectedOrder.order_item_ids[0]}` : '';
    const countryCode = `${baseCustomObjectUrl}.incident_source_country/${country}`;
    const languageCode = `${baseCustomObjectUrl}.incident_source_language/${language}`;
    const categoryCode = this.state.selectedIssue.catId ? `/Incident.Category/${Number(this.state.selectedIssue.catId)}` : '';
    const chatURL = `${baseURL}${firstName}${lastName}${email}${categoryCode}${order_number}${countryCode}${languageCode}`;
    window.open(chatURL, '_blank');
  }
  handleOrdersScroll = (e) => {
    clearTimeout(this.scrollTimeout)
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if ((scrollTop + 10 + offsetHeight) > scrollHeight) {
      this.scrollTimeout = setTimeout(this.getOrders, 100)
    }
  }

  selectOrder = (orderObj) => (e) => {
    this.setState({
      selectedOrder: orderObj
    })
  }

  setFiles = (files) => {
    this.setState({
      files
    })
  }

  createIncident = () => {
    if (!this.state.email || !this.state.selectedIssue) {
      alert('Email and Issue is mandatory');
      return
    }
    const param = {
      "emailId": this.state.email
    }
    const fileArr = Object.entries(this.state.files);
    let contentType = '';
    let data = '';
    if(fileArr.length) {
      const stringArr = fileArr[0][1].split(',');
      data = stringArr[1];
      contentType = stringArr[0].replace('data:','').replace(';base64','')
    }
    const serverData = {
      "subject": this.state.selectedIssue.q,
      "threads": {
        "entryType": {
          "id": 3
        },
        "text": this.state.msg
      },
      "channel": { "id": 9 },
      ...(this.state.selectedIssue.catId && { "category": { "id": Number(this.state.selectedIssue.catId) } }),
      "customFields": {
        "c": {
          "incident_source_country": { "id": country },
          "incident_source_language": { "id": language },
          ...(this.state.selectedOrder && { "order_number": this.state.selectedOrder.order_item_ids[0] })
        }
      },
      ...(fileArr.length && {
        "fileAttachments": {
          "fileName": fileArr[0][0],
          data,
          contentType
        },
      })
    }
    this.props.raiseTicket(param, serverData).then(res => {
      const { pathname } = window.location;
      const incidentsURL = pathname.replace(this.props.query, `incidents#${this.state.incidentId}`)
      this.setState({
        incidentCreated: false,
        referenceNumber: res.value.data.referenceNumber,
        incidentId: res.value.data.id
      }, () => {
        this.props.closeModal();
        toast(
          <ToastContent
            msg={`Your query has been successfully created with reference - ${this.state.referenceNumber}. We will get back to you within 48 hrs`}
            msgType='success'
          />,
          { autoClose: 5000 }
        )
      })
    });
  }
  renderIssues = (issue, index) => {
    const [id, q, catId, parentId, orderRelated] = this.props.allIssueData[issue];
    const issueObj = { id, q, catId, parentId, orderRelated };
    const isSelected = this.state.selectedIssue.id === id;
    return (
      <div onClick={this.handleIssueSelect(issueObj)} key={id}
        className={`${styles['facp']} ${styles['ht-45']} ${index !== 0 && styles['bT']} ${isSelected && styles['highlightColor']}`}
        dangerouslySetInnerHTML={{ __html: q }}
      />
    )
  }
  renderOrderItems = (orderItemObj, index) => {
    const { order_item_ids, status, variant_info } = orderItemObj;
    const { title, image_url } = variant_info;
    const [order_item_id] = order_item_ids;
    const isSelected = this.state.selectedOrder ? this.state.selectedOrder.order_item_ids[0] === order_item_id : false;
    return (
      <div key={order_item_id} className={`${styles['bB']} ${index !== undefined && isSelected && styles['highlightColor']}`} onClick={this.selectOrder(orderItemObj)}>
        <div className={styles['orderItemContainer']}>
          <div className={styles['orderImgContainer']}><img className={styles['imgContain']} src={`${constants.mediaDomain}/${image_url}`} /></div>
          <div className={styles['p-10-20']}>
            <div>{title}</div>
            <div className={`${styles['mV-5']} ${styles['fs-12p']}`}>{`Order Status - ${status}`}</div>
          </div>
        </div>
      </div>
    )
  }
  renderOrders = (orderObj, index) => {
    const { order_id, order_items } = orderObj
    return (
      <div key={order_id}>
        <div>
          {order_items.map(this.renderOrderItems)}
        </div>
      </div>
    )
  }
  renderPostIncidentCreation = () => {
    const { pathname } = window.location;
    const incidentsURL = pathname.replace(this.props.query, `incidents#${this.state.incidentId}`)
    return (
      <div>
        <h4>Help is on the way</h4>
        <div>Your query has been successfully created with reference - <a href={incidentsURL}>{this.state.referenceNumber}</a>. We will get back to you within 48 hrs</div>
      </div>
    )
  }
  render() {
    const { dropDownType, orders, selectedOrder, selectedIssue, email, incidentCreated, referenceNumber, firstname, lastname } = this.state;
    const { allIssueData } = this.props;
    const issues = Object.keys(allIssueData).sort(sort)
    return (
      <div className={styles['modalCont']}>
        {!incidentCreated ?
          <React.Fragment>
            <div className={styles['modalTitleContainer']}>
              <h4>WHAT CAN WE HELP YOU WITH</h4>
              <h4 className={styles['pointer']} onClick={this.props.closeModal}>X</h4>
            </div>
            <div className={styles['pV-40']}>
              <div className={styles['pV-10']}>
                <div className={styles['formLabel']}>Enter Email ID</div>
                <input type="text" name="email" value={email} onChange={this.handleUserInfoChange} />
              </div>
              {this.props.type === 'chat' &&
                <div className={styles['pV-10']}>
                  <div className={styles['formLabel']}>Enter Firstname</div>
                  <input type="text" name="firstname" value={firstname} onChange={this.handleUserInfoChange} />
                </div>
              }
              {this.props.type === 'chat' &&
                <div className={styles['pV-10']}>
                  <div className={styles['formLabel']}>Enter Lastname</div>
                  <input type="text" name="lastname" value={lastname} onChange={this.handleUserInfoChange} />
                </div>
              }
              <div className={styles['pV-20']}>
                <div className={styles['formLabel']}>Select an Issue</div>
                <div className={styles['relative']}>
                  <div tabIndex={0} onBlur={this.handleDropDown('')} onClick={this.handleDropDown('issue')}
                    className={styles['dropDownInput']}
                  >
                    <div className={styles['dropDownArrow']}>v</div>
                    <div dangerouslySetInnerHTML={{ __html: selectedIssue ? selectedIssue.q : '' }} />
                  </div>
                  <div className={dropDownType !== 'issue' ? styles['dropDownBox-close'] : styles['dropDownBox-open']}
                  >
                    {issues.map(this.renderIssues)}
                  </div>
                </div>
              </div>
              {selectedIssue && selectedIssue.orderRelated && this.props.isLoggedIn ?
                <div className={styles['pV-20']}>
                  <div className={styles['formLabel']}>Select an Order</div>
                  <div className={styles['relative']}>
                    <div tabIndex={1} onBlur={this.handleDropDown('')} onClick={this.handleDropDown('order')}
                      className={styles['dropDownInput']}
                    >
                      <div className={styles['dropDownArrow']}>v</div>
                      <div>{selectedOrder ? this.renderOrderItems(selectedOrder) : ''}</div>
                    </div>
                    <div className={dropDownType !== 'order' ? styles['dropDownBox-close'] : styles['dropDownBox-open']}
                      onScroll={this.handleOrdersScroll}
                    >
                      {orders.length ? orders.map(this.renderOrders) : 'No Orders'}
                    </div>
                  </div>
                </div>
                : null}
              {this.props.type === "email" ?
                <div className={styles['pV-20']}>
                  <div className={styles['formLabel']}>Write a Message</div>
                  <textarea
                    value={this.state.msg}
                    onChange={this.handleMsg}
                    className={styles['ModalTextArea']}
                  />
                </div>
                : null
              }
              <FileAttachment setFiles={this.setFiles} files={this.state.files} />
            </div>
            {this.props.type === "email" ?
              <div
                onClick={this.createIncident}
                className={styles['modalFormButton']}
              >
                SEND EMAIL
          </div>
              :
              <div
                onClick={this.openChat}
                className={styles['modalFormButton']}
              >
                START CHATTING
          </div>
            }
          </React.Fragment>
          : <React.Fragment>
            <div className={styles['modalTitleContainer']}>
              <h4>Incident Created</h4>
              <h4 className={styles['pointer']} onClick={this.props.closeModal}>X</h4>
            </div>
            {this.renderPostIncidentCreation()}
          </React.Fragment>
        }

      </div>
    )
  }
}

export default connect((state) => ({
  ordersData: state.ordersReducer.data,
  allIssueData: state.helpSupportReducer.allIssueData
}), { ...helpActions, ...orderActions })(EmailModal)
