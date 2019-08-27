import React, { Component } from 'react';

import lang from '../../../../utils/language';
import PageData from '../index';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class CBT12 extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){

        const {content} = this.props;
        const { config = {}, data } = content;
        const { banners } = content.data[lang];

        return(<div>
            <div className={`${styles['display-t-i-cb']}`} >
              <div className={`${styles['flex']}`}>
                <div style={{width:'33.57%'}} className={`${styles['pr-10']} ${styles['pb-10']}`}>
                   <a href={banners[0].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[0].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                    </div>
                    </a>
                </div>
                <div style={{width:'33.57%'}} className={`${styles['pr-10']} ${styles['pb-10']}`}>
                <a href={banners[1].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[1].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                    </div>
                    </a>
                </div>
                <div style={{width:'33.57%'}} className={`${styles['pr-10']} ${styles['pb-10']}`}>
                <a href={banners[2].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[2].img}  alt="" className={styles['img-responsive']}  className={`${styles['width100']}`}/>
                    </div>
                    </a>
                </div>
              </div>
              <div className={`${styles['flex']}`}>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[3].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[3].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                    </div>
                    </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[4].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[4].img}  alt="" className={styles['img-responsive']}  className={`${styles['width100']}`}/>
                    </div>
                </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[5].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[5].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`}/>
                    </div>
                </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[6].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[6].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                    </div>
                </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[7].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[7].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`}/>
                    </div>
                </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[8].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[8].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                    </div>
                </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[9].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[9].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`}/>
                    </div>
                </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[10].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[10].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                    </div>
                </a>
                </div>
                <div style={{width:"11.43%"}} className={`${styles['pr-10']}`}>
                <a href={banners[11].link}>
                    <div className={`${styles['width100']}`}>
                    <img src={banners[11].img}  alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                    </div>
                </a>
                </div>
                </div>
              </div>
        </div>);
    }
}

export default CBT12;