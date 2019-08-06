import { DropTarget } from 'react-dnd';

import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './captcha_en.styl';
import styles_ar from './captcha_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

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
      <div style={{textAlign: "center", marginTop: "-40px"}}>
        <div className={`${styles['flex']} ${styles['justify-center']}`} >
          {this.props.openBox}
        </div><br/>
        {this.props.boxText}
        <div>{this.props.tcText}</div>
      </div>
    );
  }
}
export default DropTarget(Types.ITEM, {}, collect)(Bin);
