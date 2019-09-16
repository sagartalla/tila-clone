import React, { Component } from "react";

import dynamic from "next/dynamic";
const Image = dynamic(import("react-graceful-image"), { ssr: false });

import lang from "../../../../utils/language";
import PageData from "../index";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

import dynamic from "next/dynamic";
const Image = dynamic(import("react-graceful-image"), { ssr: false });

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class CBT12a extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { content } = this.props;
		const { config = {}, data } = content;
		const { banners } = content.data[lang];
		return (
			<div className={`${styles["display-t-i-cb"]} ${styles.flex} `}>
				<div className={`${styles.flex}`} style={{ width: "50%" }}>
					<div style={{ width: "33.3%" }}>
						<div
							className={`${styles["pr-5"]} ${styles["pb-5"]} ${
								styles["pl-5"]
							} `}
						>
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
										className={`${styles["animating-placeholder"]} ${
											styles["width100"]
										} ${styles["img-responsive"]}`}
										placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
										alt={banners[0].display_name}
										width={banners[0].config.width}
										height={banners[0].config.height}
									/>
								</div>
							</a>
						</div>
						<div
							className={`${styles["pr-5"]} ${styles["pt-5"]} ${
								styles["pl-5"]
							}`}
						>
							<a href={banners[2].link}>
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
										className={`${styles["animating-placeholder"]} ${
											styles["width100"]
										} ${styles["img-responsive"]}`}
										placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
										alt={banners[1].display_name}
										width={banners[1].config.width}
										height={banners[1].config.height}
									/>
								</div>
							</a>
						</div>
					</div>
					<div style={{ width: "66.8%" }}>
						<div
							className={`${styles["pl-5"]} ${styles["pb-5"]} ${
								styles["pr-5"]
							}`}
						>
							<a href={banners[1].link}>
								<div
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
										width={banners[2].config.width}
										height={banners[2].config.height}
									/>
								</div>
							</a>
						</div>

						<div className={`${styles.flex}`} style={{ width: "100%" }}>
							<div
								className={`${styles["pl-5"]} ${styles["pt-5"]} ${
									styles["pr-5"]
								}`}
								style={{ width: "50%" }}
							>
								<a href={banners[3].link}>
									<div
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
											width={banners[3].config.width}
											height={banners[3].config.height}
										/>
									</div>
								</a>
							</div>

							<div
								className={`${styles["pl-5"]} ${styles["pt-5"]} ${
									styles["pr-5"]
								}`}
								style={{ width: "50%" }}
							>
								<a href={banners[4].link}>
									<div
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
											width={banners[4].config.width}
											height={banners[4].config.height}
										/>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.flex}`} style={{ width: "50%" }}>
					<div style={{ width: "33.3%" }}>
						<div
							className={`${styles["pr-5"]} ${styles["pb-5"]} ${
								styles["pl-5"]
							}`}
						>
							<a href={banners[5].link}>
								<div
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
										width={banners[5].config.width}
										height={banners[5].config.height}
									/>
								</div>
							</a>
						</div>
						<div
							className={`${styles["pr-5"]} ${styles["pt-5"]} ${
								styles["pl-5"]
							}`}
						>
							<a href={banners[6].link}>
								<div
									className={`${styles["responsively-lazy"]} ${
										styles["width100"]
									}`}
									style={{
										paddingBottom: `${(100 * banners[6].config.height) /
											banners[6].config.width}%`
									}}
								>
									<Image
										src={banners[6].img}
										className={`${styles["animating-placeholder"]} ${
											styles["width100"]
										} ${styles["img-responsive"]}`}
										placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
										alt={banners[6].display_name}
										width={banners[6].config.width}
										height={banners[6].config.height}
									/>
								</div>
							</a>
						</div>
					</div>
					<div style={{ width: "66.8%" }}>
						<div className={`${styles.flex}`} style={{ width: "100%" }}>
							<div
								className={`${styles["pl-5"]} ${styles["pb-5"]} ${
									styles["pr-5"]
								}`}
								style={{ width: "50%" }}
							>
								<a href={banners[7].link}>
									<div
										className={`${styles["responsively-lazy"]} ${
											styles["width100"]
										}`}
										style={{
											paddingBottom: `${(100 * banners[7].config.height) /
												banners[7].config.width}%`
										}}
									>
										<Image
											src={banners[7].img}
											className={`${styles["animating-placeholder"]} ${
												styles["width100"]
											} ${styles["img-responsive"]}`}
											placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
											alt={banners[7].display_name}
											width={banners[7].config.width}
											height={banners[7].config.height}
										/>
									</div>
								</a>
							</div>

							<div
								className={`${styles["pl-5"]} ${styles["pb-5"]} ${
									styles["pr-5"]
								}`}
								style={{ width: "50%" }}
							>
								<a href={banners[8].link}>
									<div
										className={`${styles["responsively-lazy"]} ${
											styles["width100"]
										}`}
										style={{
											paddingBottom: `${(100 * banners[8].config.height) /
												banners[8].config.width}%`
										}}
									>
										<Image
											src={banners[8].img}
											className={`${styles["animating-placeholder"]} ${
												styles["width100"]
											} ${styles["img-responsive"]}`}
											placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
											alt={banners[8].display_name}
											width={banners[8].config.width}
											height={banners[8].config.height}
										/>
									</div>
								</a>
							</div>
						</div>
						<div
							className={`${styles["pl-5"]} ${styles["pt-5"]} ${
								styles["pr-5"]
							}`}
						>
							<a href={banners[9].link}>
								<div
									className={`${styles["responsively-lazy"]} ${
										styles["width100"]
									}`}
									style={{
										paddingBottom: `${(100 * banners[9].config.height) /
											banners[9].config.width}%`
									}}
								>
									<Image
										src={banners[9].img}
										className={`${styles["animating-placeholder"]} ${
											styles["width100"]
										} ${styles["img-responsive"]}`}
										placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
										alt={banners[9].display_name}
										width={banners[9].config.width}
										height={banners[9].config.height}
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

export default CBT12a;
