import React, { Component } from "react";

import dynamic from "next/dynamic";

import lang from "../../../../utils/language";
import PageData from "../index";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

const Image = dynamic(import("react-graceful-image"), { ssr: false });
import ViewportTrackerHOC from "../../ViewPortTracker/ViewportTrackerHOC";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class BT2a extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	returnBanner = (index, banners) => {
		return (
			<div
				className={`${styles["thick-gry-clr"]} ${styles["fs-14"]} ${
					styles["mt-10"]
				} ${styles.pointer} ${styles.breadcrumbML}`}
			>
				{banners[index].breadcrumb &&
					banners[index].breadcrumb.data.length > 0 &&
					banners[index].breadcrumb.data.map((bc, idx) => (
						<React.Fragment>
							<a className={styles["thick-gry-clr"]} href={bc.link}>
								<span>{bc.display_name}</span>
							</a>
							{banners[index].breadcrumb.data.length - 1 !== idx && (
								<span className={`${styles["ml-5"]} ${styles["mr-5"]}`}>
									{banners[index].breadcrumb.seperator}
								</span>
							)}
						</React.Fragment>
					))}
			</div>
		);
	};

	render() {
		const { content } = this.props;
		const { config = {}, data } = content;
		const { banners, breadcrumb, title } = content.data[lang];
		return (
			<div>
				<div className={`${styles["display-t-i-cb"]} ${styles["flex"]}`}>
					<div className={`${styles["fs-20"]} ${styles.title}`}>{title}</div>
					<ViewportTrackerHOC
						clickEvent={`BANNER-CLICK`}
						disableViewportTracking={false}
					>
						<div
							style={{ width: "50%" }}
							className={`${styles["p-0-5"]}`}
							data-page-type={pageType}
							data-tracker-id={banners[0].placementId}
							data-display-name={banners[0].display_name}
						>
							<div
								className={`${styles["mb-5"]} ${styles["fs-18"]} ${
									styles["fontW800"]
								} ${styles["error-color"]}`}
							>
								{content.data[lang].banners[0].title}
							</div>
							<a href={banners[0].link}>
								<div
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
										className={styles["img-responsive"]}
										className={`${styles["width100"]} ${
											styles["animating-placeholder"]
										}`}
										placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
										alt={banners[0].display_name}
									/>
								</div>
							</a>
							<div
								className={`${styles["thick-gry-clr"]} ${styles["fs-14"]} ${
									styles["mt-10"]
								} ${styles.pointer}`}
							>
								{this.returnBanner(0, banners)}
							</div>
						</div>
					</ViewportTrackerHOC>
					<ViewportTrackerHOC
						clickEvent={`BANNER-CLICK`}
						disableViewportTracking={false}
					>
						<div
							style={{ width: "50%" }}
							className={`${styles["p-0-5"]}`}
							data-page-type={pageType}
							data-tracker-id={banners[1].placementId}
							data-display-name={banners[1].display_name}
						>
							<div
								className={`${styles["mb-5"]} ${styles["fs-18"]} ${
									styles["fontW800"]
								} ${styles["error-color"]}`}
							>
								{content.data[lang].banners[1].title}
							</div>
							<a href={banners[1].link}>
								<div
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
										className={styles["img-responsive"]}
										className={`${styles["width100"]} ${
											styles["animating-placeholder"]
										}`}
										placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
										alt={banners[1].display_name}
									/>
								</div>
							</a>
							<div
								className={`${styles["thick-gry-clr"]} ${styles["fs-14"]} ${
									styles["mt-10"]
								} ${styles.pointer}`}
							>
								{this.returnBanner(1, banners)}
							</div>
						</div>
					</ViewportTrackerHOC>
				</div>
			</div>
		);
	}
}

export default BT2a;
