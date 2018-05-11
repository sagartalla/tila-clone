const OverlayReducer = (state = {showOverlay: false, overlayShown: []}, action) =>{
  switch(action.type){
    case "OVERLAY": return {...state, showOverlay: action.showOverlay || false, overlayShown: action.overlayShown || []}
    default: return {...state}
  }
}

export { OverlayReducer } 