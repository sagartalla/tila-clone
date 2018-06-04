import React from 'react';
import SVGComponent from '../../common/SVGComponet';

import styles from './sidebar.styl';

const List = props => props.data.map((val, id) => (
  <div className={styles['list-container']} key={id.toString()}>
    {val.data.map((itemVal, itemIndex) => {
      return (
        <a href={itemVal.href} key={itemVal.display}> 
          {/* TODO can be next client side routes */ }
          <div className={styles['list-items-container']} key={itemIndex.toString()}>
            <div className={`${styles['list-item-left']} ${styles['ml-20']} ${styles['mr-20']}`}>
              <SVGComponent src={itemVal.icon} />
            </div>
            <div className={`${styles['list-items']} ${styles['fs-12']}`}>{itemVal.display}</div>
            <div className={styles['list-common']}>
            {
              itemVal.count 
              ? 
              <div className={`${styles['count-container']} ${styles['fs-12']}`}>{itemVal.count}</div>
              :
              null
            }
            </div>
          </div>
        </a>
        );
      })}
  </div>
));

export default List;