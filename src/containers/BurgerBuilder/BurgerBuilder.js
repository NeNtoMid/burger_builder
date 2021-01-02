import React, { Fragment } from 'react';

import INGREDIENT_PRICES from './../../assets/prices';

import Burger from './../../components/Burger/Burger';

import BuildControls from './../../components/Burger/BuildControls/BuildControls';

import ingContext from './../../context/ing-context';

import Modal from './../../components/UI/Modal/Modal';

import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

import Spinner from './../../components/UI/Spinner/Spinner';

import axios from './../../axios-orders';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import useBurgerBuilder from './../../hooks/BurgerBuilder/useBurgerBuilder';

const BurgerBuilder = () => {
  const {
    state,
    error,
    ings,
    isAuth,
    totalPrice,
    onAddBurgerIngredient,
    onRemoveBurgerIngredient,
    onChangePurchaseStatusHandler,
    onContinueOrderHandler,
  } = useBurgerBuilder();

  let orderSummary = null;

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ings && !error) {
    burger = (
      <Fragment>
        <Burger ingredients={ings} />

        <ingContext.Provider
          value={{
            increase: onAddBurgerIngredient,
            decrease: onRemoveBurgerIngredient,
          }}
        >
          <BuildControls
            totalPrice={totalPrice}
            ingredients={ings}
            purchased={onChangePurchaseStatusHandler}
            isAuth={isAuth}
          />
        </ingContext.Provider>
      </Fragment>
    );

    orderSummary = (
      <OrderSummary
        show={state.purchasing}
        ingredients={ings}
        prices={INGREDIENT_PRICES}
        totalPrice={totalPrice}
        cancelOrder={onChangePurchaseStatusHandler}
        continueOrder={onContinueOrderHandler}
        loading={state.loading}
      />
    );
  }

  return (
    <Fragment>
      <Modal
        show={state.purchasing}
        modalClosed={onChangePurchaseStatusHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
