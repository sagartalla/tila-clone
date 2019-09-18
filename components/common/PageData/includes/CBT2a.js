import React from "react";

import dynamic from "next/dynamic";
const Image = dynamic(import("react-graceful-image"), { ssr: false });

import lang from "../../../../utils/language";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const CBT2a = ({ content }) => {
	const returnBanner = (index, banners) => {
		return (
			<a href={banners[index].link}>
				<div
					className={`${styles["responsively-lazy"]} ${styles["width100"]}`}
					style={{
						paddingBottom: `${(100 * banners[0].config.height) /
							banners[0].config.width}%`
					}}
				>
					<Image
						src={banners[index].img}
						className={`${styles["animating-placeholder"]} ${
							styles["width100"]
						}`}
						placeholderColor={`linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)`}
						alt={banners[index].display_name}
					/>
				</div>
			</a>
		);
	};

	const { banners, title, description } = content.data[lang];
	return (
		<div className={styles.fashionBannerSpacing}>
			<div className={`${styles["fs-20"]} ${styles.title}`}>
				<div
					className={`${styles.pdL} ${styles["t-l"]}`}
					style={{ paddingLeft: "102px" }}
				>
					<h1 className={styles.fHeading}>{title}</h1>
					<span>{description}</span>
				</div>
			</div>
			<div className={styles.cbt2aBanner}>
				<div className={styles.F1banner}>{returnBanner(0, banners)}</div>
				<div className={styles.F2banner}>
					<div>{returnBanner(1, banners)}</div>
				</div>
			</div>
		</div>
	);
};

export default CBT2a;
