import React from "react";

import lang from "../../../../utils/language";
import main_en from "../../../../layout/main/main_en.styl";
import main_ar from "../../../../layout/main/main_ar.styl";
import styles_en from "../pageData_en.styl";
import styles_ar from "../pageData_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

const CBT5b = ({ content }) => {
	const returnBanner = (index, banners) => {
		return (
			<a href={banners[index].link}>
				<div
					className={`responsively-lazy ${styles["responsively-lazy"]} ${
						styles["width100"]
					} ${styles.shadow}`}
					style={{
						paddingBottom: `${(100 * banners[index].config.height) /
							banners[index].config.width}%`
					}}
				>
					<img
						src={banners[index].img}
						// width={banners[index].config.width}
						// height={banners[index].config.height}
						// style={{ position: "absolute" }}
						srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
						// srcset="https://www.jensenleisurefurniture.com/wp-content/themes/jensen-leisure/media/woocommerce/product-placeholder.png"
						className={`${styles["width100"]} ${styles["img-responsive"]}`}
					/>
				</div>
			</a>
		);
	};

	const { banners, breadcrumb, title } = content.data[lang];
	return (
		<div className={`${styles["display-t-i-f"]}`}>
			<div className={`${styles["fs-20"]} ${styles.title}`}>{title}</div>
			<div className={styles.d1}>
				<div>{returnBanner(0, banners)}</div>
				<div>{returnBanner(1, banners)}</div>
			</div>
			<div className={styles.d2}>
				<div>{returnBanner(2, banners)}</div>
				<div>{returnBanner(3, banners)}</div>
			</div>
			<div className={`${styles.d3} ${styles.right0}`}>
				<div>{returnBanner(4, banners)}</div>
			</div>
			<div
				className={`${styles["thick-gry-clr"]} ${styles["fs-14"]} ${
					styles["mt-10"]
				} ${styles.pointer} ${styles.breadcrumbML}`}
			>
				{breadcrumb &&
					breadcrumb.length > 0 &&
					breadcrumb.map((bc, idx) => (
						<React.Fragment>
							<a className={styles["thick-gry-clr"]} href={bc.link}>
								<span>{bc.display_name}</span>
							</a>
							{breadcrumb.length - 1 !== idx && (
								<span className={`${styles["ml-5"]} ${styles["mr-5"]}`}>|</span>
							)}
						</React.Fragment>
					))}
			</div>
		</div>
	);
};

export default CBT5b;
