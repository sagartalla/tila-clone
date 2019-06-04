import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import Order from './includes/Order';
import OrderIssueWidget from '../../Order/includes/OrderIssueWidget';
import { selectors, actionCreators } from '../../../store/cam/orders';
import Pagination from '../../common/Pagination';
import { languageDefinations } from '../../../utils/lang/';
import SVGComponent from '../../common/SVGComponet';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './orders_en.styl';
import styles_ar from './orders_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const cookies = new Cookies();

const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

const { ORDERS } = languageDefinations();

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  componentDidMount() {
    this.props.getOrderHistory(this.state.currentPage);
  }

  componentWillReceiveProps(nextProps) {
    const { currentPage } = this.state;
    if (nextProps.pageDetails.page !== currentPage) {
      window.scrollTo(0, 0);
      this.setState({
        currentPage: nextProps.pageDetails.page,
      });
    }
  }

  onPageChanged(currentPage) {
    this.setState({
      currentPage,
    }, () => this.props.getOrderHistory(currentPage));
  }

  render() {
    const { ordersData, pageDetails } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <div className={styles['orders-container']}>
          {
          ordersData.length
          ?
            ordersData.map(order => <Order key={order.id} order={order} />)
          :
            <div className={`${styles['no-order-part']}`}>
              <div className={`${styles['flex']} ${styles['no-order-part-inn']}`}>
                <SVGComponent clsName={`${styles['no-order-list-icon']}`} src="icons/common-icon/no-order-icon" />
                <h4 className={`${styles['fs-26']} ${styles['t-c']} ${styles['pt-40']}`}>{ORDERS.NO_WISHLIST_LABEL}</h4>
                <span className={styles['thick-gry-clr']}>{ORDERS.DONT_WAIT}</span>
                <a href={`/${country}/${language}`} className={`${styles['fp-btn']} ${styles['fp-btn-primary']} ${styles['fp-btn-x-large']} ${styles['right-radius']} ${styles['text-uppercase']} ${styles['fontW600']} ${styles['mt-40']}`}>{ORDERS.START_SHOPPING}</a>
              </div>
            </div>
        }
          <Pagination
            totalSize={pageDetails.total_pages > 1 ? (pageDetails.total_pages - 1) : 0}
            pageNeighbours={0}
            onPageChanged={this.onPageChanged}
            currentPage={currentPage}
          />
        </div>
        <OrderIssueWidget />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  ordersData: selectors.getOrdersData(store),
  pageDetails: selectors.getPageDetails(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getOrderHistory: actionCreators.getOrderHistory },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
