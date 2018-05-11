import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './overlay.styl';
import {hideOverlayScreen} from './OverlayActions';
import Login from './Login';

class Overlay extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div  onClick={() => {this.props.hideOverlayScreen()}} className={style['overlayContainer']} style={{display: this.props.showOverlay ? 'flex' : 'none'}}>
          <div onClick={(e) => e.stopPropagation()} className={style['overlayCard']}>
            <Login hideOverlayScreen={this.props.hideOverlayScreen} />
          </div>
      </div>
    )
  }
}

Overlay.propTypes = {
  showOverlay: PropTypes.bool.isRequired,
  hideOverlayScreen: PropTypes.func.isRequired,
}

export default connect(() => ({}), { hideOverlayScreen })(Overlay)