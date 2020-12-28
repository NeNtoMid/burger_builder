import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { logoutUser, deleteAllOrders } from './../../../store/actions/index';

const Logout = (props) => {
  useEffect(() => {
    props.onLogoutUser();

    return () => {
      props.onDeleteAllOrders();
    };
  }, []);
  return <Redirect to='/' />;
};

const mapDisptachToProps = (dispatch) => {
  return {
    onLogoutUser: () => dispatch(logoutUser()),
    onDeleteAllOrders: () => dispatch(deleteAllOrders()),
  };
};

export default connect(null, mapDisptachToProps)(Logout);
