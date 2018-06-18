import React from 'react';

import UserProfile from './UserProfile';
import List from './List';

import data from '../list.json';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Sidebar/sidebar');

const Sidebar = () => (
  <div className={styles['sidebar-container']}>
    <div>
      <UserProfile />
    </div>
    <div>
      <List data={data} />
    </div>
  </div>
);

export default Sidebar;
