import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeCss } from '../../../utils/cssUtil';
import { Grid, Row, Col, Tabs, Tab, ProgressBar } from 'react-bootstrap';
import Theme from '../../helpers/context/theme';

import SVGCompoent from '../../common/SVGComponet';
const styles = mergeCss('components/Product/product');
import {languageDefinations} from '../../../utils/lang';
const {PDP_PAGE} = languageDefinations();

const Review = ({reviews}) => {
 return (
   <Theme.Consumer>
     {
       categoryType => (
         <div className={styles['review-main']}>
           <div className={`${styles['flex']} ${styles['pt-40']} ${styles['pb-40']}`}>
             <Col md={6}  className={styles['thck-gry-rt-border']}>
               <Col md={6} className={styles['t-c']}>
                 <div className={`${styles['review-no']}`}>4.0</div>
               </Col>
               <Col md={6}>
                 <div className={styles['lne-ht2']}>
                   <div className={`${styles['flx-spacebw-alignc']}`}>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.EXCELLENT}</span>
                     <ProgressBar bsStyle="danger" now={80} />
                   </div>
                   <div className={`${styles['flx-spacebw-alignc']}`}>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.VERY_GOOD}</span>
                     <ProgressBar bsStyle="danger" now={80} />
                   </div>
                   <div className={`${styles['flx-spacebw-alignc']}`}>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.AVERAGE}</span>
                     <ProgressBar bsStyle="danger" now={80} />
                   </div>
                   <div className={`${styles['flx-spacebw-alignc']}`}>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.FAIR}</span>
                     <ProgressBar bsStyle="danger" now={80} />
                   </div>
                   <div className={`${styles['flx-spacebw-alignc']}`}>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.POOR}</span>
                     <ProgressBar bsStyle="danger" now={80} />
                   </div>
                 </div>
               </Col>
             </Col>
             <Col md={6} className={styles['flex-center']}>
               <Col md={6} className={styles['t-c']}>
                 <span>{PDP_PAGE.SHARE_EXPIERENCE}</span>
               </Col>
               <Col md={6}>
                 <div className={`${styles['flex']} ${styles['review-start']} ${styles['pb-10']}`}>
                   <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                   <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                   <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                   <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                   <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                 </div>
                 <a className={`${styles['fp-btn']} ${styles['fp-btn-default']} ${styles['wrt-btn']} ${styles['small-btn']}`}>{PDP_PAGE.WRITE_REVIEW}</a>
               </Col>
             </Col>
           </div>
           <div>
             <Col md={12}>
               <Col md={4}>
                 <div className={styles['flex-center']}>
                   <div className={`${styles['profile-img']} ${styles['flex']}`}>
                     <span></span>
                   </div>
                   <div className={`${styles['pl-20']} ${styles['thick-gry-clr']}`}>
                     <h5 className={`${styles['mb-0']} ${styles['fontW600']}`}>Huda Beauty</h5>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.SOCIAL_INFLUENCER}</span>
                     <div className={`${styles['flex']} ${styles['review-start-inn']} ${styles['pb-10']}`}>
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                     </div>
                   </div>
                 </div>
               </Col>
               <Col md={8} className={styles['p-0']}>
                 <h4 className={`${styles['fs-16']} ${styles['thick-gry-clr']}`}>{PDP_PAGE.REVIEW_TITLE_PLACE}</h4>
                 <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>Tailoring is part of the Stella McCartney DNA and for SS18 classics are twisted using vivid colours and contrasting volumes. Pair jackets with casual trousers and sporty shoes for a relaxed look. </p>
               </Col>
             </Col>
             <Col md={12}>
               <Col md={4}>
                 <div className={styles['flex-center']}>
                   <div className={`${styles['profile-img']} ${styles['flex']}`}>
                     <span></span>
                   </div>
                   <div className={`${styles['pl-20']} ${styles['thick-gry-clr']}`}>
                     <h5 className={`${styles['mb-0']} ${styles['fontW600']}`}>Huda Beauty</h5>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.SOCIAL_INFLUENCER}</span>
                     <div className={`${styles['flex']} ${styles['review-start-inn']} ${styles['pb-10']}`}>
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                     <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                   <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                 <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
               <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                     </div>
                   </div>
                 </div>
               </Col>
               <Col md={8} className={styles['p-0']}>
                 <h4 className={`${styles['fs-16']} ${styles['thick-gry-clr']}`}>{PDP_PAGE.REVIEW_TITLE_PLACE}</h4>
                 <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>Tailoring is part of the Stella McCartney DNA and for SS18 classics are twisted using vivid colours and contrasting volumes. Pair jackets with casual trousers and sporty shoes for a relaxed look. </p>
               </Col>
             </Col>
             <Col md={12}>
               <Col md={4}>
                 <div className={styles['flex-center']}>
                   <div className={`${styles['profile-img']} ${styles['flex']}`}>
                     <span></span>
                   </div>
                   <div className={`${styles['pl-20']} ${styles['thick-gry-clr']}`}>
                     <h5 className={`${styles['mb-0']} ${styles['fontW600']}`}>Huda Beauty</h5>
                     <span className={`${styles['fs-12']}`}>{PDP_PAGE.SOCIAL_INFLUENCER}</span>
                     <div className={`${styles['flex']} ${styles['review-start-inn']} ${styles['pb-10']}`}>
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                       <SVGCompoent clsName={`${styles['star-icon']}`} src={`icons/common-icon/star/${categoryType.toLowerCase()}-star`} />
                     </div>
                   </div>
                 </div>
               </Col>
               <Col md={8} className={styles['p-0']}>
                 <h4 className={`${styles['fs-16']} ${styles['thick-gry-clr']}`}>{PDP_PAGE.REVIEW_TITLE_PLACE}</h4>
                 <p className={`${styles['fs-12']} ${styles['thick-gry-clr']}`}>Tailoring is part of the Stella McCartney DNA and for SS18 classics are twisted using vivid colours and contrasting volumes. Pair jackets with casual trousers and sporty shoes for a relaxed look. </p>
               </Col>
             </Col>
           </div>
         </div>
       )
     }
   </Theme.Consumer>
 );
}

export default Review;
