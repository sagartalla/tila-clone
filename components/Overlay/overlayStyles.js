
const overlayContainer = {
  display: 'flex',
  position: 'absolute',
  height: '100%',
  width: '100%',
  zIndex: '10',
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center'
} 

const overlayCard = {
  display: 'flex',
  minHeight: '300px',
  width: '450px',
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  boxShadow: '1px 1px 15px 1px #444',  
  position: 'relative'
}

export {overlayCard, overlayContainer}
