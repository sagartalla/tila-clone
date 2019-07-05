// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Row, Col } from 'react-bootstrap';
// import { Modal } from 'react-router-modal';
// import SVGComponent from '../common/SVGComponet';
// import { selectors, actionCreators } from '../../store/auth';
// import Button from '../common/CommonButton';

// import lang from '../../utils/language';

// import main_en from '../../layout/main/main_en.styl';
// import main_ar from '../../layout/main/main_ar.styl';
// import styles_en from './login_en.styl';
// import styles_ar from './login_ar.styl';

// const styles = lang === 'en' ? { ...main_en, ...styles_en } : { ...main_ar, ...styles_ar };
// const { LOGIN_PAGE } = languageDefinations();

// class LoginFlow extends Component {
//   render() {
//     const {
//       activeObj, activeEmailId,
//     } = this.props;
//     return (
//       <div className={`${styles['pl-40']} ${styles['pr-40']}`}>
//         <div>
//             Logged in as
//           {activeEmailId}
//         </div>
//         <Button
//           className={`${styles['flex-center']}  ${styles.width100} ${styles['fs-14']} ${styles['text-uppercase']} ${styles['button-radius']}`}
//           onClick={this.sendLink}
//           btnLoading={loadingStatus}
//           btnText="Continue To Checkout"
//         />
//         <div>Logout &amp; Signin as different User</div>
//         </div>
//     );
//   }
// }

// const mapStateToProps = store => ({
//   activeEmailId: selectors.getActiveEmailId(store),
// });

// const mapDispatchToProps = dispatch => bindActionCreators(
//   {

//   },
//   dispatch,
// );


// export default connect(mapStateToProps, mapDispatchToProps)(LoginFlow);
