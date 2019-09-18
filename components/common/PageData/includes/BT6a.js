import React, { Component } from "react";

import dynamic from "next/dynamic";
const Image = dynamic(import("react-graceful-image"), { ssr: false });

import lang from "../../../../utils/language";
import PageData from "../index";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class BT6a extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { content } = this.props;
		const { config = {}, data } = content;
		const { banners } = content.data[lang];

		return (
			<div>
				<div className={`${styles["display-t-i-cb"]} ${styles.flex}`}>
					<div className={`${styles["p-0-5"]}`} style={{ width: "33.3%" }}>
						<div className={`${styles["mb-10"]}`}>
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
										className={styles["img-responsive"]}
										className={`${styles["width100"]} ${
											styles["animating-placeholder"]
										}`}
										placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
										alt={banners[0].display_name}
									/>
								</div>
							</a>
						</div>

						<div className={`${styles.flex}`}>
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
										className={styles["img-responsive"]}
										className={`${styles["width100"]} ${
											styles["animating-placeholder"]
										}`}
										placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
										alt={banners[1].display_name}
									/>
								</div>
							</a>
						</div>
					</div>

					<div style={{ width: "33.3%" }} className={`${styles["p-0-5"]}`}>
						<div className={`${styles["mb-10"]}`}>
							<a href={banners[2].link} style={{ width: "100%" }}>
								<div
									className={styles.shadow}
									className={`${styles["width100"]}`}
								>
									<img
										src={banners[2].img}
										alt=""
										className={styles["img-responsive"]}
										className={`${styles["width100"]}`}
									/>
								</div>
							</a>
						</div>

						<div className={`${styles.flex}`}>
							<a href={banners[3].link} style={{ width: "100%" }}>
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
										className={styles["img-responsive"]}
										className={`${styles["width100"]} ${
											styles["animating-placeholder"]
										}`}
										placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
										alt={banners[2].display_name}
									/>
								</div>
							</a>
						</div>
					</div>

					<div style={{ width: "33.3%" }} className={`${styles["p-0-5"]}`}>
						<div className={`${styles["mb-10"]}`}>
							<a href={banners[4].link} style={{ width: "100%" }}>
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
										className={styles["img-responsive"]}
										className={`${styles["width100"]} ${
											styles["animating-placeholder"]
										}`}
										placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
										alt={banners[3].display_name}
									/>
								</div>
							</a>
						</div>

						<div className={`${styles.flex}`}>
							<a href={banners[5].link} style={{ width: "100%" }}>
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
										className={styles["img-responsive"]}
										className={`${styles["width100"]} ${
											styles["animating-placeholder"]
										}`}
										placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
										alt={banners[4].display_name}
									/>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BT6a;
