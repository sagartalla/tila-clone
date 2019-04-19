import React from 'react';

import UserProfile from './UserProfile';
import List from './List';

import data from '../list.json';
import lang from '../../../utils/language';

import styles_en from './sidebar_en.styl';
import styles_ar from './sidebar_ar.styl';


const styles = lang === 'en' ? styles_en : styles_ar;

const Sidebar = ({query}) => (
  <div className={`${styles['sidebar-container']} hidden-xs`}>
    <div>
      <UserProfile query={query} />
    </div>
    <div>
      <List query={query}  data={data} />
    </div>
  </div>
);

export default Sidebar;
