import React, { Fragment } from 'react';

import { withRouter } from 'react-router';

import { Redirect } from 'react-router-dom';

import useAuth from './../../hooks/Auth/useAuth';

import AuthFrom from './../../components/Authentication/AuthForm/AuthForm';

const Auth = (props) => {
  const {
    loading,
    location,
    error,
    isAuth,
    authValidation,
    register,
    handleSubmit,
    errors,
    onNavigateAuthHandler,
    onGetLoginDataHandler,
  } = useAuth();

  let form = (
    <Fragment>
      <AuthFrom
        isOnLoginPage={location}
        error={error}
        getLoginData={onGetLoginDataHandler}
        authValidation={authValidation}
        navigate={onNavigateAuthHandler}
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </Fragment>
  );

  return !isAuth ? form : <Redirect to='/' />;
};

export default withRouter(Auth);
