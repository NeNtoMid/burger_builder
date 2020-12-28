import React, { Fragment, Suspense, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import { checkUserToken } from './store/actions/index';

import './App.module.css';

import Layout from './hoc/Layout/Layout';

import Spinner from './components/UI/Spinner/Spinner';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import { connect } from 'react-redux';

import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const Orders = React.lazy(() => import('./containers/Orders/Orders'));

const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

const App = (props) => {
  useEffect(() => {
    props.onCheckTokenValidity();
  }, [props.onCheckTokenValidity, props]);

  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route
            exact
            path='/auth'
            render={(props) => (
              <Suspense fallback={<Spinner />}>
                <Auth {...props} />
              </Suspense>
            )}
          />

          <PrivateRoute exact path='/orders'>
            <Orders />
          </PrivateRoute>
          <PrivateRoute exact path='/logout'>
            <Logout />
          </PrivateRoute>
          <PrivateRoute path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <Route exact path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckTokenValidity: () => dispatch(checkUserToken()),
  };
};
export default connect(null, mapDispatchToProps)(App);
