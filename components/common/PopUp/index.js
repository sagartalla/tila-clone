import React from 'react';
import styles from './popup.styl';

const PopUp = ({
  isOpen, width, height, closePopUp, children,
}) => (
  isOpen &&
  <div className={styles["popup"]} onClick={closePopUp}>
    <div
      className={styles["inner"]}
      style={{ width, height }}
    >
      {children}
    </div>
  </div>
);

export default PopUp;
