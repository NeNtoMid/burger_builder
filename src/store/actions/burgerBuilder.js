import {
  FETCHED_INGREDIENTS_SUCCESS,
  FETCHED_INGREDIENTS_FAIL,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from './actionsType';

import INGREDIENT_PRICES from './../../assets/prices';

import axios from './../../axios-orders';

export const initBurgerIngredients = () => {
  return async (dispatch) => {
    try {
      const fetchedIngredients = await axios.get(
        'https://react-my-burger-7c1cc.firebaseio.com/ingredients.json'
      );

      const totalPrice = Object.keys(fetchedIngredients.data).reduce(
        (acc, cur) => {
          return fetchedIngredients.data[cur] * INGREDIENT_PRICES[cur] + acc;
        },
        4
      );

      console.log('fetchedIngredients.data:', fetchedIngredients.data);
      dispatch({
        type: FETCHED_INGREDIENTS_SUCCESS,
        payload: {
          ingredients: fetchedIngredients.data,
          totalPrice,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCHED_INGREDIENTS_FAIL,
      });
    }
  };
};

export const addBurgerIngredient = (ingredientType) => {
  return { type: ADD_INGREDIENT, payload: { ingredientType } };
};

export const removeBurgerIngredient = (ingredientType) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: {
      ingredientType,
    },
  };
};
