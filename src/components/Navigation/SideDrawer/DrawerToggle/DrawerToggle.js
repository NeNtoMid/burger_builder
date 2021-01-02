import React, { memo } from 'react';

import classes from './DrawerToggle.module.css';

const drawerToogle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.click}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default memo(drawerToogle);
