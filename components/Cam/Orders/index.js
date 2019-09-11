import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import Order from './includes/Order';
import OrderIssueWidget from '../../Order/includes/OrderIssueWidget';
import { selectors, actionCreators } from '../../../store/cam/orders';
import { actionCreators as singleOrderActionCreators } from '../../../store/order';
import Pagination from '../../common/Pagination';

import { Tabs, Tab, TabPanel } from '../../common/CustomTab';
import { languageDefinations } from '../../../utils/lang/';
import SVGComponent from '../../common/SVGComponet';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './orders_en.styl';
import styles_ar from './orders_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const cookies = new Cookies();

const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';

const { ORDERS } = languageDefinations();

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderCurrentPage: 0,
      warrantyCurrentPage:0,
      activeTab:'ordersTab'
    };
    this.tabData = [
      {
        tabType:'ordersTab',
        tabData:'ordersData',
        display_name:'All Orders',
        page:'orderCurrentPage'
      },
      {
        tabType:'warrantyTab',
        tabData:'warrantyData',
        display_name:'Orders With Warranty',
        page:'warrantyCurrentPage'
      }
    ]
    this.onPageChanged = this.onPageChanged.bind(this);
    this.getCurrentTabValue = this.getCurrentTabValue.bind(this)
  }

  componentDidMount() {
    this.props.getOrderHistory(this.state.orderCurrentPage);
    this.props.getWarrantyHistory(this.state.warrantyCurrentPage);
  }

  componentWillReceiveProps(nextProps) {
    const { orderCurrentPage,warrantyCurrentPage, activeTab } = this.state;
    const currentPage = activeTab === 'ordersTab' ? 'orderCurrentPage' : 'warrantyCurrentPage'
    if (nextProps.pageDetails.page !== currentPage) {
      window.scrollTo(0, 0);
      this.setState({
        [currentPage]: currentPage === 'orderCurrentPage' ? nextProps.pageDetails.page : nextProps.warrantyPageDetails.page
      });
    }
  }
  getCurrentTabValue(e,value) {
    this.setState({
      activeTab: value
    })
  }
  onPageChanged(selectedPage) {
    const { orderCurrentPage,warrantyCurrentPage, activeTab } = this.state;
    const { getOrderHistory, getWarrantyHistory } = this.props;
    const currentPage = activeTab === 'ordersTab' ? 'orderCurrentPage' : 'warrantyCurrentPage'
    const invokeFunction = activeTab === 'ordersTab' ? getOrderHistory : getWarrantyHistory
    this.setState({
      [currentPage]:selectedPage,
    }, () => invokeFunction(selectedPage));
  }

  render() {
    const {pageDetails, getInvoice, orderLoadingStatus, warrantyPageDetails} = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        <div className={`${styles['fs-16']} ${styles['align-center']} ${styles['order-block']}`}>
          <Tabs value={activeTab} onCallback={this.getCurrentTabValue} tabsClass={`${styles['flex']} ${styles['pt-5']}`}>
            {
              this.tabData.map((item,index) => {
                return (
                  <Tab
                    tabClass={`${styles['fs-14']} ${styles['pr-30']} ${styles['p-10-15']} ${styles['pointer']}`}
                    activeClass={`${styles['bdr-btm-black-color']} ${styles['fontW600']}`}
                    nonActiveClass={`${styles['light-gray']}`}
                    label={item.display_name}
                    value={item.tabType}
                    name={item.tabType}
                    tabType='tab'
                  />
                )
              })
            }
          </Tabs>
        </div>
        <div className={`${styles['mt-40']}`}>
          {
            this.tabData.map((item,index) => {
              return (
                <TabPanel
                  value={activeTab}
                  index={item.tabType}
                  activeTabPanel={`${styles['displayBlock']}`}
                  nonactiveTabPanel={`${styles['hideBlock']}`}
                 >
                  <div className={styles['orders-container']}>
                    {
                    this.props[item.tabData].length > 0
                    ?
                    this.props[item.tabData].map(order => <Order key={order.id} getInvoice={getInvoice} order={order} />)
                    :
                    orderLoadingStatus ?
                    <div className={`${styles['order-result']} ${styles['flex-center']} ${styles['justify-center']} ${styles.width100}`}>
                      <div className={`${styles['loader-div']} ${styles['align-center']}`}>
                        <SVGComponent
                          clsName={styles['loader-styl']}
                          src="icons/common-icon/circleLoader"
                        >
                        </SVGComponent>
                      </div>
                      </div> :
                      <div className={`${styles['no-order-part']}`}>
                        <div className={`${styles['flex']} ${styles['no-order-part-inn']}`}>
                          <SVGComponent clsName={`${styles['no-order-list-icon']}`} src="icons/common-icon/no-order-icon" />
                          <h4 className={`${styles['fs-24']} ${styles['t-c']} ${styles['pt-40']}`}>{ORDERS.NO_WISHLIST_LABEL}</h4>
                          <div className={`${styles['fs-14']} ${styles['thick-gry-clr']} ${styles['pt-10']}`}>{ORDERS.START_SHOPPING_TO_MAKE_KITTEN_HAPPY}</div>
                          <a href={`/${language}`} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['right-radius']} ${styles['text-uppercase']} ${styles['fontW600']} ${styles['mt-40']}`}>{ORDERS.START_SHOPPING}</a>
                        </div>
                      </div>
                  }
                    <Pagination
                      totalSize={
                        activeTab === 'ordersTab' ?
                        (pageDetails.total_pages > 1 ? (pageDetails.total_pages - 1) : 0) :
                        (warrantyPageDetails.total_pages > 1 ? (warrantyPageDetails.total_pages - 1) : 0  )
                      }
                      pageNeighbours={0}
                      onPageChanged={this.onPageChanged}
                      currentPage={this.state[item.page]}
                    />
                  </div>
                </TabPanel>
              )
            })
          }
        </div>
        <OrderIssueWidget />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  ordersData: selectors.getOrdersData(store,'data'),
  pageDetails: selectors.getPageDetails(store),
  warrantyData:selectors.getOrdersData(store,'warrantyData'),
  orderLoadingStatus: selectors.getOrderLoadingState(store),
  warrantyPageDetails: selectors.getWarrantyPageDetails(store)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrderHistory: actionCreators.getOrderHistory,
      getWarrantyHistory:actionCreators.getWarrantyHistory,
      getInvoice: singleOrderActionCreators.getInvoice,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
