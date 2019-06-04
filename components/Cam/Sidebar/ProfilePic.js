import React from 'react';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import lang from '../../../utils/language';
import styles_en from './sidebar_en.styl';
import styles_ar from './sidebar_ar.styl';
import SVGComponent from '../../common/SVGComponet';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const ProfilePic = (props) => {
    let imagePreview = null
    if(props.loader || (props.userInfo.personalInfo.image_url && props.imgUrl===null)){
        imagePreview=
                <div className={styles['loader-div']}>
                  <SVGComponent
                    clsName={styles['loader-styl']}
                    src="icons/common-icon/circleLoader"
                  >
                  </SVGComponent>
                </div>
      }
      else if (props.imgUrl) {
        imagePreview = (<img className={styles['prev-img']} src={props.imgUrl} />);
      } else {
        imagePreview = (<div className={styles['edit-icon']}><SVGComponent clsName={`${styles['profile-edit-icon']}`} src="icons/profile-camera" /></div>)
      }
    return (
        <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
            <div className={styles['img-style']} >
                {imagePreview}
            </div>
        </div>
    );
}

export default ProfilePic;