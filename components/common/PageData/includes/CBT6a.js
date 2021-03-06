import React, { Component } from "react";

import dynamic from "next/dynamic";
const Image = dynamic(import("react-graceful-image"), { ssr: false });
import ViewportTrackerHOC from "../../ViewPortTracker/ViewportTrackerHOC";

import lang from "../../../../utils/language";
import PageData from "../index";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class CBT6a extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { content, pageType } = this.props;
		const { config = {}, data } = content;
		const { banners } = content.data[lang];

		return (
			<div>
				<div className={`${styles["display-t-i-cb"]} ${styles.flex}`}>
					<ViewportTrackerHOC
						clickEvent={`BANNER-CLICK`}
						disableViewportTracking={false}
					>
						<div
							className={`${styles["p-0-5"]} ${styles.flex}`}
							style={{ width: "33.5%" }}
							data-page-type={pageType}
							data-tracker-id={banners[0].placementId}
							data-display-name={banners[0].display_name}
						>
							<a href={banners[0].link} style={{ width: "100%" }}>
								<div
									className={styles.shadow}
									className={`${styles["responsively-lazy"]} ${
										styles["width100"]
									}`}
									style={{
										paddingBottom: `${(100 * banners[0].config.height) /
											banners[0].config.width}%`
									}}
								>
									<Image
										src={banners[0].img}
										className={`${styles["animating-placeholder"]} ${
											styles["width100"]
										} ${styles["img-responsive"]}`}
										placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
										alt={banners[0].display_name}
									/>
								</div>
							</a>
						</div>
					</ViewportTrackerHOC>
					<div className={`${styles["p-0-5"]}`} style={{ width: "25%" }}>
						<ViewportTrackerHOC
							clickEvent={`BANNER-CLICK`}
							disableViewportTracking={false}
						>
							<div
								className={`${styles["mb-10"]} ${styles.flex}`}
								data-page-type={pageType}
								data-tracker-id={banners[1].placementId}
								data-display-name={banners[1].display_name}
							>
								<a href={banners[1].link} style={{ width: "100%" }}>
									<div
										className={styles.shadow}
										className={`${styles["responsively-lazy"]} ${
											styles["width100"]
										}`}
										style={{
											paddingBottom: `${(100 * banners[1].config.height) /
												banners[1].config.width}%`
										}}
									>
										<Image
											src={banners[1].img}
											className={`${styles["animating-placeholder"]} ${
												styles["width100"]
											} ${styles["img-responsive"]}`}
											placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
											alt={banners[1].display_name}
										/>
									</div>
								</a>
							</div>
						</ViewportTrackerHOC>
						<ViewportTrackerHOC
							clickEvent={`BANNER-CLICK`}
							disableViewportTracking={false}
						>
							<div
								className={`${styles.flex}`}
								data-page-type={pageType}
								data-tracker-id={banners[2].placementId}
								data-display-name={banners[2].display_name}
							>
								<a href={banners[2].link} style={{ width: "100%" }}>
									<div
										className={styles.shadow}
										className={`${styles["responsively-lazy"]} ${
											styles["width100"]
										}`}
										style={{
											paddingBottom: `${(100 * banners[2].config.height) /
												banners[2].config.width}%`
										}}
									>
										<Image
											src={banners[2].img}
											className={`${styles["animating-placeholder"]} ${
												styles["width100"]
											} ${styles["img-responsive"]}`}
											placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
											alt={banners[2].display_name}
										/>
									</div>
								</a>
							</div>
						</ViewportTrackerHOC>
					</div>

					<ViewportTrackerHOC
						clickEvent={`BANNER-CLICK`}
						disableViewportTracking={false}
					>
						<div
							className={`${styles["p-0-5"]} ${styles.flex}`}
							style={{ width: "16.8%" }}
							data-page-type={pageType}
							data-tracker-id={banners[3].placementId}
							data-display-name={banners[3].display_name}
						>
							<a href={banners[3].link} style={{ width: "100%" }}>
								<div
									className={styles.shadow}
									className={`${styles["responsively-lazy"]} ${
										styles["width100"]
									}`}
									style={{
										paddingBottom: `${(100 * banners[3].config.height) /
											banners[3].config.width}%`
									}}
								>
									<Image
										src={banners[3].img}
										className={`${styles["animating-placeholder"]} ${
											styles["width100"]
										} ${styles["img-responsive"]}`}
										placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
										alt={banners[3].display_name}
									/>{" "}
								</div>
							</a>
						</div>
					</ViewportTrackerHOC>
					<div style={{ width: "25%" }} className={`${styles["p-0-5"]}`}>
						<ViewportTrackerHOC
							clickEvent={`BANNER-CLICK`}
							disableViewportTracking={false}
						>
							<div
								className={`${styles["mb-10"]} ${styles.flex}`}
								data-page-type={pageType}
								data-tracker-id={banners[4].placementId}
								data-display-name={banners[4].display_name}
							>
								<a href={banners[4].link} style={{ width: "100%" }}>
									<div
										className={styles.shadow}
										className={`${styles["responsively-lazy"]} ${
											styles["width100"]
										}`}
										style={{
											paddingBottom: `${(100 * banners[4].config.height) /
												banners[4].config.width}%`
										}}
									>
										<Image
											src={banners[4].img}
											className={`${styles["animating-placeholder"]} ${
												styles["width100"]
											} ${styles["img-responsive"]}`}
											placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
											alt={banners[4].display_name}
										/>
									</div>
								</a>
							</div>
						</ViewportTrackerHOC>
						<ViewportTrackerHOC
							clickEvent={`BANNER-CLICK`}
							disableViewportTracking={false}
						>
							<div
								className={`${styles.flex}`}
								data-page-type={pageType}
								data-tracker-id={banners[5].placementId}
								data-display-name={banners[5].display_name}
							>
								<a href={banners[5].link} style={{ width: "100%" }}>
									<div
										className={styles.shadow}
										className={`${styles["responsively-lazy"]} ${
											styles["width100"]
										}`}
										style={{
											paddingBottom: `${(100 * banners[5].config.height) /
												banners[5].config.width}%`
										}}
									>
										<Image
											src={banners[5].img}
											className={`${styles["animating-placeholder"]} ${
												styles["width100"]
											} ${styles["img-responsive"]}`}
											placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
											alt={banners[5].display_name}
										/>
									</div>
								</a>
							</div>
						</ViewportTrackerHOC>
					</div>
				</div>
			</div>
		);
	}
}

export default CBT6a;
