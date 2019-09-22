import React from "react";
import Slider from "react-slick";
import lang from "../../../../utils/language";
import ViewportTrackerHOC from "../../ViewPortTracker/ViewportTrackerHOC";

import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTBS = "";

const CT1 = ({ content, pageType }) => {
	return (
		<div className={`${styles["mb-20"]} top-banner-slider slider-dots-part`}>
			{content.data[lang].title && (
				<h3 className={styles["mt-0"]}>{content.data[lang].title}</h3>
			)}
			<Slider
				dots
				autoplay
				asNavFor={sliderTBS}
				ref={slider => {
					sliderTBS = slider;
				}}
				lazyLoad={false}
				className={`${styles["main-slider-part"]} ${styles.flex} ${
					styles["flex-colum"]
				}`}
				customPaging={i => (
					<span className={`${styles["fs-10"]}`}>
						{content.data[lang].banners[i].display_name}
					</span>
				)}
			>
				{content.data[lang].banners.map(i => (
					<ViewportTrackerHOC
						clickEvent={`BANNER-CLICK`}
						disableViewportTracking={false}
					>
						<div
							key={i.display_name}
							data-page-type={pageType}
							data-tracker-id={i.placementId}
							data-display-name={i.display_name}
						>
							<a href={i.link}>
								<div
									className={`${styles.item} ${styles["slick-itm"]}`}
									key={i.display_name}
								>
									<img src={i.img} alt={i.display_name} />
								</div>
							</a>
						</div>
					</ViewportTrackerHOC>
				))}
			</Slider>
		</div>
	);
};

export default CT1;
