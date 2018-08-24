import React from 'react';

import UserProfile from './UserProfile';
import List from './List';

import data from '../list.json';
import { mergeCss } from '../../../utils/cssUtil';
const styles = mergeCss('components/Cam/Sidebar/sidebar');

const Sidebar = ({query}) => (
  <div className={`{styles['sidebar-container'] hidden-xs`}>
    <div>
      <UserProfile query={query} />
    </div>
    <div>
      <List query={query}  data={data} />
    </div>
  </div>
);

export default Sidebar;
