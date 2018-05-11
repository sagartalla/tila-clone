import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayComponent from './OverlayComponent';
import { hideOverlayScreen, showOverlayScreen } from './OverlayActions';

const mapStateToProps = ({ OverlayReducer }) => ({
  showOverlay: OverlayReducer.showOverlay,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ hideOverlayScreen, showOverlayScreen }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OverlayComponent);