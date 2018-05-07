import React, { Component } from "react";

import styles from "./cam.styl";

const List = props => {
  return props.data.map((val, id) => (
    <div className={styles["list-container"]} key={id.toString()}>
      {val.data.map((itemVal ,itemIndex) => (
        <div className={styles["list-items-container"]} key={itemIndex.toString()}>
          <div className={styles["list-common"]}>{itemVal.icon}</div>
          <div className={styles["list-items"]}>{itemVal.display}</div>
          <div className={styles["list-common"]}>{itemVal.count}</div>
        </div>
      ))}
    </div>
  ));
};

export default List; 
