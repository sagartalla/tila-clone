import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreaters, selectors } from '../../../store/cam/address';

import AddressHeader from './includes/AddressHeader';
import AddressBody from './includes/AddressBody';
import AddressNew from './includes/AddressNew';

import styles from './address.styl';


class ShippingAddress extends Component {
  
  constructor(props) {
    super(props);
    this.state={
        fName: 'Mehraj',
        lName: '',
        city: '',
        colony:'',
        street_name: '',
        flat: '',
        mob: '',
        showNewAddr: false,
        homeButton: true,
        editAddrId: ''
    }
    this.inputOnChange = this.inputOnChange.bind(this);
    this.saveBtnClickHandler = this.saveBtnClickHandler.bind(this);
    this.showAddAdrressForm = this.showAddAdrressForm.bind(this);
    this.deleteAddr = this.deleteAddr.bind(this);
    this.editAddress = this.editAddress.bind(this);
  }

  componentDidMount(){
    this.props.getShippingAddressResults();
  }
  
  shouldComponentUpdate(nextProps) {
    return true;
  }

  inputOnChange(e){
    this.setState({ [e.target.name] :  e.target.value })
  }

  deleteAddr(addrId){
    this.props.deleteAddress(addrId);
  }

  editAddress(addrId){
    this.setState({editAddrId: addrId})
    //console.log(this.props.getAddrById(addrId));
  }

  showAddAdrressForm(e){
    this.setState({showNewAddr : !this.state.showNewAddr})
  }

  saveBtnClickHandler(){
    this.props.sendNewAddressDetails(this.state)
  }

  render(){
    const {results} = this.props;
    const {showNewAddr} = this.state;
    return (
      <div className={styles['address-container']}>
        <AddressHeader />
        <Row>
          <Col md={12} sm={12} xs={12}>
            {
              results.length > 0 ? 
                <AddressBody 
                  data = {results}
                  showAddAdrressForm = {this.showAddAdrressForm}
                  deleteAddr = {this.deleteAddr}
                  editAddress = {this.editAddress}
                />
              : ''
            }
          </Col>
          <Col md={12} sm={12} xs={12}>
            <AddressNew 
              inputOnChange={this.inputOnChange}
              saveBtnClickHandler={this.saveBtnClickHandler}
              data={this.state}
              showNewAddr={showNewAddr}
              homeButton={this.homeButton}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

/// ---- WHY DEFAULT HAS TO TAKE - TODO.
const mapStateToProps = (store) => ({
  results: selectors.default.getShippingAddressResults(store),
  getAddrById: selectors.default.getAddrById(store)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShippingAddressResults: actionCreaters.getShippingAddressResults,
      sendNewAddressDetails: actionCreaters.sendNewAddressDetails,
      deleteAddress: actionCreaters.deleteAddress,
    },
    dispatch,
  );
  

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);