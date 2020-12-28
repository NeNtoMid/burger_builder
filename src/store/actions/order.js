import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  FETCHED_ORDERS_SUCCESS,
  FETCHED_ORDERS_FAIL,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ALL_ORDERS,
} from './actionsType';

import axios from './../../axios-orders';

export const purchaseBurger = (orderData, resetIngredients, authToken) => {
  return async (dispatch) => {
    try {
      const uploadedOrder = await axios.post(
        `/orders.json?auth=${authToken}`,
        orderData
      );

      await axios.put('/ingredients.json', resetIngredients);

      dispatch({
        type: PURCHASE_BURGER_SUCCESS,
        payload: { order: { ...orderData, _id: uploadedOrder.data.name } },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: PURCHASE_BURGER_FAIL });
    }
  };
};

export const initOrders = (authToken) => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem('userId');
      const queryParams = [`orderBy="customer/userId"`, `equalTo="${userId}"`];
      const fetchedOrders = await axios.get(
        `/orders.json?auth=${authToken}&${queryParams.join('&')}`
      );

      const orders = {};
      for (const ord in fetchedOrders.data) {
        orders[ord] = { ...fetchedOrders.data[ord], _id: ord };
      }

      dispatch({
        type: FETCHED_ORDERS_SUCCESS,
        payload: { orders },
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCHED_ORDERS_FAIL });
    }
  };
};

export const deleteOrder = (_id, authToken) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/orders/${_id}.json?auth=${authToken}`);

      dispatch({ type: DELETE_ORDER_SUCCESS, payload: { _id } });
    } catch (error) {
      dispatch({ type: DELETE_ORDER_FAIL });
    }
  };
};

export const deleteAllOrders = () => {
  return { type: DELETE_ALL_ORDERS };
};
