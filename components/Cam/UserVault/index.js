import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, selectors } from '../../../store/cam/userVault';

import MiniVault from './includes/MiniVault';
import VaultBody from './includes/VaultBody';
import VaultHeader from './includes/VaultHeader';
import VaultAddNewCard from './includes/VaultAddNewCard';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './uservault_en.styl';
import styles_ar from './uservault_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const initialVaultCardObj = {
  card_number: '',
  user_name: '',
  exp_mm: '',
  exp_yr: '',
  default: true,
  addNewCardBlock: false,
};

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
    this.state = {
      transactions: [],
    };
  }

  componentWillMount() {
    this.props.getWalletTransactions();
  }

  componentDidMount() {
    if (!this.props.miniVault) this.props.getCardResults();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions.length > 0) {
      this.setState({
        transactions: nextProps.transactions,
      });
    }
  }

  setAsDefaultCard(e) {
    this.setState({
      ...this.state,
      default: e.target.checked,
    });
  }

  inputChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

    // console.log(this.state);
  }

  makeDefault(card_token) {
    const { toggleMiniVault, selectedSavedCard } = this.props;
    if (toggleMiniVault) toggleMiniVault();
    selectedSavedCard(card_token);
  }

  deleteCard(card_token) {
    this.props.deleteCard(card_token);
  }

  toggleAddCardBlock() {
    this.setState({ addNewCardBlock: !this.state.addNewCardBlock });
  }

  addBtnClickHandler() {
    const {
 card_number, user_name, exp_mm, exp_yr 
} = this.state;
    this.props.addCard({
      bank_name: 'HDFC',
      card_number,
      card_type: 'DEBIT',
      def_currency_code: 'KSA',
      expiry_month: exp_mm,
      expiry_year: exp_yr,
      holder_name: user_name,
      provider_type: 'VISA',
      default: this.state.default,
    });
    this.toggleAddCardBlock();
    this.state = {
      initialVaultCardObj,
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
            <div className={`${styles.box} ${styles['ml-5']}`}>
              <VaultHeader transactions={this.state.transactions}>
                <VaultBody
                  data={results.savedCards}
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
              </VaultHeader>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  results: ownProps.isInstantCheckout ? selectors.getSavedCardDetails(store) : selectors.getCardResults(store),
  transactions: selectors.getTransactions(store),
  tilaCredit: selectors.getTilaCredit(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCardResults: actionCreators.getCardResults,
    addCard: actionCreators.addCard,
    deleteCard: actionCreators.deleteCard,
    makeCardDefault: actionCreators.makeCardDefault,
    selectedSavedCard: actionCreators.selectedSavedCard,
    getWalletTransactions: actionCreators.getWalletTransactions,
  }, dispatch);

UserVault.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(UserVault);
