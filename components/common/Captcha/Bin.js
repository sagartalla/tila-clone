import { DropTarget } from 'react-dnd';

import lang from '../../../utils/language';

import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const styles = lang === 'en' ? styles_en : styles_ar;

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
