/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { actionCreators as helpActions } from '../../store/helpsupport';
import { selectors as orderSelectors, actionCreators as orderActions} from '../../store/cam/orders';
import { selectors as authSelectors } from '../../store/auth';
import { Issues as issues, countryLanguageHelpCode as clCode } from './helpConstants';
import { mergeCss } from '../../utils/cssUtil';
import constants from '../../constants';


const cookies = new Cookies();

const language = clCode[cookies.get('language') || 'en'];
const country = clCode[cookies.get('country') || 'SAU'];
const userCredentials = cookies.get('userCreds');

const styles = mergeCss('components/Help/help');

class EmailModal extends Component{

  constructor(props){
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
      incidentId: ''
    }
    this.state.selectedIssue && this.state.selectedIssue.orderRelated && this.getOrders();
    this.scrollTimeout = '';
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ordersData !== this.props.ordersData) {
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
      if(issue.orderRelated && !this.state.orders.length) {
        this.getOrders();
      }
    })
  }
  getOrders = () => {
    this.state.currentOrderPage < this.state.totalOrderPages && this.props.getOrderHistory(this.state.currentOrderPage);
  }
  openChat = () => {
    const baseURL = `https://fptsuae.custhelp.com/app/chat/chat_landing`;
    if(!this.state.email || !this.state.selectedIssue){
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
    const categoryCode = `/Incident.Category/${this.state.selectedIssue.category}`;
    const chatURL = `${baseURL}${firstName}${lastName}${email}${categoryCode}${order_number}${countryCode}${languageCode}`;
    window.open(chatURL, '_blank');
  }
  handleOrdersScroll = (e) => {
    clearTimeout(this.scrollTimeout)
    const {scrollHeight, scrollTop, offsetHeight} = e.target;
    if((scrollTop + 10 + offsetHeight) > scrollHeight) {
      this.scrollTimeout = setTimeout(this.getOrders, 100)
    }
  }

  selectOrder = (orderObj) => (e) => {
    this.setState({
      selectedOrder: orderObj
    })
  }
  createIncident = () => {
    if(!this.state.email || !this.state.selectedIssue){
      alert('Email and Issue is mandatory');
      return
    }
    const param = {
      "emailId": this.state.email
    }
    const serverData = {
      "subject": this.state.selectedIssue.q,
      "threads": {
        "entryType": {
          "id": 3
        },
        "text": this.state.msg
      },
      "category": {"id": this.state.selectedIssue.category},
      "customFields": {
        "c": {
          "incident_source_country": {"id": country},
          "incident_source_language": {"id": language},
          ...(this.state.selectedOrder && {"order_number": this.state.selectedOrder.order_item_ids[0]})
        }
      }
    }
    this.props.raiseTicket(param, serverData).then(res => {
      this.setState({
        incidentCreated: true,
        referenceNumber: res.value.data.referenceNumber,
        incidentId: res.value.data.id
      })
    });
  }
  renderIssues = (issue, index) => {
    const {id, q, orderRelated} = issue;
    const isSelected = this.state.selectedIssue.id === id;
    return (
      <div onClick={this.handleIssueSelect(issue)} key={id} 
        style={{ 
          cursor: 'pointer', 
          height: '45px', 
          borderTop: index !== 0 ? '0.5px solid rgb(242,242,242)' : 0, 
          display: 'flex', 
          alignItems: 'center',
          color: isSelected ? '#44689A' : '#000'
          }}
        >
        {q}
      </div>
    )
  }
  renderOrderItems = (orderItemObj, index) => {
    const {order_item_ids, status, variant_info} = orderItemObj;
    const { title, image_url } = variant_info;
    const [order_item_id] = order_item_ids;
    const isSelected = this.state.selectedOrder ? this.state.selectedOrder.order_item_ids[0] === order_item_id : false;
    return (
      <div key={order_item_id} style={{  borderBottom: '0.5px solid #f2f2f2', color: index && isSelected ? '#44689A' : '#000'}} onClick={this.selectOrder(orderItemObj)}>
        <div style={{ height: '110px', padding: 10, display:'flex', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ flexShrink: 0, width: 75, height: 95, padding: 5, borderRadius: 5, border: '0.5px solid #f2f2f2'}}><img style={{width: '100%', height: '100%', objectFit: 'contain'}} src={`${constants.mediaDomain}/${image_url}`} /></div>
          <div style={{ padding: '10px 20px'}}>
            <div>{title}</div>
            <div style={{ margin: '5px 0px', fontSize: '12px'}}>{`Order Status - ${status}`}</div>
          </div>
        </div>
      </div>
    )
  }
  renderOrders = (orderObj, index) => {
    const {order_id, order_items} = orderObj
    return(
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
        <div>Your query has been successfully created with reference - <a href={incidentsURL}>{this.state.referenceNumber}</a>. We will get back to you within 2 hrs</div>
      </div>
    )
  }
  render(){
    const { dropDownType, orders, selectedOrder, selectedIssue, email, incidentCreated, referenceNumber, firstname, lastname } = this.state;
    return (
      <div style={{padding: '20px', fontSize: '14px', display: 'flex', flexDirection: 'column', height: '100%'}}>
        {!incidentCreated ? 
          <React.Fragment>
          <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
          <h4>WHAT CAN WE HELP YOU WITH</h4>
          <h4>X</h4>
        </div>
        <div style={{padding: '40px 0px'}}>
          <div style={{padding: '10px 0px'}}>
            <div style={{ fontSize: '12px', color: '#8C8C92'}}>Enter Email ID</div>
            <input type="text" name="email" value={email} onChange={this.handleUserInfoChange}/>
          </div>
          {this.props.type === 'chat' && 
          <div style={{padding: '10px 0px'}}>
            <div style={{ fontSize: '12px', color: '#8C8C92'}}>Enter Firstname</div>
            <input type="text" name="firstname" value={firstname} onChange={this.handleUserInfoChange}/>
          </div>
          }
          {this.props.type === 'chat' && 
          <div style={{padding: '10px 0px'}}>
            <div style={{ fontSize: '12px', color: '#8C8C92'}}>Enter Lastname</div>
            <input type="text" name="lastname" value={lastname} onChange={this.handleUserInfoChange}/>
          </div>
          }
          <div style={{padding: '30px 0px'}}>
            <div style={{ fontSize: '12px', color: '#8C8C92'}}>Select an Issue</div>
            <div style={{ position: 'relative'}}>
              <div tabIndex={0} onBlur={this.handleDropDown('')} onClick={this.handleDropDown('issue')} 
                style={{ 
                  cursor: 'pointer',
                  width: '100%',
                  height: '35px',
                  borderBottom: '1px solid #c8c6cc',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  outline: 0
                }}>
                <div style={{position: 'absolute', color: '#c8c6cc', right: 0, top: '25%', fontSize: '12px'}}>v</div>
                <div>{selectedIssue ? selectedIssue.q : ''}</div>
              </div>
              <div style={{ 
                visibility: dropDownType !== 'issue' ? 'hidden' : 'visible',
                opacity: dropDownType !== 'issue' ? 0 : 1,
                top: dropDownType !== 'issue' ? '-10px' : '30px',
                borderRadius: '5px',
                padding: '10px',
                position: 'absolute',
                width: '100%',
                margin: '10px 0px',
                boxShadow: '0px 0px 15px -5px #ccc',
                transition: 'all 0.25s',
                backgroundColor: '#fff',
                zIndex: 5
                }}
              >
                {issues.map(this.renderIssues)}
              </div>
            </div>
          </div>
          {selectedIssue && selectedIssue.orderRelated ? 
            <div style={{padding: '30px 0px'}}>
            <div style={{ fontSize: '12px', color: '#8C8C92'}}>Select an Order</div>
            <div style={{ position: 'relative'}}>
              <div tabIndex={1} onBlur={this.handleDropDown('')} onClick={this.handleDropDown('order')} 
                style={{ 
                  cursor: 'pointer',
                  width: '100%',
                  minHeight: '35px',
                  borderBottom: '1px solid #c8c6cc',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center', 
                  outline: 0
                }}>
                <div style={{position: 'absolute', color: '#c8c6cc', right: 0, top: '25%', fontSize: '12px'}}>v</div>
                <div>{selectedOrder ? this.renderOrderItems(selectedOrder) : ''}</div>
              </div>
              <div style={{ 
                visibility: dropDownType !== 'order' ? 'hidden' : 'visible',
                opacity: dropDownType !== 'order' ? 0 : 1,
                top: dropDownType !== 'order' ? '-10px' : '30px',
                borderRadius: '5px',
                padding: '10px',
                position: 'absolute',
                width: '100%',
                margin: '10px 0px',
                boxShadow: '0px 0px 15px -5px #ccc',
                transition: 'all 0.25s',
                backgroundColor: '#fff',
                minHeight: '40px',
                maxHeight: '400px',
                overflow: 'auto'
                }}
                onScroll={this.handleOrdersScroll}
              >
                {orders.length ? orders.map(this.renderOrders) : 'No Orders'}
              </div>
            </div>
          </div>
          : null}
          {this.props.type === "email" ? 
          <div style={{padding: '30px 0px'}}>
            <div style={{ fontSize: '12px', color: '#8C8C92'}}>Write a Message</div>
            <textarea 
              value={this.state.msg}
              onChange={this.handleMsg}
              style={{    
              width: '100%',
              borderRadius: '5px',
              borderColor: '#d2d2d2',
              outline: 0,
              fontSize: '14px',
              padding: '10px',
              minHeight:'250px',
              resize: 'vertical',
              margin: '10px 0px'
            }}/>
          </div> : null}
        </div>
        {this.props.type === "email" ? 
          <div 
            onClick={this.createIncident} 
            style={{ marginTop: '30px', marginBottom: '10px', textAlign: 'center', cursor: 'pointer', padding: '10px 25px', backgroundColor: '#44689A', color: '#ffffff', borderBottomRightRadius: '25px'}}
          >
            SEND EMAIL
          </div>
        : 
          <div
            onClick={this.openChat}
            style={{ marginTop: '30px', marginBottom: '10px', textAlign: 'center', cursor: 'pointer', padding: '10px 25px', backgroundColor: '#44689A', color: '#ffffff', borderBottomRightRadius: '25px'}}
          >
            START CHATTING
          </div>
        }
        </React.Fragment>
        : this.renderPostIncidentCreation()}
        
      </div>
    )
  }
}

export default connect((state) => ({ 
  ordersData: state.ordersReducer.data
}), {...helpActions, ...orderActions})(EmailModal)