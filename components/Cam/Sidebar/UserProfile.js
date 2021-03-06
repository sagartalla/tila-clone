import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Link } from '../../../routes';
import { selectors, actionCreators } from '../../../store/cam/personalDetails';
import { bindActionCreators } from 'redux';
import lang from '../../../utils/language';
import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './sidebar_en.styl';
import styles_ar from './sidebar_ar.styl';
import ProfilePic from './ProfilePic';
import { languageDefinations } from '../../../utils/lang';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};
const cookies = new Cookies();
const language = cookies.get('language') || 'ar';
const country = cookies.get('country') || 'SAU';
const { CAM, PERSONAL_INFO_MODAL } = languageDefinations();

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgDocumentID: null,
      loader: false,
      mouseOver: false
    }
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.props.uploadProfilePic(formData, this.props.userInfo.contactInfo.user_account_id);
  }

  handleMouseOver = () => {
    this.setState({
      mouseOver: true,
    })
  }

  handleMouseOut = () => {
    this.setState({
      mouseOver: false,
    })
  }

  componentWillReceiveProps(nextProps) {
    const {image_url} = nextProps.userInfo.personalInfo;
    if (nextProps.getPictureDocumentId === this.props.getPictureDocumentId) {
      return;
    }
    if((nextProps.loadingStatus !== this.props.loadingStatus)){
      this.setState({
        loader: nextProps.loadingStatus,
      })
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
            image_url: this.state.imgDocumentID, //storing documentID in image_url.
          })
        })
      };
    }

  render() {
    const { props } = this;
    const { query, userInfo, imgUrl } = props;
    const { tabDetails } = query;
    const { first_name, last_name } = props.userInfo.personalInfo;
    const [tab] = tabDetails ? tabDetails.split('/') : [];
    let full_name = first_name || last_name ? first_name + " " + last_name : "";
    let name = full_name ? (full_name.length < 20 ? full_name : (full_name.slice(0, 20) + "...")) : "";
    return (
      <>
        <label className={`${styles['file-upload']}`} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <input title={`${CAM.CHOOSE_PROFILE_PIC}`} type='file' className={`${styles['display-pic']}`} onChange={this.handleChange} />
        </label>
        <Link route={`/${language}/customer/profile`}>
          <a style={{ display: 'block' }}>
            <div className={`${`/${language}/cam/profile` === `/${language}/cam/${tab}` ? styles['active'] : {}} ${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
                  <ProfilePic loader={this.state.loader} userInfo={userInfo} imgUrl={imgUrl} mouseOver={this.state.mouseOver}/>
              <div className={styles['profile-details']}>
                <span className={`${styles['fs-12']} ${styles['light-gry-clr']}`}>{PERSONAL_INFO_MODAL.HELLO}</span>
                <div className={`${styles['profile-name']} ${styles['fontW600']}`}>{name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
