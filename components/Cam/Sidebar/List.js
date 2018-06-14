import React from 'react';
import SVGComponent from '../../common/SVGComponet';

import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Sidebar/sidebar');

const List = props => props.data.map((val, id) => (
  <div className={styles['list-container']} key={id.toString()}>
    {val.data.map((itemVal, itemIndex) => {
      return (
        <a href={itemVal.href} key={itemVal.display}>
          {/* TODO can be next client side routes */ }
          <div className={`${styles['list-items-container']} ${styles['p-10-20']} ${styles['light-gry-clr']} ${styles['flex']}`} key={itemIndex.toString()}>
            <div className={`${styles['list-item-left']} ${styles['pr-10']}`}>
              <SVGComponent src={itemVal.icon} />
            </div>
            <div className={`${styles['list-items']} ${styles['fs-14']}`}>{itemVal.display}</div>
            {
              itemVal.count
              ?
              <div className={`${styles['list-common']} ${styles['flex']} ${styles['justify-center']} ${styles['align-center']}`}>
                <div className={`${styles['count-container']} ${styles['fs-12']}`}>{itemVal.count}</div>
              </div>
              :
              null
            }

          </div>
        </a>
        );
      })}
  </div>
));

export default List;
