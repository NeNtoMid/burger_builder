import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  FETCHED_ORDERS_SUCCESS,
  FETCHED_ORDERS_FAIL,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ALL_ORDERS,
} from '../actions/actionsType';

import produce from 'immer';

const initalState = {
  orders: null,
  error: false,
};

const purchaseBurgerSuccess = (draft, action) => {
  draft.error = false;
  draft.orders[action.payload.order._id] = action.payload.order;
};

const operationFail = (draft) => {
  draft.error = true;
};

const fetchOrdersSuccess = (draft, action) => {
  draft.orders = { ...draft.orders, ...action.payload.orders };
};

const deleteOrderSuccess = (draft, action) => {
  delete draft.orders[action.payload._id];
};

const deleteAllOrders = (draft) => {
  draft.orders = null;
};
const ordersReducer = (state = initalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case PURCHASE_BURGER_SUCCESS:
        return purchaseBurgerSuccess(draft, action);
      case PURCHASE_BURGER_FAIL:
      case FETCHED_ORDERS_FAIL:
      case DELETE_ORDER_FAIL:
        return operationFail(draft);
      case FETCHED_ORDERS_SUCCESS:
        return fetchOrdersSuccess(draft, action);

      case DELETE_ORDER_SUCCESS:
        return deleteOrderSuccess(draft, action);

      case DELETE_ALL_ORDERS:
        return deleteAllOrders(draft);
      default:
        break;
    }
  });
};

export default ordersReducer;
