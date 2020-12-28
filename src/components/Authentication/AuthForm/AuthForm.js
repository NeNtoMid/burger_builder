import React, { Fragment } from 'react';

import Button from './../../UI/Button/Button';

import Input from './../../UI/Input/Input';

import classes from './AuthForm.module.css';

import Spinner from './../../UI/Spinner/Spinner';

const AuthForm = ({
  authValidation,
  getLoginData,
  navigate,
  isOnLoginPage,
  error,
  loading,
  register,
  handleSubmit,
  errors,
}) => {
  let errorMessage = null;

  if (error) {
    errorMessage = <p className={classes.errorMessage}>{error}</p>;
  }

  return (
    <Fragment>
      <form className={classes.AuthForm} onSubmit={handleSubmit(getLoginData)}>
        {errorMessage}
        {Object.keys(authValidation).map((authInput) => {
          return (
            <Input
              key={authValidation[authInput].elementConfig.name}
              register={register}
              validation={authValidation[authInput].validation}
              error={errors[authValidation[authInput].elementConfig.name]}
              elementType={authValidation[authInput].elementType}
              elementConfig={authValidation[authInput].elementConfig}
            />
          );
        })}

        {loading ? (
          <Spinner />
        ) : (
          <Button btnClasses={['Success']}>
            {isOnLoginPage ? 'LOGIN' : 'REGISTER'}
          </Button>
        )}
      </form>
      <p className={classes.AuthForm__register}>
        {isOnLoginPage ? `Don't have account?` : 'Have account?'}
      </p>
      <Button click={navigate} btnClasses={['Danger-register']}>
        {isOnLoginPage ? 'REGISTER' : 'LOGIN'}
      </Button>
    </Fragment>
  );
};

export default AuthForm;
