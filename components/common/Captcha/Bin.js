import { DropTarget } from 'react-dnd';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/Payments/payment');
const Types = {
  ITEM: 'type',
};

function collect(connect) {
    return {
      connectDropTarget: connect.dropTarget(),
    };
}

export class Bin extends React.Component {
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={{textAlign: "center"}}>
        <div className={`${styles['flex']} ${styles['justify-center']}`} >
          {this.props.openBox}
        </div><br/>
        {this.props.boxText}
      </div>
    );
  }
}
export default DropTarget(Types.ITEM, {}, collect)(Bin);
