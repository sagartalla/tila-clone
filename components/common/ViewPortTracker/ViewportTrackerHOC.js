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
					mechandiseId: event.target.getAttribute("data-mechandise-id"),
					userId: event.target.getAttribute("data-user-id")
				});
				// this.setState({ tracked: "ad--tracked" });
			}, 1000);
			return;
		}
		clearTimeout(this.recordedTimeout);
	};
	render() {
		return (
			<Observer onChange={this.handleChange} threshold={1}>
				{this.props.children}
			</Observer>
		);
	}
}

export default ViewportTrackerHOC;
