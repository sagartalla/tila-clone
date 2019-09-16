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
			console.log({
				trackerId: event.target.getAttribute("data-tracker-id")
			});
			this.recordedTimeout = setTimeout(() => {
				newrelic.addPageAction("impression-test", {
					pageType: event.target.getAttribute("data-page-type"),
					trackerId: event.target.getAttribute("data-tracker-id"),
					merchandiseId: event.target.getAttribute("data-merchandise-id"),
					userId: event.target.getAttribute("data-user-id")
				});
				// this.setState({ tracked: "ad--tracked" });
			}, 1000);
			return;
		}
		clearTimeout(this.recordedTimeout);
	};
	handleClick = event => {
		console.log({
			trackerId: event.currentTarget.getAttribute("data-tracker-id")
		});
		newrelic.addPageAction("click-test", {
			pageType: event.currentTarget.getAttribute("data-page-type"),
			trackerId: event.currentTarget.getAttribute("data-tracker-id"),
			merchandiseId: event.currentTarget.getAttribute("data-merchandise-id"),
			userId: event.currentTarget.getAttribute("data-user-id")
		});
	};
	render() {
		return (
			<Observer
				onChange={this.handleChange}
				onClick={this.handleClick}
				threshold={1}
			>
				{React.cloneElement(this.props.children, {
					onClick: this.handleClick
				})}
			</Observer>
		);
	}
}

export default ViewportTrackerHOC;
