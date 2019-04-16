/*eslint-disable*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import HeaderBar from '../HeaderBar';
import { mergeCss } from '../../utils/cssUtil';
import { actionCreators } from '../../store/helpsupport';
import { selectors } from '../../store/auth';
import {Router} from '../../routes';
import { ContactTabs, helpComponents } from './helpConstants';
import EmailModal from './EmailModal';

const styles = mergeCss('components/Help/help');

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
    }
    this.props.getCategories();
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
  renderModal = (isLoggedIn) => (
    {
      'email': <EmailModal type="email" query={this.props.query[0]} selectedOrder={this.state.selectedOrder} selectedIssue={this.state.selectedIssue} isLoggedIn={isLoggedIn} />,
      'chat': <EmailModal type="chat" query={this.props.query[0]} selectedOrder={this.state.selectedOrder} selectedIssue={this.state.selectedIssue} isLoggedIn={isLoggedIn} />
    }[this.state.modalType]
  );
  renderContactCard = (selectedOrder, selectedIssue) => (type, index) => {
    return (
    <div key={type.type} className={`${styles['flexCenterContainer']} ${styles['wh-200']} ${index !== 0 && styles['bL']}`}>
      <div className={styles['contactIcon']}></div>
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
        <div className={styles['helpContentCont']}>
          <div>
            <div className={`${styles['flexCenterContainer']} ${styles['helpHeroContainer']}`}>
              <div className={`${styles['flexColCenterContainer']}`} style={{width: '100%'}}>
                <h3>Hi, How can we help you today ?</h3>
                {/* <div className={styles['searchContainer']}></div> */}
              </div>
              <div className={styles['contactContainer']}>
                {ContactTabs.map(this.renderContactCard())}
              </div>
            </div>
            <div className={styles['whiteBG']}>
              <div className={styles['helpContentContainer']}>
                {helpComponents(type)(url, categoryData, query[0], isLoggedIn, this.renderContactCard, this.handleContactClick)}
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