import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import { actionCreators as helpActions } from '../../store/helpsupport';
import { selectors as orderSelectors, actionCreators as orderActions } from '../../store/cam/orders';
import { selectors as authSelectors } from '../../store/auth';
import { countryLanguageHelpCode as clCode } from './helpConstants';
import FormValidator from '../common/FormValidator';
import constants from '../../constants';
import ToastContent from '../common/ToastContent';
import SVGComponent from '../common/SVGComponet';

import lang from '../../utils/language';
import { languageDefinations } from '../../utils/lang';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './help_en.styl';
import styles_ar from './help_ar.styl';

const languageLabel = languageDefinations();


import { toast } from 'react-toastify';
const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const { HNS } = languageDefinations();

const cookies = new Cookies();

const language = clCode[cookies.get('language') || 'ar'];
const country = clCode[cookies.get('country') || 'SAU'];
const sort = (a, b) => a - b;

const FileAttachment = (props) => {
  const handleAttachements = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size < 10485760) {
        const reader = new FileReader();
        reader.onload = () => { props.setFiles({ [file.name]: reader.result }); };
        reader.onerror = (error) => { console.log('Error: ', error); };
        reader.readAsDataURL(file);
      } else {
        alert(HNS.FILE_SIZE_LIMIT);
      }
    }
  };
  const removeFile = fileName => (e) => {
    const newFileObj = { ...props.files };
    delete newFileObj[fileName];
    props.setFiles(newFileObj);
  };

  const renderFiles = (fileName, index) => (
    <div key={String(index)} className={`${styles.flex} ${styles['justify-between']} ${styles['wh-250']}`}>
      <div className={styles.fileNameCont}>
        <a href={props.files[fileName]} download={fileName}>{fileName}</a>
      </div>
      <div className={styles.fileNameDelete} onClick={removeFile(fileName)}>x</div>
    </div>
  );
  return (
    <div>
      <div className={styles['pV-10']}>
        <div className={styles.fileUploadInputCont}>
          <input type="file" disabled={props.loading} onChange={handleAttachements} className={styles.fileInput} />
          <div>
            <div className={styles.fa}>
              <div className={styles.fileAttachIcon}>
                <SVGComponent src="helpsupport/hnsAttach" />
              </div>
              <div>
                {HNS.ATTACH}
              </div>
            </div>
            <div className={`${styles['fs-12p']} ${styles.greyColor}`}>
              {HNS.ATTACH_FILE_TYPES}
            </div>
          </div>
        </div>
      </div>
      {Object.keys(props.files).length ?
        <div className={styles['fs-12p']}>
          <div>{`${HNS.ATTACHMENTS} (${Object.keys(props.files).length})`}</div>
          {Object.keys(props.files).map(renderFiles)}
        </div>
        : null}
    </div>
  );
};


class EmailModal extends Component {

