import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Link } from '../../../routes';
import { selectors, actionCreators } from '../../../store/cam/personalDetails';
import { bindActionCreators } from 'redux';
import lang from '../../../utils/language';
import SVGComponent from '../../common/SVGComponet';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './sidebar_en.styl';
import styles_ar from './sidebar_ar.styl';
import ProfilePic from './ProfilePic';
const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};
const cookies = new Cookies();
const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgDocumentID: null,
      loader: false,
    }
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.props.uploadProfilePic(formData);
  }

  componentWillReceiveProps(nextProps) {
    const {image_url} = nextProps.userInfo.personalInfo;
    if((nextProps.loadingStatus !== this.props.loadingStatus)){
      this.setState({
        loader: nextProps.loadingStatus,
      })
    }
    if (nextProps.getPictureDocumentId === this.props.getPictureDocumentId) {
      return;
    }
    if (nextProps.userInfo.personalInfo && Object.keys(nextProps.userInfo.personalInfo).length > 0 && this.state.imgDocumentID === null) {
      this.setState({
        imgDocumentID: image_url
      })
    }
    if (nextProps.getPictureDocumentId && this.state.imgDocumentID !== nextProps.getPictureDocumentId) {
      this.setState({
        imgDocumentID: nextProps.getPictureDocumentId
      }, () => {
          this.props.EditPersonalInfo({
            image_url: this.state.imgDocumentID, //As imgUrl is too long to store in image_url, storing documentID in image_url.
          })
        })
      };
    }

  render() {
    const { props } = this;
    const { query, userInfo } = props;
    const { tabDetails } = query;
    const { first_name, last_name } = props.userInfo.personalInfo;
    const [tab] = tabDetails ? tabDetails.split('/') : [];
    // let imagePreview = null;
    // if(this.state.loader || (userInfo.personalInfo.image_url && props.imgUrl===null)){
    //   imagePreview=
    //           <div className={styles['loader-div']}>
    //             <SVGComponent
    //               clsName={styles['loader-styl']}
    //               src="icons/common-icon/circleLoader"
    //             >
    //             </SVGComponent>
    //           </div>
    // }
    // else if (props.imgUrl) {
    //   imagePreview = (<img className={styles['prev-img']} src={props.imgUrl} />);
    // } else {
    //   imagePreview = (<div className={styles['edit-icon']}><SVGComponent clsName={`${styles['profile-edit-icon']}`} src="icons/profile-camera" /></div>)
    // }
    let full_name = first_name || last_name ? first_name + " " + last_name : "";
    let name = full_name ? (full_name.length < 20 ? full_name : (full_name.slice(0, 20) + "...")) : "";
    return (
      <>
        <label className={`${styles['file-upload']}`}>
          <input type='file' className={`${styles['display-pic']}`} onChange={this.handleChange} />
        </label>
        <Link route={`/${country}/${language}/cam/profile`}>
          <a style={{ display: 'block' }}>
            <div className={`${`/${country}/${language}/cam/profile` === `/${country}/${language}/cam/${tab}` ? styles['active'] : {}} ${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
              <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
                <div className={styles['img-style']} >
                  <ProfilePic loader={this.state.loader} userInfo={userInfo} imgUrl={props.imgUrl}/>
                </div>
              </div>
              <div className={styles['profile-details']}>
                <span className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>Hello,</span>
                <div>{name}</div>
              </div>
            </div>
          </a>
        </Link>
      </>
    )
  };
}
const mapStateToProps = (store) => ({
  userInfo: selectors.getUserInfo(store),
  getPictureDocumentId: selectors.getPictureDocumentId(store),
  loadingStatus: selectors.getLoadingStatus(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      uploadProfilePic: actionCreators.uploadProfilePic,
      EditPersonalInfo: actionCreators.EditPersonalInfo
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);;
