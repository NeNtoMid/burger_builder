import React, { useState, Fragment } from 'react';

import { withRouter } from 'react-router';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import {
  authUser,
  logoutUser,
  userWithBuilBurger,
} from './../../store/actions/index';

import { useForm } from 'react-hook-form';

import AuthFrom from './../../components/Authentication/AuthForm/AuthForm';

const Auth = (props) => {
  const authValidation = {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        name: 'email',
        placeholder: 'Your email',
      },
      validation: {
        required: { value: true, message: 'Email is mandatory' },
        minLength: { value: 3, message: 'Email is too short' },
        pattern: {
          value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          message: 'Email is not proper',
        },
      },
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        name: 'password',
        placeholder: 'Your password',
      },
      validation: {
        required: { value: true, message: 'Password is mandatory' },
        minLength: { value: 6, message: 'Password is too short' },
        maxLength: { value: 126, message: 'Password is too long' },
        setValueAs: (value) => value.trim(),
      },
    },
  };

  const [loading, setLoading] = useState(false);

  const isOnLoginPage = JSON.parse(
    props.location.search.split('=')[1] || false
  );

  const onNavigateAuthHandler = () => {
    props.history.push(`/auth?login=${!isOnLoginPage}`);
  };

  const onGetLoginDataHandler = async (data) => {
    try {
      setLoading(true);

      await props.onAuthenticateUserHandler(
        data.email,
        data.password,
        isOnLoginPage
      );

      let isBurgerNotBuild = true;

      if (props.ings) {
        isBurgerNotBuild = Object.keys(props.ings).every(
          (ingName) => props.ings[ingName] === 0
        );
      }

      setLoading(false);

      if (!isBurgerNotBuild) {
        props.onChangeRedirectionHandler();
        props.history.replace('/checkout');
      } else {
        props.history.replace('/');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const { register, handleSubmit, errors, watch } = useForm();

  if (!isOnLoginPage) {
    const firstPassword = watch('password', '');

    const verifyPassword = {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        name: 'secondpassword',
        placeholder: 'Re-enter password',
      },
      validation: {
        required: { value: true, message: 'Password must be verified' },
        minLength: { value: 6, message: 'Password is too short' },
        maxLength: { value: 126, message: 'Password is too long' },
        setValueAs: (value) => value.trim(),
        validate: (value) =>
          firstPassword.toString() === value.toString() ||
          'Passwords are not the same',
      },
    };

    authValidation.secondPassword = verifyPassword;
  }

  let form = (
    <Fragment>
      <AuthFrom
        isOnLoginPage={isOnLoginPage}
        error={props.error}
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

  return !props.isAuth ? form : <Redirect to='/' />;
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    ings: state.ings.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticateUserHandler: (email, password, isLogin) =>
      dispatch(authUser(email, password, isLogin)),
    onLogoutUserHandler: () => dispatch(logoutUser()),
    onChangeRedirectionHandler: () => dispatch(userWithBuilBurger()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
