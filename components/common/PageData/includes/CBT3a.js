import React from "react";

import dynamic from "next/dynamic";
const Image = dynamic(import("react-graceful-image"), { ssr: false });
import ViewportTrackerHOC from "../../ViewPortTracker/ViewportTrackerHOC";

import lang from "../../../../utils/language";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const CBT3a = ({ content, pageType }) => {
	const returnBanner = (index, banners) => {
		return (
			<ViewportTrackerHOC
				clickEvent={`BANNER-CLICK`}
				disableViewportTracking={false}
			>
				<a
					href={banners[index].link}
					data-page-type={pageType}
					data-tracker-id={banners[index].placementId}
					data-display-name={banners[index].display_name}
					className={styles.width100}
				>
					<div
						className={`${styles["responsively-lazy"]}`}
						style={{
							paddingBottom: `${(100 * banners[index].config.height) /
								banners[index].config.width}%`
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
			</ViewportTrackerHOC>
		);
	};

	const { banners, title, description } = content.data[lang];
	return (
		<div className={` ${styles["fashionBannerSpacing"]}`}>
			<div className={`${styles["fs-20"]} ${styles.title}`}>
				<div className={`${styles.pdL} ${styles["t-c"]}`}>
					{title && <h1 className={styles.fHeading}>{title}</h1>}
					{description && <span>{description}</span>}
				</div>
			</div>
			<div className={`${styles["flex-prop"]}`}>
				<div className={styles.cbt3a}>
					<div className={styles.wrapper}>
						<div className={styles.img1}>{returnBanner(0, banners)}</div>
						<div className={styles.img2}>{returnBanner(1, banners)}</div>
						<div className={styles.img3}>{returnBanner(2, banners)}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CBT3a;
