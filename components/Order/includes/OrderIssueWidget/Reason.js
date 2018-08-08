import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGComponent from '../../../common/SVGComponet';
import { selectors, actionCreators } from '../../../../store/order';
import constants from '../../../../constants';

import ChooseVariant from './ChooseVariant';

import { ORDER_ISSUE_TYPES, ORDER_ISSUE_STEPS as STEPS } from '../../constants';

import { mergeCss } from '../../../../utils/cssUtil';
const styles = mergeCss('components/Order/includes/OrderIssueWidget/orderIssue');

class Reason extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.selectReason = this.selectReason.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.saveAndGoNext = this.saveAndGoNext.bind(this);
    this.selectSubReason = this.selectSubReason.bind(this);
  }

  saveAndGoNext() {
    const { goToNextStep, setReason } = this.props;
    setReason(this.state);
    goToNextStep();
  }

	componentDidMount() {
		this.props.getReasons({
			orderItemId: this.props.orderIssue.selectedItem.id
		});
	}

  selectReason(e) {
    this.setState({
      reason: e.target.value
    })
  }

	selectSubReason(e) {
		this.setState({
			subReason: e.target.value
		})
	}

	updateComment(e) {
		this.setState({
			comment: e.target.value
		})
	}

  render() {
    const { orderIssue, goToNextStep, loadingStatus } = this.props;
    const { selectedItem: itemData, reasons, returnExchangeType } = orderIssue;
    const { img, name } = itemData;

		return (
			<div className={styles['reason-item-main']}>
				{
					returnExchangeType
					?
					null
					:
					<div className={`${styles['flx-spacebw-alignc']} ${styles['pb-20']} ${styles['pt-20']} ${styles['ml-20']} ${styles['mr-20']} ${styles['reasons-item-wrap']}`}>
						<span className={`${styles['back-btn']} ${styles['flex-center']} ${styles['justify-center']}`}>
              <SVGComponent clsName={`${styles['down-arrow-icon']}`} src="icons/common-icon/down-arrow-circle" />
            </span>
						<div className={`${styles['img-cont']} ${styles['flex-center']} ${styles['justify-center']}`}>
              <img src={`${constants.mediaDomain}/${img}`} />
            </div>
						<div className={styles['title-cont']}>
							<span>{name}</span>
						</div>
					</div>
				}
				<div className={`${styles['reason-cont']} ${styles['p-20']}`}>
          <div className={`${styles['instruction-txt']} ${styles['pb-15']}`}>
            <span className={styles['fs-12']}>Please select a reason fro your cancellation and we'll take care of it!</span>
          </div>
					<div className={`${styles['dd-cont']} ${styles['pb-15']}`}>
            <div className={styles['select']}>
              <select className={styles['select-text']} required onChange={this.selectReason}>
                <option>{loadingStatus ? 'loading...' : 'Select a Reason'}</option>
                {
                  reasons.map((reason) => <option key={reason.id} value={reason.name}>{reason.name}</option>)
                }
            </select>
              <span className={styles['select-highlight']}></span>
              <span className={styles['select-bar']}></span>
            </div>
						{
							this.state.reason
              ?
              <div className={`${styles['select']} ${styles['mt-20']} ${styles['mb-10']}`}>
							<select className={styles['select-text']} onChange={this.selectSubReason}>
								<option>{loadingStatus ? 'loading...' : 'Select a Sub Reason'}</option>
								{
									_.map(reasons.filter((reason) => reason.name === this.state.reason)[0].sub_reasons, (subReason, key) => <option key={subReason.id} value={subReason.name}>{subReason.name}</option>)
								}
							</select>
              </div>
							:
							null
						}
					</div>
					{
						returnExchangeType === ORDER_ISSUE_TYPES.EXCHANGE
						?
						<ChooseVariant />
						:
						null
					}
					<div className={styles['comment-cont']}>
            <textarea style={{width:'410px'}} onChange={this.updateComment} />
          </div>
				</div>
				<div className={`${styles['widget-footer']} ${styles['flex-center']} ${styles['justify-center']} ${styles['box']}`}>
          <button onClick={this.saveAndGoNext} className={`${styles['fp-btn']} ${styles['fp-btn-primary']}`} disabled={loadingStatus || !this.state.reason}>Continue</button>
        </div>
			</div>
		);
	}
}

Reason.propTypes = {
  orderIssue: PropTypes.object.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  setReason: PropTypes.func.isRequired,
}

const mapStateToProps = (store) => {
  return ({
    orderIssue: selectors.getOrderIssue(store),
    loadingStatus: selectors.getLoadingStatus(store),
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getReasons: actionCreators.getReasons,
      setReason: actionCreators.setReason,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Reason);
