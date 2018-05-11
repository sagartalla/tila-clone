const hideOverlayScreen = () => ({
  type: 'OVERLAY',
  showOverlay: false,
  overlayShown: ''
})

const showOverlayScreen = (overlayContent) => ({
  type: 'OVERLAY',
  showOverlay: true,
  overlayShown: overlayContent
})

export { hideOverlayScreen, showOverlayScreen }