  constructor(props) {
    super(props);
    this.validations = new FormValidator([
      {
        field: 'email',
        method: this.emptyValue,
        message: HNS.EMAIL_ERROR,
        validWhen: false,
      },
      {
        field: 'email',
        method: this.checkEmailValidation,
        message: HNS.ENTER_CORRECT_EMAIL,
        validWhen: false,
      },
      {
        field: 'issueSearchQuery',
        method: this.emptyValue,
        message: HNS.SELECT_ISSUE,
        validWhen: false,
      },
      {
        field: 'message',
        method: props.type === 'chat' ? () => false : this.emptyValue,
        validWhen: false,
        message: HNS.ENTER_MESSAGE,
      },
    ]);
    this.state = {
      showDropDown: false,
      dropDownType: '',
      selectedIssue: props.selectedIssue || '',
      selectedOrder: props.selectedOrder || '',
      orders: [],
      currentOrderPage: 0,
      totalOrderPages: 1,
      email: props.isLoggedIn ? props && props.userInfo && props.userInfo.contactInfo && props.userInfo.contactInfo.email : '',
      firstname: '',
      lastname: '',
      incidentCreated: false,
      referenceNumber: '',
      incidentId: '',
      files: {},
      issueSearchQuery: props.selectedIssue ? props.selectedIssue.q.trim() : ''
    };
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
      });
    }
  }
  stripHtml = (html) => {
   var tmp = document.createElement('DIV');
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || '';
  }
  handleDropDown = type => (e) => {
    this.setState({
      showDropDown: !this.state.showDropDown,
      dropDownType: type === this.state.dropDownType ? '' : type
    });
  }
  handleUserInfoChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleMsg = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleIssueSelect = issue => (e) => {
    const q = this.stripHtml(issue.q);
    this.setState({
      selectedIssue: { ...issue, q },
      showDropDown: false,
      dropDownType: '',
      selectedOrder: issue.orderRelated ? this.state.selectedOrder : '',
      issueSearchQuery: q
    }, () => {
      if (issue.orderRelated && !this.state.orders.length) {
        this.props.isLoggedIn && this.getOrders();
      }
    });
  }
  getOrders = () => {
    this.state.currentOrderPage < this.state.totalOrderPages && this.props.getOrderHistory(this.state.currentOrderPage);
  }
  openChat = () => {
    const validation = this.validations.validate(this.state);
    if (validation.isValid) {
    const baseURL = lang === 'en' ? `https://tila-en.custhelp.com/app/chat/chat_landing` : `https://tila-ar.custhelp.com/app/chat/chat_landing`;
    const baseCustomObjectUrl = `/Incident.CustomFields.c`
    const firstName = this.state.firstname ? `/Contact.Name.First/${this.state.firstname}` : '';
    const lastName = this.state.lastname ? `/Contact.Name.Last/${this.state.lastname}` : '';
    const email = `/Contact.Email.0.Address/${this.state.email}`;
    const order_number = this.state.selectedOrder ? `${baseCustomObjectUrl}.order_number/${this.state.selectedOrder.order_item_ids[0]}` : '';
    const countryCode = `${baseCustomObjectUrl}.incident_source_country`;
    const languageCode = `${baseCustomObjectUrl}.incident_source_language/${language}`;
    const categoryCode = this.state.selectedIssue.catId ? `/Incident.Category/${Number(this.state.selectedIssue.catId)}` : '';
    const chatURL = `${baseURL}${firstName}${lastName}${email}${categoryCode}${order_number}${countryCode}${languageCode}`;
    window.open(chatURL, '_blank');
    }
    this.setState({ validation });
  }
  handleOrdersScroll = (e) => {
    clearTimeout(this.scrollTimeout);
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if ((scrollTop + 10 + offsetHeight) > scrollHeight) {
      this.scrollTimeout = setTimeout(this.getOrders, 100);
    }
  }

  selectOrder = orderObj => (e) => {
    this.setState({
      selectedOrder: orderObj
    });
  }

  setFiles = (files) => {
    this.setState({
      files
    });
  }

  focusIssueSearch = (e) => {
    this.setState({
      issueSearchQuery: '',
      showDropDown: true,
      dropDownType: 'issue'
    });
  }

  handleIssueSearch = (e) => {
    this.setState({
      issueSearchQuery: e.target.value,
      [e.target.name]: e.target.value,
      ...(!!!e.target.value || (this.state.selectedIssue && this.state.selectedIssue.q.trim() !== e.target.value) && { selectedIssue: '', showDropDown: true, dropDownType: 'issue' }),
    });
  }

  emptyValue = fieldValue => (fieldValue === '' || fieldValue === undefined);

  checkEmailValidation = (fieldValue) => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(fieldValue)) return false;
    return true;
  }

  handleValidation = ({ target }) => {
    const validation = this.validations.validateOnBlur({ [target.name]: target.value });
    this.setState({ validation });
  }

  handleIssueSelectSearch = issueArr => (e) => {
    if (e.keyCode === 13) {
      const [id, q, catId, parentId, orderRelated] = this.props.allIssueData[issueArr[0]];
      const issueObj = { id, q, catId, parentId, orderRelated };
      this.handleIssueSelect(issueObj)(e);
    }
    if (e.type === 'blur') {
      if(this.state.issueSearchQuery) {
        this.handleIssueSelectSearch(issueArr)({ keyCode: 13 });
      } else {
        this.state.selectedIssue && this.setState({
          issueSearchQuery: this.state.selectedIssue.q.trim()
        });
      }
    }

  }

  createIncident = () => {
    const validation = this.validations.validate(this.state);
    const param = {
      'emailId': this.state.email
    };
    const fileArr = Object.entries(this.state.files);
    let contentType = '';
    let data = '';
    if(fileArr.length) {
      const stringArr = fileArr[0][1].split(',');
      data = stringArr[1];
      contentType = stringArr[0].replace('data:','').replace(';base64','');
    }
    const serverData = {
      'subject': this.state.selectedIssue.q,
      'threads': {
        'entryType': {
          'id': 3
        },
        'text': this.state.message
      },
      'channel': { 'id': 9 },
      ...(this.state.selectedIssue.catId && { 'category': { 'id': Number(this.state.selectedIssue.catId) } }),
      'customFields': {
        'c': {
          'incident_source_country': { 'id': country },
          'incident_source_language': { 'id': language },
          ...(this.state.selectedOrder && { 'order_number': this.state.selectedOrder.order_item_ids[0] })
        }
      },
      ...(fileArr.length && {
        'fileAttachments': {
          'fileName': fileArr[0][0],
          data,
          contentType
        },
      })
    };
    validation.isValid && this.props.raiseTicket(param, serverData).then((res) => {
      const { pathname } = window.location;
      const incidentsURL = pathname.replace(this.props.query, `incidents#${this.state.incidentId}`);
      this.setState({
        incidentCreated: false,
        referenceNumber: res.value.data.referenceNumber,
        incidentId: res.value.data.id
      }, () => {
        this.props.closeModal();
        toast(
          <ToastContent
            msg={`${HNS.QUERY_SUCCESS} - ${this.state.referenceNumber}. ${HNS.QUERY_TIME}`}
            msgType='success'
          />,
          { autoClose: 5000 }
        );
      });
    });
    this.setState({ validation });
  }
  renderIssues = (issue, index) => {
    const [id, q, catId, parentId, orderRelated] = this.props.allIssueData[issue];
    const issueObj = { id, q, catId, parentId, orderRelated };
    const isSelected = this.state.selectedIssue.id === id;
    return (
      <div onMouseDown={this.handleIssueSelect(issueObj)} key={id}
        className={`${styles.facp} ${styles['ht-45']} ${index !== 0 && styles.bT} ${isSelected && styles.highlightColor}`}
        dangerouslySetInnerHTML={{ __html: q }}
      />
    );
  }
  renderOrderItems = (orderItemObj, index) => {
    const { order_item_ids, status, variant_info } = orderItemObj;
    const { title, image_url } = variant_info;
    const [order_item_id] = order_item_ids;
    const isSelected = this.state.selectedOrder ? this.state.selectedOrder.order_item_ids[0] === order_item_id : false;
    return (
      <div key={order_item_id} className={`${styles.bB} ${index !== undefined && isSelected && styles.highlightColor}`} onClick={this.selectOrder(orderItemObj)}>
        <div className={styles.orderItemContainer}>
          <div className={styles.orderImgContainer}><img className={styles.imgContain} src={`${constants.mediaDomain}/${image_url}`} /></div>
          <div className={styles['p-10-20']}>
            <div>{title}</div>
            <div className={`${styles['mV-5']} ${styles['fs-12p']}`}>{`${HNS.ORDER_STATUS} - ${status}`}</div>
          </div>
        </div>
      </div>
    );
  }
  renderOrders = (orderObj, index) => {
    const { order_id, order_items } = orderObj;
    return (
      <div key={order_id}>
        <div>
          {order_items.map(this.renderOrderItems)}
        </div>
      </div>
    );
  }
  render() {
    const { dropDownType, orders, selectedOrder, selectedIssue, email, incidentCreated, referenceNumber, firstname, lastname, validation } = this.state;
    const { allIssueData } = this.props;
    const allIssues = Object.keys(allIssueData).sort(sort);
    const allIssuesVal = Object.values(allIssueData);
    const searchIssues = this.state.issueSearchQuery ? allIssuesVal.filter(iss => iss[1].toLowerCase().includes(this.state.issueSearchQuery.toLowerCase()) || iss[1] === 'Others').map(iss => iss[0]) : allIssues;
    return (
      <div className={styles.modalCont}>
        {!incidentCreated ?
          <React.Fragment>
            <div className={styles.modalTitleContainer}>
              <h4>{HNS.MODAL_TITLE_MSG}</h4>
              <h4 className={styles.pointer} onClick={this.props.closeModal}>X</h4>
            </div>
            <div className={styles['pV-40']}>
              <div className={styles['pV-10']}>
                <div className={styles.formLabel}>{HNS.ENTER_EMAIL}</div>
                <input disabled={this.props.isLoggedIn} type="text" dir="auto" name="email" value={email} onChange={this.handleUserInfoChange} onBlur={this.handleValidation}/>
                {
                  validation && validation.email && validation.email.isInValid ?
                    <div>
                      <span className={`${styles['error-msg']}`}>{validation.email.message}</span>
                    </div> : null
                }
              </div>
              {this.props.type === 'chat' &&
                <div className={styles['pV-10']}>
                  <div className={styles.formLabel}>{HNS.ENTER_FIRSTNAME}</div>
                  <input type="text" dir="auto" name="firstname" value={firstname} onChange={this.handleUserInfoChange} />
                </div>
              }
              {this.props.type === 'chat' &&
                <div className={styles['pV-10']}>
                  <div className={styles.formLabel}>{HNS.ENTER_LASTNAME}</div>
                  <input type="text" dir="auto" name="lastname" value={lastname} onChange={this.handleUserInfoChange} />
                </div>
              }
              <div className={styles['pV-20']}>
                <div className={styles.formLabel}>{HNS.SELECT_ISSUE_MODAL}</div>
                <div className={styles.relative}>
                  <div tabIndex={0} onBlur={this.handleDropDown('')}
                    className={styles.dropDownInput}
                  >
                    <input type="text"
                      dir="auto"
                      name="issue"
                      className={styles.searchInputIssue}
                      placeholder={selectedIssue ? selectedIssue.q.trim() : ''}
                      value={this.state.issueSearchQuery}
                      onChange={this.handleIssueSearch}
                      onFocus={this.focusIssueSearch}
                      // onBlur={this.handleIssueSelectSearch(searchIssues)}
                      onKeyUp={this.handleIssueSelectSearch(searchIssues)}
                      onBlur={this.handleValidation}
                    />
                    <div className={styles.dropDownArrow}>v</div>
                    {/* <div dangerouslySetInnerHTML={{ __html: selectedIssue ? selectedIssue.q : '' }} /> */}
                  </div>
                  <div className={dropDownType !== 'issue' ? styles['dropDownBox-close'] : styles['dropDownBox-open']}
                  >
                    {searchIssues.map(this.renderIssues)}
                  </div>
                </div>
                {
                  validation && validation.issueSearchQuery && validation.issueSearchQuery.isInValid ?
                    <div>
                      <span className={`${styles['error-msg']}`}>{validation.issueSearchQuery.message}</span>
                    </div> : null
                }
              </div>
              {selectedIssue && selectedIssue.orderRelated && this.props.isLoggedIn ?
                <div className={styles['pV-20']}>
                  <div className={styles.formLabel}>{HNS.SELECT_ORDER}</div>
                  <div className={styles.relative}>
                    <div tabIndex={1} onBlur={this.handleDropDown('')} onClick={this.handleDropDown('order')}
                      className={styles.dropDownInput}
                    >
                      <div className={styles.dropDownArrow}>v</div>
                      <div>{selectedOrder ? this.renderOrderItems(selectedOrder) : ''}</div>
                    </div>
                    <div className={dropDownType !== 'order' ? styles['dropDownBox-close'] : styles['dropDownBox-open']}
                      onScroll={this.handleOrdersScroll}
                    >
                      {orders.length ? orders.map(this.renderOrders) : HNS.NO_ORDERS}
                    </div>
                  </div>
                </div>
                : null}
              {this.props.type === 'email' ?
                <div className={styles['pV-20']}>
                  <div className={styles.formLabel}>{HNS.WRITE_MSG}</div>
                  <textarea
                    dir="auto"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleMsg}
                    className={styles.ModalTextArea}
                  />
                  {
                  validation && validation.message && validation.message.isInValid ?
                    <div>
                      <span className={`${styles['error-msg']}`}>{validation.message.message}</span>
                    </div> : null
                }
                </div>
                : null
              }
              {this.props.type === 'email' ?
                <FileAttachment setFiles={this.setFiles} files={this.state.files} /> : null
              }
            </div>
            {this.props.type === 'email' ?
              <div
                onClick={this.createIncident}
                className={styles.modalFormButton}
              >
                {HNS.SEND_EMAIL}
          </div>
              :
              <div
                onClick={this.openChat}
                className={styles.modalFormButton}
              >
                {HNS.START_CHATTING}
          </div>
            }
          </React.Fragment>
          : null
        }

      </div>
    );
  }
}

export default connect(state => ({
  ordersData: state.ordersReducer.data,
  allIssueData: state.helpSupportReducer.allIssueData
}), { ...helpActions, ...orderActions })(EmailModal);
