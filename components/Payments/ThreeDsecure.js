import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../store/payments';

const Redirect = (props) => {
  if(props.redirect3dSecureUrl) {
    window.location = props.redirect3dSecureUrl;
  }
  props.getRedirect({encryptedString: props.encryptedString});
  return 'loading...'
};

const mapStateToprops = (store) => ({
  redirect3dSecureUrl: selectors.get3dSecureRedirectionUrl(store),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRedirect: actionCreators.getRedirect,
    },
    dispatch,
  );
};

export default connect(mapStateToprops, mapDispatchToProps)(Redirect);
