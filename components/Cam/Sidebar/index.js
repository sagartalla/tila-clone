import React, { Component } from "react";

import UserProfile from "./UserProfile";
import List from "./List";

import data from '../list.json';
import styles from "../cam.styl";

const Sidebar = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <div>
        <UserProfile />
      </div>
      <div>
        <List data={data} />
      </div>
    </div>
  );
};

export default Sidebar;
