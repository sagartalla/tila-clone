import React, { Component } from 'react';

import lang from '../../../../utils/language';
import PageData from '../index';

import main_en from '../../../../layout/main/main_en.styl';
import main_ar from '../../../../layout/main/main_ar.styl';
import styles_en from '../pageData_en.styl';
import styles_ar from '../pageData_ar.styl';

const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };

class BT6a extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){

        const {content} = this.props;
        const { config = {}, data } = content;
        const { banners } = content.data[lang];

        return(<div>
            <div className={`${styles['display-t-i-cb']} ${styles.flex}`} >
                

                <div className={`${styles['p-0-5']}`} style={{ width: '33.3%' }}>

                        <div className={`${styles['mb-10']}`}>
                            <a href={banners[0].link} style={{width:'100%'}}>
                            <div className={styles.shadow} className={`${styles['width100']}`}>
                                <img src={banners[0].img} alt="" className={styles['img-responsive']}  className={`${styles['width100']}`} />
                            </div>
                            </a>
                        </div>

                        <div className={`${styles.flex}`}>
                            <a href={banners[1].link} style={{width:'100%'}}>
                            <div className={styles.shadow} className={`${styles['width100']}`}>
                                <img src={banners[1].img} alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                            </div>
                            </a>
                        </div>

                </div>

                <div style={{ width: '33.3%' }} className={`${styles['p-0-5']}`} >

                        <div className={`${styles['mb-10']}`}>
                            <a href={banners[2].link} style={{width:'100%'}}>
                            <div className={styles.shadow} className={`${styles['width100']}`}>
                                <img src={banners[2].img} alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                            </div>
                            </a>
                        </div>

                        <div className={`${styles.flex}`}>
                            <a href={banners[3].link} style={{width:'100%'}}>
                            <div className={styles.shadow} className={`${styles['width100']}`}>
                                <img src={banners[3].img} alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                            </div>
                            </a>
                        </div>

                </div>


                <div style={{ width: '33.3%' }} className={`${styles['p-0-5']}`} >

                        <div className={`${styles['mb-10']}`}>
                            <a href={banners[4].link} style={{width:'100%'}}>
                            <div className={styles.shadow} className={`${styles['width100']}`}>
                                <img src={banners[4].img} alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                            </div>
                            </a>
                        </div>

                        <div className={`${styles.flex}`}>
                            <a href={banners[5].link} style={{width:'100%'}}>
                            <div className={styles.shadow} className={`${styles['width100']}`}>
                                <img src={banners[5].img} alt="" className={styles['img-responsive']} className={`${styles['width100']}`} />
                            </div>
                            </a>
                        </div>

                </div>
       </div>
        </div>);
    }
}

export default BT6a;