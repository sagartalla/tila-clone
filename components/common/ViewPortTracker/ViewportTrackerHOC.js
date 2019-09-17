import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";

class ViewportTrackerHOC extends Component {
	state = { tracked: "" };
	handleChange = (event, unobserve) => {
		// used for tracking only once
		// if (event.isIntersecting) {
		// 	unobserve();
		// }

		if (event.isIntersecting && event.intersectionRatio >= 1) {
			console.log("impression-test", {
				trackerId: event.target.getAttribute("data-tracker-id")
			});
			this.recordedTimeout = setTimeout(() => {
				newrelic.addPageAction("impression-test", {
					pageType: event.target.getAttribute("data-page-type"),
					trackerId: event.target.getAttribute("data-tracker-id"),
					merchandiseId: event.target.getAttribute("data-merchandise-id"),
					userId:
						event.target.getAttribute("data-user-id") || "NOT_A_LOGGED_IN_USER"
				});
				// this.setState({ tracked: "ad--tracked" });
			}, 1000);
			return;
		}
		clearTimeout(this.recordedTimeout);
	};
	handleClick = event => {
		console.log(this.props.clickEvent || "UNKNOWN_CLICK_EVENT", {
			trackerId: event.currentTarget.getAttribute("data-tracker-id")
		});
		newrelic.addPageAction(this.props.clickEvent || "UNKNOWN_CLICK_EVENT", {
			pageType: event.currentTarget.getAttribute("data-page-type"),
			trackerId: event.currentTarget.getAttribute("data-tracker-id"),
			merchandiseId: event.currentTarget.getAttribute("data-merchandise-id"),
			userId:
				event.currentTarget.getAttribute("data-user-id") ||
				"NOT_A_LOGGED_IN_USER"
		});
	};
	render() {
		return (
			<Observer
				onChange={this.handleChange}
				onClick={this.handleClick}
				threshold={1}
				disabled={this.props.disableViewportTracking || false}
			>
				{React.cloneElement(this.props.children, {
					onClick: this.handleClick
				})}
			</Observer>
		);
	}
}

export default ViewportTrackerHOC;
