// file not in use

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

import { actionCreators } from '../../store/auth'

class Country extends Component {
	constructor(props) {
		super(props);
		this.state = {
			country: undefined
		}
		this.storeCountry = _.debounce(this.storeCountry.bind(this), 300);
		this.changeCountry = this.changeCountry.bind(this);
	}

	componentDidMount() {
		const country = cookies.get('country') || this.state.country;
		this.setState({ country });
		this.props.setCountry(country);
	}

	storeCountry(country) {
		this.props.setCountry(country);
		location.reload();
	}

	changeCountry(e) {
		const country = e.target.value;
		this.setState({
			country,
		}, () => {
			this.storeCountry(country);
		})
	}

	render() {
		// TEMP STYLES
		const styles={
			position: 'fixed',
			bottom: 0,
			right: 0,
			width: '80px',

		}
		return (
			<input style={styles} onChange={this.changeCountry} value={this.state.country} />
		);
	}
}

Country.propTypes = {
	setCountry: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			setCountry: actionCreators.setCountry
		},
		dispatch,
	);
}

export default connect(null, mapDispatchToProps)(Country);
