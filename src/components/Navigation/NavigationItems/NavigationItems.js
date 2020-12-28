import React, { Fragment } from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

import { connect } from 'react-redux';

const navigationItems = (props) => {
  let authNavigationItems = (
    <NavigationItem destination='/auth?login=true'>Login</NavigationItem>
  );

  if (props.isAuth) {
    console.log('props.isAuth:', props.isAuth);

    authNavigationItems = (
      <Fragment>
        <NavigationItem destination='/orders'>Orders</NavigationItem>
        <NavigationItem destination='/logout'>Logout</NavigationItem>
      </Fragment>
    );
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem destination='/'>Burger Builder</NavigationItem>

      {authNavigationItems}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(navigationItems);
