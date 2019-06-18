import { DragSource } from 'react-dnd';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

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
            cursor: 'move'}}><img className={styles['captcha-icon']} id={this.props.index} src={this.props.image.url}/></span>
    );
  }
}

export default DragSource(Types.ITEM, boxSource, collect)(Box);
