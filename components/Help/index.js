/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../HeaderBar';
import { actionCreators } from '../../store/helpsupport';
import { selectors } from '../../store/auth';
import {Router} from '../../routes';
import { ContactTabs, helpComponents } from './helpConstants';
import EmailModal from './EmailModal';

import lang from '../../utils/language';

import main_en from '../../layout/main/main_en.styl';
import main_ar from '../../layout/main/main_ar.styl';
import styles_en from './help_en.styl';
import styles_ar from './help_ar.styl';
import SVGComponent from '../common/SVGComponet';
import { languageDefinations } from '../../utils/lang';

const { HNS } = languageDefinations();

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

class Help extends Component {
  constructor(props){
    super(props);
    const { 0 : urlQuery } = props.query;
    const [type, ...url] = (urlQuery || '').split('/');
    this.state = {
      type: type || 'faq',
      url,
      showModal: false,
      modalType: '',
      selectedOrder: '',
      selectedIssue: '',
      fixCatContainer: false,
      fetchPaginatedRes: 1
    }
    this.scrollTimeout = '';
    this.props.getCategories();
  }
  componentDidMount() {
    this.setState({
      searchQuery: window.location.search.split('=')[1] ? decodeURIComponent(window.location.search.split('=')[1]) : ''
    })
  }
  handleContactClick = ({type, isClickable}, selectedOrder, selectedIssue) => (e) => {
    if(isClickable) {
      this.setState({
        showModal: true,
        modalType: type,
        selectedOrder: selectedOrder,
        selectedIssue: selectedIssue
      });
    }
  }
  closeModal = () => {
    this.setState({
      showModal: false,
      modalType: ''
    })
  }
  handleSearch = (e) => {
    e.preventDefault();
    const { pathname } = window.location;
    const url = pathname.replace(this.props.query[0], `answers?search=${this.state.searchQuery}`);
    window.location.assign(url)
    //Router.pushRoute(url);
  }
  handleQueryChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    })
  }
  handleParentScroll = (e) => {
    clearTimeout(this.scrollTimeout)
    const { scrollHeight, scrollTop, offsetHeight } = e.target;
    if ((scrollTop + 10 + offsetHeight) > scrollHeight) {
      this.scrollTimeout = setTimeout(this.setState({ fetchPaginatedRes: this.state.fetchPaginatedRes + 1}), 100)
    }
    e.target.scrollTop > (this.props.isLoggedIn ? 390 : 420) ? !this.state.fixCatContainer && this.setState({ fixCatContainer: true }) : this.state.fixCatContainer && this.setState({ fixCatContainer : false })
  }
  renderModal = (isLoggedIn) => (
    {
      'email': <EmailModal type="email" closeModal={this.closeModal} query={this.props.query[0]} selectedOrder={this.state.selectedOrder} selectedIssue={this.state.selectedIssue} isLoggedIn={isLoggedIn} />,
      'chat': <EmailModal type="chat" closeModal={this.closeModal} query={this.props.query[0]} selectedOrder={this.state.selectedOrder} selectedIssue={this.state.selectedIssue} isLoggedIn={isLoggedIn} />
    }[this.state.modalType]
  );
  renderContactCard = (selectedOrder, selectedIssue) => (type, index) => {
    return (
    <div key={type.type} className={`${styles['flexCenterContainer']} ${styles['wh-200']} ${index !== 0 && styles['bL']}`}>
      <div className={styles['contactIcon']}>
        <SVGComponent src={`helpsupport/${type.type}`} />
      </div>
      <div>
        <div className={`${styles['fs-13p']} ${styles['fwBolder']}`}>{type.text[0]}</div>
        <div className={`${styles['fs-12p']} ${styles['highlightColor']} ${type.isClickable && styles['pointer']}`} onClick={this.handleContactClick(type, selectedOrder, selectedIssue)}>{type.text[1]}</div>
      </div>
    </div>
  )}

  render(){
    const {isCategoryLoaded, categoryData, query, isLoggedIn} = this.props;
    const {type, url, showModal} = this.state;
    return(
      !!isCategoryLoaded ?
      <div className={styles['helpContainer']}>
        <HeaderBar />
        <div onScroll={this.handleParentScroll} className={styles['helpContentCont']}>
          <div>
            <div className={`${styles['flexCenterContainer']} ${styles['helpHeroContainer']}`}>
              <div className={`${styles['flexColCenterContainer']}`} style={{width: '100%'}}>
                <h3>Hi, How can we help you today ?</h3>
                <div className={styles['searchContainer']}>
                  <form className={styles['searchForm']} onSubmit={this.handleSearch}>
                    <input dir="auto" className={styles['searchInput']} name="searchQuery" type='search' value={this.state.searchQuery} onChange={this.handleQueryChange} placeholder={HNS['SEARCH_PLACEHOLDER']} />
                  </form>
                </div>
              </div>
              <div className={styles['contactContainer']}>
                {ContactTabs.map(this.renderContactCard())}
              </div>
            </div>
            <div className={styles['whiteBG']}>
              <div className={styles['helpContentContainer']}>
                {helpComponents(type)(url, categoryData, query[0], isLoggedIn, this.renderContactCard, this.handleContactClick, this.state.fixCatContainer, this.state.fetchPaginatedRes)}
              </div>
            </div>
          </div>
        </div>
        <div className={showModal ? `${styles['modalContainer']} ${styles['showDiv']}`
          : `${styles['modalContainer']} ${styles['hideDiv']}`}>
          <div className={`${styles['disabled']}`} onClick={this.closeModal}></div>
        </div>
        <div className={`${styles['modal']} ${showModal ? styles['showModal'] : styles['hideModal']}`}>
          <div className={styles['modalFill']}>{this.renderModal(this.props.isLoggedIn)}</div>
        </div>
      </div> : null
    )
  }
}

export default connect((state) => ({
  categoryData: state.helpSupportReducer.categoryData,
  isCategoryLoaded: state.helpSupportReducer.isCategoryLoaded,
  isLoggedIn: selectors.getLoggedInStatus(state)
  }),
  {...actionCreators})(Help);
