import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { languageDefinations } from '../../../utils/lang/';
import { Link } from '../../../routes';
import { mergeCss } from '../../../utils/cssUtil';
import { selectors, actionCreators } from '../../../store/cam/personalDetails';
import { bindActionCreators } from 'redux';
const styles = mergeCss('components/Cam/Sidebar/sidebar');

const cookies = new Cookies();
const { PERSONAL_INFO_MODAL } = languageDefinations();
const language = cookies.get('language') || 'en';
const country = cookies.get('country') || 'SAU';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      documentId: '',
    }
  }

  handleChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.props.uploadProfilePic(formData).then(() => {
      this.setState({documentId : this.props.getPictureDocumentId})
    }).then(() => {
      this.props.getProfilePic(this.state.documentId);
    });
  }

  render() {
    const { props } = this;
    const { query } = props;
    const { tabDetails } = query;
    const { first_name, last_name } = props.userInfo.personalInfo;
    const [tab, ...queryParams] = tabDetails ? tabDetails.split('/') : [];
    let imagePreview = null;
    if (this.props.getProfilePicture) {
      imagePreview = (<img className={styles['prev-img']} src={this.props.getProfilePicture} />);
    } else {
      imagePreview = (<div className={styles['edit-icon']}>Click to upload image</div>)
    }
    let full_name = first_name || last_name ? first_name + " " + last_name : "";
    let name = full_name ? (full_name.length < 20 ? full_name : (full_name.slice(0, 20) + "...")) : "";
    return (
      <>
      <label className={`${styles['file-upload']}`}>
        <input type='file' id='profile-pic' onChange={this.handleChange} />
      </label>
      <Link route={`/${country}/${language}/cam/profile`}>
        <a style={{ display: 'block' }}>
          <div className={`${`/${country}/${language}/cam/profile` === `/${country}/${language}/cam/${tab}` ? styles['active'] : {}} ${styles['user-profile']} ${styles['p-10-20']}  ${styles['align-center']} ${styles['flex']}`}>
            <div className={`${styles['profile-pic']} ${styles['pr-15']}`}>
              <div className={styles['img-style']} >{imagePreview}</div>
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
  getProfilePicture: selectors.getProfilePicture(store),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      uploadProfilePic: actionCreators.uploadProfilePic,
      getProfilePic: actionCreators.getProfilePic,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);;
