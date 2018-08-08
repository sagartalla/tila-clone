import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/userVault';

import MiniVault from './includes/MiniVault';
import VaultBody from './includes/VaultBody';
import VaultHeader from './includes/VaultHeader';
import VaultAddNewCard from './includes/VaultAddNewCard';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/UserVault/uservault');

const initialVaultCardObj = {
  card_number: '',
  user_name: '',
  exp_mm: '',
  exp_yr: '',
  default: true,
  addNewCardBlock: false,
}

class UserVault extends Component {

  constructor(props) {
    super(props);
    this.state = initialVaultCardObj;
    this.inputChange = this.inputChange.bind(this);
    this.makeDefault = this.makeDefault.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.toggleAddCardBlock = this.toggleAddCardBlock.bind(this);
    this.setAsDefaultCard = this.setAsDefaultCard.bind(this);
    this.addBtnClickHandler = this.addBtnClickHandler.bind(this);
  }

  componentDidMount() {
    if (!this.props.miniVault)
      this.props.getCardResults();
  }

  inputChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });

    // console.log(this.state);
  }

  makeDefault(card_token) {
    this.props.makeCardDefault(card_token);
  }

  deleteCard(card_token) {
    this.props.deleteCard(card_token);
  }

  setAsDefaultCard(e) {
    this.setState({
      ...this.state,
      default: e.target.checked
    });
  }

  toggleAddCardBlock() {
    this.setState({ addNewCardBlock: !this.state.addNewCardBlock });
  }

  addBtnClickHandler() {
    const { card_number, user_name, exp_mm, exp_yr } = this.state;
    this.props.addCard({
      "bank_name": "HDFC",
      "card_number": card_number,
      "card_type": "DEBIT",
      "def_currency_code": "KSA",
      "expiry_month": exp_mm,
      "expiry_year": exp_yr,
      "holder_name": user_name,
      "provider_type": "VISA",
      "default": this.state.default
    });
    this.toggleAddCardBlock();
    this.state = {
      initialVaultCardObj
    };
  }

  render() {
    const { results, miniVault } = this.props;
    const { addNewCardBlock } = this.state;
    return (
      <div className={`${styles['vault-container']}`}>
        {
          miniVault ?
            <MiniVault
              data={results}
              makeDefault={this.makeDefault}
              toggleAddCardBlock={this.toggleAddCardBlock}
            />
            :
            <div className={`${styles['box']} ${styles['ml-5']}`}>
              <VaultHeader />
              <VaultBody
                data={results}
                makeDefault={this.makeDefault}
                deleteCard={this.deleteCard}
                toggleAddCardBlock={this.toggleAddCardBlock}
              />
              {
                addNewCardBlock ?
                  <VaultAddNewCard
                    checked={this.state.default}
                    inputChange={this.inputChange}
                    addBtnClickHandler={this.addBtnClickHandler}
                    setAsDefaultCard={this.setAsDefaultCard}
                    toggleAddCardBlock={this.toggleAddCardBlock}
                  /> : null
              }
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  results: selectors.getCardResults(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getCardResults: actionCreators.getCardResults,
    addCard: actionCreators.addCard,
    deleteCard: actionCreators.deleteCard,
    makeCardDefault: actionCreators.makeCardDefault,
  }, dispatch);

UserVault.propTypes = {

};

UserVault.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(UserVault);
