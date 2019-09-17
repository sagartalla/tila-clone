import React from "react";
import Slider from "react-slick";
import { Row } from "react-bootstrap";
import dynamic from "next/dynamic";
const Image = dynamic(import("react-graceful-image"), { ssr: false });
import ViewportTrackerHOC from "../ViewPortTracker/ViewportTrackerHOC";

import DT from "./includes/DT";
import FT from "./includes/FT";
import BT2a from "./includes/BT2a";
import BT3a from "./includes/BT3a";
import CBT6a from "./includes/CBT6a";
import CBT6b from "./includes/CBT6b";
import CBT12 from "./includes/CBT12";
import CBT12a from "./includes/CBT12a";
import lang from "../../../utils/language";

import main_en from "../../../layout/main/main_en.styl";
import main_ar from "../../../layout/main/main_ar.styl";
import styles_en from "./pageData_en.styl";
import styles_ar from "./pageData_ar.styl";

import CBT2a from "./includes/CBT2a";
import CBT6c from "./includes/CBT6c";
import CBT3a from "./includes/CBT3a";
import CBT8a from "./includes/CBT8a";
import ST1a from "./includes/ST1a";
import CBT5b from "./includes/CBT5b";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTBS = "";
// let sliderTIE = '';
// let sliderHAL = '';

// const tie = [{
//   img: '/static/img/landing-home/Mobiles.png',
//   title: 'Mobiles',
//   link: `/${lang}/srp/mobiles?categoryTree=true&isListed=true&sid=848,849`,
// }, {
//   img: '/static/img/landing-home/Laptops.png',
//   title: 'Laptops',
//   link: `/${lang}/srp/laptops?categoryTree=true&isListed=true&sid=848,864`,
// }, {
//   img: '/static/img/landing-home/storage-devices.png',
//   title: 'Storage Devices',
//   link: `/${lang}/search?q=Storage&&isListed=true`,
// }, {
//   img: '/static/img/landing-home/cameras.png',
//   title: 'Cameras',
//   link: `/${lang}/srp/camera?categoryTree=true&isListed=true&sid=848,882`,
// }, {
//   img: '/static/img/landing-home/television.png',
//   title: 'Televisions',
//   link: `/${lang}/srp/televisions?categoryTree=true&isListed=true&sid=848,878`,
// }, {
//   img: '/static/img/landing-home/home-appliances.png',
//   title: 'Home Appliances',
//   link: `/${lang}/srp/home-applaince?categoryTree=true&isListed=true&sid=932,935`,
// }, {
//   img: '/static/img/landing-home/storage-devices.png',
//   title: 'Storage Devices',
//   link: `/${lang}/search?q=Storage&&isListed=true`,
// }];

// const hal = [{
//   img: '/static/img/landing-home/womens-clothing.png',
//   title: 'Womens Clothing',
//   link: `/${lang}/srp/clothing?categoryTree=true&isListed=true&sid=892,910`,
// }, {
//   img: '/static/img/landing-home/mens-clothing.png',
//   title: 'Mens Clothing',
//   link: `/${lang}/srp/clothing?categoryTree=true&isListed=true&sid=892,899`,
// }, {
//   img: '/static/img/landing-home/jewellery.png',
//   title: 'Jewellery',
//   link: `/${lang}/search?q=Jewellery&&isListed=true`,
// }, {
//   img: '/static/img/landing-home/fashion-acessories.png',
//   title: 'Fashion Accessories',
//   link: `/${lang}/srp/fashion-accessories?categoryTree=true&isListed=true&sid=892,923`,
// }, {
//   img: '/static/img/landing-home/watches.png',
//   title: 'Watches',
//   link: `/${lang}/srp/watch?categoryTree=true&isListed=true&sid=892,929`,
// }, {
//   img: '/static/img/landing-home/perfumes.png',
//   title: 'Perfumes',
//   link: `/${lang}/srp/fragrance?categoryTree=true&isListed=true&sid=932,958,964`,
// }, {
//   img: '/static/img/landing-home/jewellery.png',
//   title: 'Jewellery',
//   link: `/${lang}/search?q=Jewellery&&isListed=true`,
// }];

class PageData extends React.Component {
	constructor() {
		super();
	}
	// breadcrums are pending...
	getContent = () => {
		const { content, index, pageType } = this.props;
		// console.log({ content });

		switch (content.layout_id) {
			case "CT1a":
				return (
					<div
						className={`${styles["mb-20"]} top-banner-slider slider-dots-part`}
					>
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
								<div key={i.display_name}>
									<a href={i.link}>
										<div
											className={`${styles.item} ${styles["slick-itm"]}`}
											key={i.display_name}
										>
											<img src={i.img} alt={i.display_name} />
										</div>
									</a>
								</div>
							))}
						</Slider>
					</div>
				);

			case "CT1":
				return (
					<div
						className={`${styles["mb-20"]} top-banner-slider slider-dots-part`}
					>
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
								<div key={i.display_name}>
									<a href={i.link}>
										<div
											className={`${styles.item} ${styles["slick-itm"]}`}
											key={i.display_name}
										>
											<img src={i.img} alt={i.display_name} />
										</div>
									</a>
								</div>
							))}
						</Slider>
					</div>
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
			case "BT2":
			case "BT3":
			case "BT4":
			case "BT6":
			case "BT7": {
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
											data-tracker-id={`tracker-${Math.round(
												new Date().getTime() / 1000
											) + Math.random()}`}
											data-merchandise-id={`33566544`}
											data-user-id={`u765432563856856`}
											className={`${styles["banner-inn-prt"]}`}
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
														width={banner.config.width}
														height={banner.config.height}
													/>
												</a>
											</div>
										</div>
									</ViewportTrackerHOC>
								))}
						</div>
					</div>
				);
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

			case "CBT12": {
				return (
					<CBT12 content={content} index={`${content.layout_id}${index}`} />
				);
			}

			case "CBT12a": {
				return (
					<CBT12a content={content} index={`${content.layout_id}${index}`} />
				);
			}

			case "CBT5b": {
				return <CBT5b content={content} />;
			}

			case "CBT6c": {
				return <CBT6c content={content} />;
			}

			case "ST1a": {
				return <ST1a content={content} />;
			}

			case "CBT2a": {
				return <CBT2a content={content} />;
			}

			case "CBT3a": {
				return <CBT3a content={content} />;
			}

			case "CBT8a": {
				return <CBT8a content={content} />;
			}

			case "BT2a": {
				return (
					<BT2a content={content} index={`${content.layout_id}${index}`} />
				);
			}

			case "BT3a": {
				return (
					<BT3a content={content} index={`${content.layout_id}${index}`} />
				);
			}

			case "BT6a": {
				return (
					<BT6a content={content} index={`${content.layout_id}${index}`} />
				);
			}

			default:
				return null;
		}
	};

	update = () => {
		this.setState({
			currentViewPortWidth: window.innerWidth
		});
	};

	returnBanner = (index, banners) => {
		return (
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
	};

	render() {
		const { content } = this.props;
		if (!content.visible) return null;

		return this.getContent();
	}
}

export default PageData;
