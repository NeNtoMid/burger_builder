import { useState, useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { purchaseBurger } from './../../store/actions/index';

const handleSendOrderData = async (
  formData,
  setLoading,
  ingredients,
  price,
  userId,
  dispatch,
  authToken,
  isLoggedInWithBuiltBurger,
  history
) => {
  setLoading(true);

  const data = {
    ingredients,
    price,
    customer: { ...formData, userId },
  };

  const resetIngredients = {};

  Object.keys(ingredients).forEach(
    (ingName) => (resetIngredients[ingName] = 0)
  );

  await dispatch(purchaseBurger(data, resetIngredients, authToken));

  setLoading(false);

  if (isLoggedInWithBuiltBurger) {
    history.replace('/orders');
  } else {
    history.replace('/');
  }
};

const useContactData = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const ingredients = useSelector((state) => state.ings.ingredients);

  const price = useSelector((state) => state.ings.totalPrice);

  const authToken = useSelector((state) => state.auth.isAuth);

  const userId = useSelector((state) => state.auth.userId);

  const isLoggedInWithBuiltBurger = useSelector(
    (state) => state.auth.isLoggedInWithBuiltBurger
  );

  const onSubmit = handleSubmit((formData) =>
    handleSendOrderData(
      formData,
      setLoading,
      ingredients,
      price,
      userId,
      dispatch,
      authToken,
      isLoggedInWithBuiltBurger,
      history
    )
  );

  return { loading, register, errors, onSubmit };
};

export default useContactData;
