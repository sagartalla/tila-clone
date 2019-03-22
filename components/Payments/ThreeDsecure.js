import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selectors } from '../../store/payments';

const Redirect = (props) => {
  if(props.redirect3dSecureUrl) {
    window.location = redirect3dSecureUrl;
  }
  props.get3dSecureRedirectionUrl({encryptedString: props.encryptedString});
  return 'loading...'
};

const mapStateToprops = (store) => ({
  redirect3dSecureUrl: authSelectors.getRedirect(store),
});

const mapDispatchToProps = (dispatch) =>({
  return bindActionCreators(
    {
      get3dSecureRedirectionUrl: actionCreators.get3dSecureRedirectionUrl,
    },
    dispatch,
  );
});

export default connect(mapStateToprops, mapDispatchToProps)(Redirect);
