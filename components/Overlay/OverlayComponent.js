import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {overlayContainer, overlayCard} from './overlayStyles';
import {hideOverlayScreen} from './OverlayActions';
import Login from './Login';

class Overlay extends React.Component{

  static propTypes = {
    showOverlay: PropTypes.bool.isRequired,
    hideOverlayScreen: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div  onClick={() => {this.props.hideOverlayScreen()}} style={{...overlayContainer, display: this.props.showOverlay ? 'flex' : 'none'}}>
          <div onClick={(e) => e.stopPropagation()}style={overlayCard}>
            <Login hideOverlayScreen={this.props.hideOverlayScreen} />
          </div>
      </div>
    )
  }
}

export default connect(() => ({}), {hideOverlayScreen})(Overlay)