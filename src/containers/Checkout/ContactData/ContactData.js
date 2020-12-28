import React, { useState } from 'react';

import axios from './../../../axios-orders';

import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';

import Button from './../../../components/UI/Button/Button';

import Spinner from './../../../components/UI/Spinner/Spinner';

import Input from './../../../components/UI/Input/Input';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { purchaseBurger } from './../../../store/actions/index';

import { useForm } from 'react-hook-form';

import './ContactData.css';

const ContactData = (props) => {
  const formValidation = {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'name',
        placeholder: 'Your name',
      },
      validation: {
        required: { value: true, message: 'Name is mandatory' },
        minLength: { value: 5, message: 'Name is too short' },
        setValueAs: (value) => value.charAt(0).toUpperCase() + value.slice(1),
      },
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'street',
        placeholder: 'Your street',
      },
      validation: {
        required: { value: true, message: 'Street is mandatory' },
        minLength: { value: 5, message: 'Street is too short' },
      },
    },
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
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'zipCode',
        placeholder: 'Your zipcode',
      },
      validation: {
        required: { value: true, message: 'Zip code is mandatory' },
        minLength: { value: 5, message: 'Zip code is too short' },
        maxLength: { value: 5, message: 'Zip code is too long' },
      },
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'country',
        placeholder: 'Your country',
      },
      validation: {
        required: { value: true, message: 'Country name is mandatory' },
        minLength: { value: 3, message: 'Country name is too short' },
        maxLength: { value: 20, message: 'Country name is too long' },
        setValueAs: (value) => value.charAt(0).toUpperCase() + value.slice(1),
      },
    },

    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'fastest',
            displayValue: 'Fastest',
          },
          {
            value: 'cheapest',
            displayValue: 'Cheapest',
          },
        ],

        name: 'deliveryMethod',
      },
      value: 'fastest',
      validation: null,
    },
  };

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const sendOrderDataHandler = async (formData) => {
    setLoading(true);

    const data = {
      ingredients: props.ingredients,
      price: props.price,
      customer: { ...formData, userId: props.userId },
    };

    const resetIngredients = {};

    Object.keys(props.ingredients).forEach(
      (ingName) => (resetIngredients[ingName] = 0)
    );

    await props.onPurchaseBurgerHandler(
      data,
      resetIngredients,
      props.authToken
    );

    setLoading(false);

    if (props.isLoggedInWithBuiltBurger) {
      props.history.replace('/orders');
    } else {
      props.history.replace('/');
    }
  };

  let submitForm = <Spinner />;

  if (!loading) {
    submitForm = (
      <form onSubmit={handleSubmit(sendOrderDataHandler)}>
        {Object.keys(formValidation).map((input) => {
          return (
            <Input
              key={formValidation[input].elementConfig.name}
              register={register}
              validation={formValidation[input].validation}
              error={errors[formValidation[input].elementConfig.name]}
              elementType={formValidation[input].elementType}
              elementConfig={formValidation[input].elementConfig}
            />
          );
        })}

        <Button
          btnClasses={
            !Object.keys(errors).length > 0 ? ['Success'] : ['Disabled']
          }
          disabled={Object.keys(errors).length > 0 ? true : false}
        >
          ORDER
        </Button>
      </form>
    );
  }
  return (
    <div className='ContactData'>
      <h4>Enter your Contact Data</h4>
      {submitForm}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ings.ingredients,
    price: state.ings.totalPrice,
    authToken: state.auth.isAuth,
    userId: state.auth.userId,
    isLoggedInWithBuiltBurger: state.auth.isLoggedInWithBuiltBurger,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurgerHandler: (formData, resetIngs, authToken) =>
      dispatch(purchaseBurger(formData, resetIngs, authToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(ContactData, axios)));
