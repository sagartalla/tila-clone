import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";

/**
 * This is an HOC to track any element in Browser Viewport (Optional)
 * [can be disabled by sending `disableViewportTracking` as `true` in `props`]
 * and Click events where `clickEvent` in `props` is required
 * to send the actionName for click event
 *
 * In Child component it optionally expects data-attributes as `props` to be logged on server
 * For example:
 * `data-page-type` [always expected],
 * `data-tracker-id`[null for productListings],
 * `data-display-name` [null for productListings],
 * `data-merchandise-id`[null for banners] and
 * `data-user-id` [always required]
 *
 * All this tracking data will be sent to newrelic[ENV] app respectively.
 * To visit insights: https://insights.newrelic.com/accounts/2239519/dashboards/986543
 *
 * @class ViewportTrackerHOC
 * @extends {Component}
 */

class ViewportTrackerHOC extends Component {
	// state = { tracked: "" };
	handleChange = (event, unobserve) => {
		if (event.isIntersecting && event.intersectionRatio >= 1) {
			this.recordedTimeout = setTimeout(() => {
				newrelic.addPageAction("IMPRESSIONS", {
					...event.target.dataset,
					userId: digitalData.page.pageInfo.accountId
				});
				appEventData.push({
					event: "IMPRESSIONS",
					trkData: {
						...event.target.dataset,
						userId: digitalData.page.pageInfo.accountId
					}
				});
				// console.log("IMPRESSIONS", {
				// 	...event.target.dataset
				// });
				// this.setState({ tracked: "ad--tracked" });
				// used for tracking only once
				// if (event.isIntersecting) {
				// 	unobserve();
				// }
			}, 1000);
			return;
		}
		clearTimeout(this.recordedTimeout);
	};
	handleClick = event => {
		// console.log(this.props.clickEvent || "UNKNOWN_CLICK_EVENT", {
		// 	...event.currentTarget.dataset
		// });
		appEventData.push({
			event: this.props.clickEvent || "UNKNOWN_CLICK_EVENT",
			trkData: {
				...event.currentTarget.dataset,
				userId: digitalData.page.pageInfo.accountId
			}
		});
		newrelic.addPageAction(this.props.clickEvent || "UNKNOWN_CLICK_EVENT", {
			...event.currentTarget.dataset,
			userId: digitalData.page.pageInfo.accountId
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
