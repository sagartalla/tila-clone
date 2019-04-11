/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { actionCreators as helpActions } from '../../store/helpsupport';
import { selectors as orderSelectors, actionCreators as orderActions} from '../../store/cam/orders';
import { selectors, actionCreators as orderDetailActions } from '../../store/order';
import constants from '../../constants';
import { ContactTabs, Issues as issues } from './helpConstants';
import { mergeCss } from '../../utils/cssUtil';

const styles = mergeCss('components/Help/help');

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class Orders extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedIssue: '',
      selectedOrder: '',
      orders: [],
      currentOrderPage: 0,
      totalOrderPages: 1,
    }
    this.scrollTimeout = '';
    this.orderId = (window.location.hash || '#').split('#')[1]
    this.orderId ? this.props.getOrderDetails({orderId: this.orderId}) : this.getOrders();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.ordersData !== this.props.ordersData) {
      this.setState({
        orders: [...this.state.orders, ...nextProps.ordersData.orders],
        currentOrderPage: nextProps.ordersData.page + 1,
        totalOrderPages: nextProps.ordersData.total_pages
      })
    }
    if(nextProps.ordersDetailData !== this.props.ordersDetailData && nextProps.ordersDetailData.order_id && nextProps.ordersDetailData.order_id === this.orderId) {
      this.setState({
        orders: [nextProps.ordersDetailData]
      })
    }
  }
  getOrders = () => {
    this.state.currentOrderPage < this.state.totalOrderPages && this.props.getOrderHistory(this.state.currentOrderPage);
  }
  handleOrdersScroll = (e) => {
    clearTimeout(this.scrollTimeout)
    const {scrollHeight, scrollTop, offsetHeight} = e.target;
    if((scrollTop + 10 + offsetHeight) > scrollHeight) {
      this.scrollTimeout = setTimeout(this.getOrders, 100)
    }
  }
  selectIssue = (issueId) => (e) => {
    this.setState({
      selectedIssue: issueId
    })
  }
  selectOrder = (orderItemObj) => (e) => {
    this.setState({
      selectedOrder: orderItemObj
    })
  }

  renderSupportBox = () => (
    <div className={styles['SupportBoxContainer']}>
      <div style={{ fontWeight: '800', color: '#000000'}}>
        Issue still not resolved ?
      </div>
      <div>
        Feel free to talk to us about any queries or feedback. Customer satisfaction is our highest priority.
      </div>
      <div>
        <div className={styles['contactContainer']} style={{position: 'static'}}>
          {ContactTabs.map(this.props.renderContactCard(this.state.selectedOrder, this.state.selectedIssue))}
        </div>
      </div>
    </div>
  )
  renderIssues = (orderItemId) => (issueObj) => {
    const {id, q, a, orderRelated} = issueObj
    const issueId = `${orderItemId}-${id}`
    const isSelected = this.state.selectedIssue.id === id;
    return (
      orderRelated ?
      <div key={id} 
        style={{ color: '#636363' ,fontSize: '14px', padding: '10px 10px', backgroundColor: isSelected ? '#F8F8F8' : 'transparent'}} 
        onClick={this.selectIssue(issueObj)}>
        <h5 style={{ color: isSelected ? '#43689A' : '#000000', fontWeight: isSelected ? '800' : '500', cursor: 'pointer'}}>{q}</h5>
        <div style={{ height: isSelected ? 'auto' : 0, overflow: 'hidden'}}>
          <h5 style={{ borderBottom: '0.5px solid #E3E4E4', paddingBottom: '20px'}}>
            {a}
          </h5>
          {this.renderSupportBox()}
        </div>
      </div> : null
    )
  }
  renderOrderItems = (orderItemObj, index) => {
    const {order_item_ids, status, variant_info, order_id} = orderItemObj;
    const { title, image_url } = variant_info;
    const [order_item_id] = order_item_ids;
    const isSelected = this.state.selectedOrder ? this.state.selectedOrder.order_item_ids[0] === order_item_id : false;
    const orderURL =`/${country}/${language}/cam/orders/${order_id}`
    return (
      <div key={order_item_id} style={{  borderBottom: '0.5px solid #f2f2f2'}} onClick={this.selectOrder(orderItemObj)}>
        <div className={styles['facp']} style={{ height: '110px', padding: 10 }}>
          <div className={styles['orderImgContainer']}><img className={styles['imgContain']} src={`${constants.mediaDomain}/${image_url}`} /></div>
          <div style={{display: 'flex', fontSize: '14px', flexGrow: 1, padding: '10px 20px'}}>{title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={styles['SelectIssueButton']}>Select Issue</div>
            <div style={{ margin: '5px', fontSize: '12px'}}>{`Order Status - ${status} - `}<a href={orderURL}>View detail</a></div>
          </div>
        </div>
        <div style={{borderTop: isSelected ? '0.5px solid #f2f2f2' : 0, padding: '10px 0px 0px 0px', margin: '10px 0px 10px 100px', height: isSelected ? 'auto' : 0, overflow: 'hidden'}}>
          <h5 style={{ fontWeight: '800'}}>SELECT YOUR ISSUE</h5>
          {issues.map(this.renderIssues(order_item_id))}
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
  render(){
    const { isLoggedIn } = this.props;
    return (
      isLoggedIn ?
        <div onScroll={this.handleOrdersScroll} style={{height:'100%', overflow: 'auto'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '0.5px solid #f2f2f2', paddingBottom: '10px', margin: '10px'}}>
            <h4>SELECT ORDER WITH ISSUE</h4>
            <a href={`/${country}/${language}/cam/orders/`} style={{ height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', padding: '5px 20px', color: '#ffffff', backgroundColor: '#44689A', borderRadius: 3}}>
              My Orders
            </a>
          </div>
          {this.state.orders.map(this.renderOrders)}
        </div>
      : <div>Please Sign in to view your orders</div>

    )
  }

}

export default connect((state) => ({ 
  ordersData: state.ordersReducer.data,
  ordersDetailData: state.singleOrderReducer.data.orderDetails
}), {...helpActions, ...orderActions, ...orderDetailActions})(Orders)