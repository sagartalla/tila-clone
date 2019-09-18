import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";

/**
 * This is an HOC to track any element in Browser Viewport (Optional)
 * [can be disabled by sending `disableViewportTracking` as `true` in `props`]
 * and Click events where `clickEvent` in `props` is required
 * to send the `actionName` for click event
 *
 * In Child component it optionally expects `data-page-type`, `data-tracker-id`,
 * `data-merchandise-id` and `data-user-id` as `props`
 *
 * All this tracking data will be sent to newrelic[ENV] app respectively.
 * To visit insights: https://insights.newrelic.com/accounts/2239519/dashboards/986543
 *
 * @class ViewportTrackerHOC
 * @extends {Component}
 */

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
