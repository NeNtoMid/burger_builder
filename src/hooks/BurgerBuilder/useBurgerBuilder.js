import { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import axios from './../../axios-orders';

import {
  addBurgerIngredient,
  removeBurgerIngredient,
  initBurgerIngredients,
} from './../../store/actions/index';

const changePurchaseStatus = async (isAuth, setState, ings, history) => {
  if (isAuth) {
    setState((prevState) => {
      return { ...prevState, purchasing: !prevState.purchasing };
    });
  } else {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      await axios.put('/ingredients.json', { ...ings });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }

    history.push('/auth?login=true');
  }
};

const continueOrder = async (setState, history, ings) => {
  try {
    setState((prevState) => ({ ...prevState, loading: true }));
    await axios.put('/ingredients.json', { ...ings });
    history.push('/checkout');
    setState((prevState) => ({ ...prevState, loading: false }));
  } catch (error) {
    console.log(error);
    setState((prevState) => ({ ...prevState, loading: false }));
  }
};

const useBurgerBuilder = () => {
  const [state, setState] = useState({
    purchasing: false,
    loading: false,
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const ings = useSelector((state) => state.ings.ingredients);
  const totalPrice = useSelector((state) => state.ings.totalPrice);
  const error = useSelector((state) => state.ings.error);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const onAddBurgerIngredient = (ingredientType) =>
    dispatch(addBurgerIngredient(ingredientType));

  const onRemoveBurgerIngredient = (ingredientType) =>
    dispatch(removeBurgerIngredient(ingredientType));

  useEffect(() => {
    const initBurgerIngs = async () => {
      await dispatch(initBurgerIngredients());
    };

    initBurgerIngs();
  }, [dispatch]);

  const onChangePurchaseStatusHandler = () =>
    changePurchaseStatus(isAuth, setState, ings, history);

  const onContinueOrderHandler = () => continueOrder(setState, history, ings);

  return {
    state,
    error,
    totalPrice,
    isAuth,
    ings,
    onAddBurgerIngredient,
    onRemoveBurgerIngredient,
    onChangePurchaseStatusHandler,
    onContinueOrderHandler,
  };
};

export default useBurgerBuilder;
