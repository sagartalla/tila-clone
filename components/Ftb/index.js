import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Slider from "react-slick";

import HeaderBar from "../HeaderBar";
import PageData from "../common/PageData";
import FooterBar from "../Footer/index";
import { selectors } from "../../store/landing";
import lang from "../../utils/language";
import {
	actionCreators as wishlistActionCreators,
	selectors as wishListSelectors
} from "../../store/cam/wishlist";
import { selectors as authSelectors } from "../../store/auth";
import RecentView from "../Product/includes/RecentView";
import LoadingBar from "../common/Loader/skeletonLoader";
import LoaderBarContext from "../helpers/context/loaderBarContext";

import main_en from "../../layout/main/main_en.styl";
import main_ar from "../../layout/main/main_ar.styl";
import styles_en from "./ftb_en.styl";
import styles_ar from "./ftb_ar.styl";

const styles =
	lang === "en" ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

let sliderTIE = "";
let sliderHAL = "";

const hal = [
	{
		img: "/static/img/landing-home/womens-clothing.png",
		title: `${lang === "en" ? "Women's Clothing" : "الملابس النسائية"}`,
		link: `/${lang}/${true ? "Women's Clothing" : "ملابس نسائية"}/clp`,
		key: "Womens Clothing"
	},
	{
		img: "/static/img/landing-home/mens-clothing.png",
		title: `${lang === "en" ? "Men's Clothing" : "الملابس الرجالية"}`,
		link: `/${lang}/${true ? "Men's Clothing" : "ملابس رجالية"}/clp`,
		key: "Mens Clothing"
	},
	{
		img: "/static/img/landing-home/jewellery.png",
		title: `${lang === "en" ? "Jewellery" : "المجوهرات"}`,
		link: `/${lang}/${true ? "Jewellery" : "مجوهرات"}/clp`,
		key: "Jewellery"
	},
	{
		img: "/static/img/landing-home/watches.png",
		title: `${lang === "en" ? "Watches" : "ساعات اليد"}`,
		link: `/${lang}/${true ? "Watches" : "ساعات اليد"}/clp`,
		key: "Watches"
	},
	{
		img: "/static/img/landing-home/shoes_home.png",
		title: `${lang === "en" ? "Footwear" : "أحذية"}`,
		link: `/${lang}/${true ? "Footwear" : "أحذية"}/clp`,
		key: "Footwear"
	},
	{
		img: "/static/img/landing-home/sunglasse_home.png",
		title: `${lang === "en" ? "Sunglasses" : "نظارات شمسية"}`,
		link: `/${lang}/${true ? "Sunglasses" : "نظارات شمسية"}/clp`,
		key: "Sunglasses"
	},
	{
		img: "/static/img/landing-home/sports_home.png",
		title: `${lang === "en" ? "Sports & Outdoors" : "الرياضات والخارج"}`,
		link: `/${lang}/${true ? "Sports & Outdoor" : "الرياضات والخارج"
		}/clp`,
		key: "Sports & Outdoors"
	},
	{
		img: "/static/img/landing-home/fitness_home.png",
		title: `${lang === "en" ? "Exercise & Fitness" : " تدريبات ولياقة"}`,
		link: `/${lang}/${true ? "Exercise & Fitness" : "تدريبات ولياقة"
		}/clp`,
		key: "Exercise & Fitness"
	},
	{
		img: "/static/img/landing-home/toys_home.png",
		title: `${lang === "en" ? "Toys" : "ألعاب"}`,
		link: `/${lang}/${true ? "Toys" : "ألعاب"}/clp`,
		key: "Toys"
	},
	{
		img: "/static/img/landing-home/beauty_and_health.png",
		title: `${lang === "en" ? "Health & Beauty" : "الصحة والجمال"}`,
		link: `/${lang}/${true ? "Health & Beauty" : "الصحة والجمال"}/clp`,
		key: "Health & Beauty"
	},
	{
		img: "/static/img/landing-home/cushion_squilts.png",
		title: `${lang === "en" ? "Cushions & Covers" : "اغطية وسادات"}`,
		link: `/${lang}/${true ? "Cushions & Covers" : "اغطية وسادات"
		}/clp`,
		key: "Cushions & Covers"
	},
	{
		img: "/static/img/landing-home/home_sweet_home.png",
		title: `${lang === "en" ? "Door Mats" : "دواسَّات للباب"}`,
		link: `/${lang}/${true ? "Door Mats" : "دواسَّات للباب"}/clp`,
		key: "Door Mats"
	},
	{
		img: "/static/img/landing-home/car_freshners.png",
		title: `${lang === "en" ? "Car Freshener" : "معطرات جو"}`,
		link: `/${lang}/${true ? "Car Freshener" : "معطرات جو"}/clp`,
		key: "Car Freshener"
	},
	{
		img: "/static/img/landing-home/photo_frames.png",
		title: `${lang === "en" ? "Photo Frames" : "إطارات صور"}`,
		link: `/${lang}/${true ? "Photo Frames" : "اغطية وسادات"}/clp`,
		key: "Photo Frames"
	}
];

