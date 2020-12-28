import React, { Fragment } from 'react';

import classes from './SideDrawer.module.css';

import Logo from './../../Logo/Logo';

import NavigationItems from './../NavigationItems/NavigationItems';

import { connect } from 'react-redux';

import Backdrop from './../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  return (
    <Fragment>
      <Backdrop clicked={props.closed} show={props.show} />
      <div
        className={[
          classes.SideDrawer,
          props.show ? classes.Open : classes.Close,
        ].join(' ')}
      >
        <Logo styles={{ height: '11%', marginBottom: '3.2rem' }} />

        <nav onClick={props.closed}>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(sideDrawer);
