import React from "react";

import DT from "./includes/DT";
import FT from "./includes/FT";
import BT2a from "./includes/BT2a";
import BT3a from "./includes/BT3a";
import CBT6a from "./includes/CBT6a";
import CBT6b from "./includes/CBT6b";
import CBT12 from "./includes/CBT12";
import CBT12a from "./includes/CBT12a";
import CBT2a from "./includes/CBT2a";
import CBT6c from "./includes/CBT6c";
import CBT3a from "./includes/CBT3a";
import CBT8a from "./includes/CBT8a";
import ST1a from "./includes/ST1a";
import CBT5b from "./includes/CBT5b";
import BT from "./includes/BT";
import CT1 from "./includes/CT1";
import CT1a from "./includes/CT1a";
import BT6a from "./includes/BT6a";

import lang from "../../../utils/language";

import main_en from "../../../layout/main/main_en.styl";
import main_ar from "../../../layout/main/main_ar.styl";
import styles_en from "./pageData_en.styl";
import styles_ar from "./pageData_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class PageData extends React.Component {
	constructor() {
		super();
	}

	// breadcrums are pending...
	getContent = () => {
		const { content, index, pageType } = this.props;
		console.log(content);
		switch (content.layout_id) {
			case "CT1a":
				return <CT1a content={content} />;

			case "CT1":
				return <CT1 content={content} />;

			case "CBT6a": {
				return (
					<CBT6a content={content} index={`${content.layout_id}${index}`} />
				);
			}
			case "CBT6b": {
				return (
					<CBT6b content={content} index={`${content.layout_id}${index}`} />
				);
			}
			case "DT1":
				return <DT content={content} index={`${content.layout_id}${index}`} />;
			case "FT1":
				return (
					<FT
						content={content}
						index={`${content.layout_id}${index}`}
						pageType={pageType}
					/>
				);

			// case 'BT9':
			//   return (
			//     <div className={styles['ff-t-i']}>
			//       <div className={`${styles.e} ${styles['mr-5']}`}>
			//         <span className={`${styles.title} ${styles['fs-20']}`}>TOP IN ELECTRONICS</span>
			//         <Slider
			//           asNavFor={sliderTIE}
			//           ref={(slider) => { sliderTIE = slider; }}
			//           lazyLoad
			//           className={styles['ht-100per']}
			//           slidesToShow={6}
			//         >
			//           {tie.map(i => (
			//             <div className={styles.item} key={i}>
			//               <a href={i.link}>
			//                 <img src={i.img} alt={i.title} />
			//               </a>
			//               <span
			// className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex}
			// ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>
			// {i.title}</span>
			//             </div>
			//           ))}
			//         </Slider>
			//       </div>
			//       <div className={`${styles['h-a-l']} ${styles['ml-5']}`}>
			//         <span className={`${styles.title} ${styles['fs-20']}`}>
			// TOP IN FASHION | LIFESTYLE</span>
			//         <Slider
			//           asNavFor={sliderHAL}
			//           ref={(slider) => { sliderHAL = slider; }}
			//           lazyLoad
			//           className={styles['ht-100per']}
			//           slidesToShow={6}
			//         >
			//           {hal.map(i => (
			//             <div className={styles.item} key={i}>
			//               <a href={i.link}>
			//                 <img src={i.img} alt="" />
			//               </a>
			//               <span className={`${styles['fs-12']} ${styles['pt-10']} ${styles.flex}
			// ${styles['justify-center']} ${styles['slider-elips']} ${styles['lne-ht1_2']}`}>
			// {i.title}</span>
			//             </div>
			//           ))}
			//         </Slider>
			//       </div>
			//     </div>
			//   );
			case "BT1":
			case "BT2":
			case "BT3":
			case "BT4":
			case "BT6":
			case "BT7": {
				return <BT content={content} pageType={pageType} />;
			}
			case "CBT6a": {
				return (
					<CBT6a content={content} index={`${content.layout_id}${index}`} />
				);
			}
			case "CBT6b": {
				return (
					<CBT6b content={content} index={`${content.layout_id}${index}`} />
				);
			}

			case "DT1":
				return <DT content={content} index={`${content.layout_id}${index}`} />;

			case "FT1":
				return <FT content={content} index={`${content.layout_id}${index}`} />;

			case "CBT12":
				return (
					<CBT12 content={content} index={`${content.layout_id}${index}`} />
				);

			case "CBT12a":
				return (
					<CBT12a content={content} index={`${content.layout_id}${index}`} />
				);

			case "CBT5b":
				return <CBT5b content={content} pageType={pageType} />;

			case "CBT6c":
				return <CBT6c content={content} />;

			case "ST1a":
				return <ST1a content={content} />;

			case "CBT2a":
				return <CBT2a content={content} />;

			case "CBT3a":
				return <CBT3a content={content} />;

			case "CBT8a":
				return <CBT8a content={content} />;

			case "BT2a":
				return (
					<BT2a content={content} index={`${content.layout_id}${index}`} />
				);

			case "BT3a":
				return (
					<BT3a content={content} index={`${content.layout_id}${index}`} />
				);

			case "BT6a":
				return (
					<BT6a content={content} index={`${content.layout_id}${index}`} />
				);

			default:
				return null;
		}
	};

	returnBanner = (index, banners) => (
		<div
			className={`${styles["thick-gry-clr"]} ${styles["fs-14"]} ${
				styles["mt-10"]
			} ${styles.pointer}`}
		>
			{banners[index].breadcrumb &&
				banners[index].breadcrumb.data &&
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

	render() {
		const { content } = this.props;
		if (!content.visible) return null;
		return this.getContent();
	}
}

export default PageData;
