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
    <div key={type.type} className={styles['flexCenterContainer']}
      style={{
        margin: '10px 0px', 
        width: '200px', 
        display: 'flex',
        ...(index !== 0 && {borderLeft: '0.5px solid rgba(0,0,0,0.25)'})
      }}
    >
      <div style={{ margin: '10px', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#8DD7C2'}}></div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 'bolder'}}>{type.text[0]}</div>
        <div style={{ fontSize: '12px', color: '#7891B6', cursor: type.isClickable ? 'pointer' : 'normal' }} onClick={this.handleContactClick(type, selectedOrder, selectedIssue)}>{type.text[1]}</div>
      </div>
    </div>
  )}

  render(){
    const {isCategoryLoaded, categoryData, query, isLoggedIn} = this.props;
    const {type, url, showModal} = this.state;
    return(
      !!isCategoryLoaded ?
      <div style={{ height: '100%', overflow: 'hidden'}}>
        <HeaderBar />
        <div style={{ height: `calc(100% - 110px)`, overflow: 'auto'}}>
          <div>
            <div className={`${styles['flexCenterContainer']} ${styles['helpHeroContainer']}`}>
              <div className={`${styles['flexColCenterContainer']}`} style={{width: '100%'}}>
                <h3>Hi, How can we help you today ?</h3>
                <div className={styles['searchContainer']}></div>
              </div>
              <div className={styles['contactContainer']}>
                {ContactTabs.map(this.renderContactCard())}
              </div>
            </div>
            <div style={{ backgroundColor: '#fff'}}>
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
        <div className={styles['modal']} style={{transform: showModal ? 'translateX(0px)' : 'translateX(800px)'}}>
          <div style={{height: '100%', width: '100%', overflow: 'auto'}}>{this.renderModal(this.props.isLoggedIn)}</div>
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