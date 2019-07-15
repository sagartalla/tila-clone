import React from 'react';

import UserProfile from './UserProfile';
import List from './List';

import data from '../list.json';
import lang from '../../../utils/language';

import main_en from '../../../layout/main/main_en.styl';
import main_ar from '../../../layout/main/main_ar.styl';
import styles_en from './sidebar_en.styl';
import styles_ar from './sidebar_ar.styl';

const styles = lang === 'en' ? {...main_en, ...styles_en} : {...main_ar, ...styles_ar};

const Sidebar = ({query, imgUrl}) => (
  <div className={`${styles['sidebar-container']} hidden-xs`}>
    <div>
      <UserProfile query={query} imgUrl={imgUrl}/>
    </div>
    <div>
      <List query={query} data={data} />
    </div>
  </div>
);

export default Sidebar;
