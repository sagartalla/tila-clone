import { DragSource } from 'react-dnd';

import lang from '../../../utils/language';

import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;


const Types = {
    ITEM: 'type'
}

const boxSource = {
  beginDrag(props) {
    return {
        index: props.index
    }
  },
  endDrag(props, monitor){
    if(!monitor.didDrop()){
      return;
    }
    return props.handleDrop(props.index);
  }
};

function collect(connect, monitor) {
    return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
    }
}
export class Box extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props
    return connectDragSource(
          <span className={styles['flex']} style={{
            opacity: isDragging ? 0 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            width: '47px', height: '43px',
            cursor: 'move'}}><img id={this.props.index} src={this.props.image.url}/></span>
    );
  }
}

export default DragSource(Types.ITEM, boxSource, collect)(Box);
