import React, { Fragment, useState, useCallback } from 'react';

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const [state, setState] = useState({ showSideDrawer: false });

  const sideDrawerOpenedHandler = useCallback(() => {
    setState({ showSideDrawer: true });
  }, []);

  const sideDrawerClosedHandler = useCallback(() => {
    setState({ showSideDrawer: false });
  }, []);

  return (
    <Fragment>
      <Toolbar opened={sideDrawerOpenedHandler} />
      <SideDrawer
        closed={sideDrawerClosedHandler}
        show={state.showSideDrawer}
      />

      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
