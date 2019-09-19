import React, { Component } from "react";
import lang from "../../../../utils/language";
import dynamic from "next/dynamic";
import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";
const Image = dynamic(import("react-graceful-image"), { ssr: false });
import ViewportTrackerHOC from "../../ViewPortTracker/ViewportTrackerHOC";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const BT = ({ content, pageType }) => {
	const { banners } = content.data[lang];
	return (
		<div className={`${styles["display-banner-i"]} `}>
			{content.data[lang].title && (
				<h3
					className={`${styles["thick-gry-clr"]} ${styles["fs-20"]} ${
						styles["mt-0"]
					} ${styles["pl-10"]} ${styles["pr-10"]}`}
				>
					{content.data[lang].title}
				</h3>
			)}
			<div className={`${styles["banner-prt-main"]}`}>
				{banners.length > 0 &&
					banners.map(banner => (
						<ViewportTrackerHOC
							clickEvent={`BANNER-CLICK`}
							disableViewportTracking={false}
						>
							<div
								data-page-type={pageType}
								data-tracker-id={
									banner.placementId + "__" + banner.display_name
								}
								data-merchandise-id={banner.merchandiseId}
								data-user-id={`u765432563856856`}
								className={styles["banner-inn-prt"]}
								style={{ width: `${100 / banners.length}%` }}
							>
								<div
									className={`${styles["responsively-lazy"]} ${
										styles["sub-banr-img"]
									}`}
									style={{
										paddingBottom: `${(100 * banner.config.height) /
											banner.config.width}%`
									}}
								>
									<a
										href={banner.link}
										rel="noopener noreferrer"
										target="_blank"
									>
										<Image
											src={banner.img}
											className={`${styles["animating-placeholder"]} ${
												styles["inside-bnr"]
											}`}
											placeholderColor={`linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%)`}
											alt={banner.display_name}
										/>
									</a>
								</div>
							</div>
						</ViewportTrackerHOC>
					))}
			</div>
		</div>
	);
};

export default BT;