const tie = [
	{
		img: "/static/img/landing-home/Mobiles.png",
		title: `${lang === "en" ? "Mobiles" : "الجوالات"}`,
		link: `/${lang}/${true ? "mobiles" : "الهواتف-النقالة"}/clp`,
		key: "Mobiles"
	},
	{
		img: "/static/img/landing-home/Laptops.png",
		title: `${lang === "en" ? "Laptops" : "اللاب توبات"}`,
		link: `/${lang}/${true ? "laptops" : "أجهزة-الكمبيوتر-المحمولة"
		}/clp`,
		key: "Laptops"
	},
	{
		img: "/static/img/landing-home/memory.png",
		title: `${lang === "en" ? "Memory Devices" : "أجهزة التخزين"}`,
		link: `/${lang}/${true ? "storage devices" : "أجهزة التخزين"}/clp`,
		key: "Memory"
	},
	{
		img: "/static/img/landing-home/cameras.png",
		title: `${lang === "en" ? "Cameras" : "الكاميرات"}`,
		link: `/${lang}/${true ? "camera" : "الة-تصوير"}/clp`,
		key: "Cameras"
	},
	{
		img: "/static/img/landing-home/television.png",
		title: `${lang === "en" ? "Televisions" : "التلفزيونات"}`,
		link: `/${lang}/${true ? "televisions" : "التلفزيونات"}/clp`,
		key: "Televisions"
	},
	{
		img: "/static/img/landing-home/mobileaccess.png",
		title: `${lang === "en" ? "Mobile Accessories" : "اكسسوارات الجوالات"}`,
		link: `/${lang}/${true ? "mobile-accessories" : "ملحقات-الهاتف-المحمول"
		}/clp`,
		key: "Mobile Accessories"
	},
	{
		img: "/static/img/landing-home/tablets.png",
		title: `${lang === "en" ? "Tablet & iPads" : "اجهزة تابلت وايباد"}`,
		link: `/${lang}/${true ? "Tablet & iPads" : "اجهزة تابلت وايباد"
		}/clp`,
		key: "Tablets"
	},
	{
		img: "/static/img/landing-home/Kitchen-appliances.png",
		title: `${lang === "en" ? "Kitchen Appliances" : "أجهزة المطبخ"}`,
		link: `/${lang}/${true ? "kitchen-appliances" : "أدوات-المطبخ"
		}/clp`,
		key: "Kitchen Appliances"
	},
	{
		img: "/static/img/landing-home/smartwatch.png",
		title: `${lang === "en" ? "Smart Watches" : "ساعات ذكية‎"}`,
		link: `/${lang}/${true ? "Smart Watch" : "ساعات ذكية"}/clp`,
		key: "Smart Watch"
	},
	{
		img: "/static/img/landing-home/homeentertainment.png",
		title: `${lang === "en" ? "Home Entertainment" : "أجهزة ترفيهية"}`,
		link: `/${lang}/${true ? "Home Entertainment" : "أجهزة ترفيهية"
		}/clp`,
		key: "Home Entertainment"
	},
	{
		img: "/static/img/landing-home/routers.png",
		title: `${lang === "en" ? "Routers" : "راوترات"}`,
		link: `/${lang}/${true ? "Routers" : "راوترات"}/clp`,
		key: "Routers"
	},
	{
		img: "/static/img/landing-home/computerperepherals.png",
		title: `${lang === "en" ? "Computer Peripherals" : "ملحقات الكمبيوتر"}`,
		link: `/${lang}/${true ? "Computer Peripherals" : "ملحقات الكمبيوتر"
		}/clp`,
		key: "Computer Peripherals"
	},
	{
		img: "/static/img/landing-home/printers_home.png",
		title: `${lang === "en" ? "Printers" : "طابعات"}`,
		link: `/${lang}/${true ? "Printers" : "طابعات"}/clp`,
		key: "Printers"
	},
	{
		img: "/static/img/landing-home/Home_appliances.png",
		title: `${lang === "en" ? "Home Appliances" : "أجهزة المنزل"}`,
		link: `/${lang}/${true ? "Home Appliances" : "أجهزة المنزل"}/clp`,
		key: "Home Appliances"
	}
];

