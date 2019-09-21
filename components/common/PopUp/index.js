import React from 'react';
import styles from './popup.styl';

const PopUp = ({
  isOpen, width, height, closePopUp, children,
}) => (
  isOpen &&
  <div className={styles["popup"]}>
    <div
      className={styles["inner"]}
      style={{ width, height }}
    >
      <div style={{ display: 'flex', margin: '15px' }}>
        <span
          role="button"
          onClick={closePopUp}
          tabIndex="0"
          className={styles["cross"]}
        >
          &times;
        </span>
      </div>
      {children}
    </div>
  </div>
);

export default PopUp;
