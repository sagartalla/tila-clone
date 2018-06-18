import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors, actionCreators } from '../../../../store/order';
import constants from '../../../../constants';

import ChooseVariant from './ChooseVariant';

import { ORDER_ISSUE_TYPES, ORDER_ISSUE_STEPS as STEPS} from '../../constants';

import styles from './orderIssue.styl';

class Reason extends Component {
	constructor(props) {
		super(props)
		this.state = {};
		this.selectReason = this.selectReason.bind(this);
		this.updateComment = this.updateComment.bind(this);
		this.saveAndGoNext = this.saveAndGoNext.bind(this);
	}

	saveAndGoNext() {
		const { goToNextStep, setReason } = this.props;
		setReason(this.state);
		goToNextStep();
	}

	componentDidMount() {
		this.props.getReasons();
	}

	selectReason(e) {
		this.setState({
			reason: e.target.value
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
			<div>
				{
					returnExchangeType
					?
					null
					:
					<div className={`${styles['flx-spacebw-alignc']} ${styles['m-20']} ${styles['pb-20']} ${styles['reasons-item-wrap']}`}>
						<div className={styles['back-btn']}>*</div>
						<div className={styles['img-cont']}>
							<img src={`${constants.mediaDomain}/${img}`} />
						</div>
						<div className={styles['title-cont']}>
							<span>{name}</span>
						</div>
					</div>
				}
				<div className={styles['reason-cont']}>
					<div className={styles['instruction-txt']}>
						<span className={styles['fs-12']}>Please select a reason fro your cancellation and we'll take care of it!</span>
					</div>
					<div className={styles['dd-cont']}>
						<select onChange={this.selectReason}>
							<option>{loadingStatus ? 'loading...' : 'Select a Reason'}</option>
							{
								_.map(reasons, (reason, key) => <option key={key} value={key}>{key}</option>)
							}
						</select>
					</div>
					{
						returnExchangeType === ORDER_ISSUE_TYPES.EXCHANGE
						?
						<ChooseVariant />
						:
						null
					}
					<div className={styles['comment-cont']}>
						<textarea onChange={this.updateComment}/>
					</div>
				</div>
				<div className={`${styles['widget-footer']} ${styles['box']} ${styles['pt-24']}`}>
					<button onClick={this.saveAndGoNext} className={`${styles['m-0-auto']} ${styles['fs-16']}`} disabled={loadingStatus || !this.state.reason}>Continue</button>
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
