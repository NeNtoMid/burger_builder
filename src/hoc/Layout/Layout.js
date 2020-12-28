import React, { Fragment, useState } from 'react';

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const [state, setState] = useState({ showSideDrawer: false });

  const sideDrawerOpenedHandler = () => {
    setState({ showSideDrawer: true });
  };

  const sideDrawerClosedHandler = () => {
    setState({ showSideDrawer: false });
  };

  return (
    <Fragment>
      <Toolbar opened={sideDrawerOpenedHandler} />
      <SideDrawer
        closed={sideDrawerClosedHandler}
        show={state.showSideDrawer}
      />
      <div>,Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
