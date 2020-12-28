import React, { Suspense } from 'react';

import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

import Spinner from './../../components/UI/Spinner/Spinner';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.isAuth ? (
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        ) : (
          <Redirect
            exact
            to={{
              pathname: '/auth',
              search: '?login=true',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
