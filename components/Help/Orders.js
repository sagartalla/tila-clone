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
const orderRelatedCatId = [1,2,3,4,5,6,7];
const sort = (a,b) => a - b;

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
    props.getIssues(orderRelatedCatId);
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
      <div className={`${styles['fwBolder']} ${styles['blackColor']}`}>
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
  renderIssues = (orderItemId) => (issueKey) => {
    const [id, q, a, catId, parentId, orderRelated] = this.props.issueData[issueKey]
    const issueId = `${orderItemId}-${id}`
    const isSelected = this.state.selectedIssue.id === id;
    const issueObj = {id, q, a, catId, parentId, orderRelated}
    return (
      orderRelated ?
      <div key={id} 
        className={`${styles['greyColor']} ${styles['fs-14p']} ${styles['pV-10']} ${styles['pH-10']} ${isSelected && styles['openBGColor']}`}
        onClick={this.selectIssue(issueObj)}>
        <h5 className={`${styles['pointer']} ${isSelected && `${styles['highlightColor']} ${styles['fwBolder']}`}`} dangerouslySetInnerHTML={{__html: q}} />
        <div className={`${styles['overflow-hidden']} ${isSelected ? styles['ht-auto'] : styles['ht-0']}`}>
          <h5 className={`${styles['bB']} ${styles['pb-20']}`} dangerouslySetInnerHTML={{__html: a}} />
          {this.renderSupportBox()}
        </div>
      </div> : null
    )
  }
  renderOrderItems = (orderItemObj, index) => {
    const issueKeys = Object.keys(this.props.issueData).sort(sort);
    console.log(issueKeys, this.props.issueData)
    const {order_item_ids, status, variant_info, order_id} = orderItemObj;
    const { title, image_url } = variant_info;
    const [order_item_id] = order_item_ids;
    const isSelected = this.state.selectedOrder ? this.state.selectedOrder.order_item_ids[0] === order_item_id : false;
    const orderURL =`/${country}/${language}/cam/orders/${order_id}`
    return (
      <div key={order_item_id} className={styles['bB']} onClick={this.selectOrder(orderItemObj)}>
        <div className={`${styles['facp']} ${styles['ht-110']} ${styles['p-10']}`}>
          <div className={styles['orderImgContainer']}><img className={styles['imgContain']} src={`${constants.mediaDomain}/${image_url}`} /></div>
          <div className={styles['orderItemTitle']}>{title}</div>
          <div className={styles['orderIssueContainer']}>
            <div className={styles['SelectIssueButton']}>Select Issue</div>
            <div className={`${styles['m-5']} ${styles['fs-12p']}`}>{`Order Status - ${status} - `}<a href={orderURL}>View detail</a></div>
          </div>
        </div>
        <div className={`${isSelected ? `${styles['bT']} ${styles['ht-auto']}` : styles['ht-0']} ${styles['overflow-hidden']} ${styles['orderIssueListContainer']}`}>
          <h5 className={styles['fwBolder']}>SELECT YOUR ISSUE</h5>
          {issueKeys.map(this.renderIssues(order_item_id))}
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
        <div onScroll={this.handleOrdersScroll} className={styles['ordersContentContainer']}>
          <div className={styles['orderContents']}>
            <h4>SELECT ORDER WITH ISSUE</h4>
            <a href={`/${country}/${language}/cam/orders/`} className={styles['myOrderBtn']}>
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
  ordersDetailData: state.singleOrderReducer.data.orderDetails,
  issueData: state.helpSupportReducer.issueData
}), {...helpActions, ...orderActions, ...orderDetailActions})(Orders)