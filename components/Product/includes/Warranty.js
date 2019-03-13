import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { languageDefinations } from '../../../utils/lang';
import SVGCompoent from '../../common/SVGComponet';
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/Product/product');
const { PDP_PAGE } = languageDefinations();


const Warranty = (props) => {
    const popover = (
        <Popover id="popover-positioned-right">
          <div>
            <h4>Summary</h4>
            {props.warranty.summary}
            <p>
              <strong>Covers : </strong>
              {props.warranty.covered}<br/>
              <strong>Not Covers : </strong>
              {props.warranty.not_covered}
            </p>
          </div><br/>
        </Popover>
    );
    return (<div className={`${styles['flex-center']} ${styles['warenty-part-inn']}`}>
                <SVGCompoent clsName={`${styles['trust-icon']}`} src="icons/common-icon/trust-secure" /> &nbsp;
                <span className={styles['link-text']}>{props.warranty.duration + " " + props.warranty.duration_unit + " " + PDP_PAGE.WARRANTY}</span>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <span className={styles['ml-10']}>
                    <SVGCompoent clsName={`${styles['down-arrow']}`} src="icons/down-arrow/down-arrow" />
                    </span>
                </OverlayTrigger>
            </div>);
}

export default Warranty