import { DragSource } from 'react-dnd';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/Payments/payment');
const Types = {
    ITEM: 'type'
}

const boxSource = {
  beginDrag(props) {
    return {
        index: props.index
    }
  },
  endDrag(props){
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