class FTB extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rv: []
		};
	}

	componentDidMount() {
		const { getRecentlyViewed, isLoggedIn } = this.props;
		if (isLoggedIn) getRecentlyViewed();
		this.setState({
			rv: localStorage.getItem("rv")
				? JSON.parse(localStorage.getItem("rv"))
				: []
		});
	}

	componentWillReceiveProps(nextProps) {
		const { getRecentlyViewed, isLoggedIn } = this.props;
		if (isLoggedIn !== nextProps.isLoggedIn) {
			getRecentlyViewed();
		}
	}

	render() {
		const { pageData, isAddedToCart, isLoggedIn, recentlyViewed } = this.props;
		const { rv } = this.state;
		return (
			<LoaderBarContext.Consumer>
				{context => (
					<div>
						<HeaderBar />
						<LoadingBar
							loadComponent={context.loadComponent}
							pathname={context.pathname}
						>
							{pageData.device !== "desktop" ? null : (
								<div
									className={`${styles["p-0"]} ${
										styles["land-page-mn-wdt"]
									} container-fluid`}
								>
									{pageData &&
										pageData.page_content.length > 0 &&
										pageData.page_content.map((content, index) => (
											<React.Fragment>
												{false && pageData.page_type === "homePage" && (
													<div className={styles["ff-t-i"]}>
														<div className={styles.e}>
															<span
																className={`${styles.title} ${styles["fs-20"]}`}
															>
																{lang === "en" ? "ELECTRONICS" : "الكترونيات‎"}
															</span>
															<div className="home-slider">
																<Slider
																	asNavFor={sliderTIE}
																	ref={slider => (sliderTIE = slider)}
																	lazyLoad
																	className={`${styles["ht-100per"]}`}
																	slidesToShow={10}
																>
																	{tie.map(i => (
																		<div>
																			<div className={styles.item} key={i}>
																				<a href={i.link}>
																					<img
																						src={i.img}
																						alt={i.title}
																						width="54"
																						height="60"
																					/>
																				</a>
																				<span
																					className={`${styles["fs-10"]} ${
																						styles["pt-10"]
																					} ${styles.flex} ${
																						styles["justify-center"]
																					} ${styles["slider-elips"]} ${
																						styles["lne-ht1_2"]
																					}`}
																				>
																					{i.title}
																				</span>
																			</div>
																		</div>
																	))}
																</Slider>
															</div>
														</div>
														<div className={styles["h-a-l"]}>
															<span
																className={`${styles.title} ${styles["fs-20"]}`}
															>
																{" "}
																{lang === "en"
																	? "FASHION & LIFESTYLE"
																	: "أزياء و لايف ستايل"}
															</span>
															<div className="home-slider">
																<Slider
																	asNavFor={sliderHAL}
																	ref={slider => (sliderHAL = slider)}
																	lazyLoad
																	className={styles["ht-100per"]}
																	slidesToShow={10}
																>
																	{hal.map(i => (
																		<div>
																			<div className={styles.item} key={i}>
																				<a href={i.link}>
																					<img src={i.img} />
																				</a>
																				<span
																					className={`${styles["fs-10"]} ${
																						styles["pt-10"]
																					} ${styles["justify-center"]} ${
																						styles["slider-elips"]
																					} ${styles["lne-ht1_2"]}`}
																				>
																					{i.title}
																				</span>
																			</div>
																		</div>
																	))}
																</Slider>
															</div>
														</div>
													</div>
												)}
												<PageData
													key={content}
													index={index}
													content={content}
													pageType={pageData.page_type}
												/>
											</React.Fragment>
										))}
									{pageData.page_type === "homePage" && (
										<div className={`${styles["bg-white"]} ${styles.flex}`}>
											<RecentView
												homePage
												isLoggedIn={isLoggedIn}
												recentlyViewed={
													isLoggedIn
														? recentlyViewed
														: rv.map(item => {
																item.isAddedToCart = isAddedToCart(item.id);
																return item;
														  })
												}
											/>
										</div>
									)}
								</div>
							)}
							<FooterBar />
						</LoadingBar>
					</div>
				)}
			</LoaderBarContext.Consumer>
		);
	}
}

const mapStateToProps = store => ({
	isLoggedIn: authSelectors.getLoggedInStatus(store),
	recentlyViewed: wishListSelectors.recentlyViewed(store),
	isAddedToCart: listingId => wishListSelectors.getCartStatus(store, listingId),
	pageData: selectors.getPage(store)
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getRecentlyViewed: wishlistActionCreators.getRecentlyViewed
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FTB);
