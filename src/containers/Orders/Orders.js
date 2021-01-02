import React, { memo } from 'react';

import classes from './Orders.module.css';

import axios from '../../axios-orders';

import Order from './../../components/Order/Order';

import Spinner from './../../components/UI/Spinner/Spinner';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import useOrders from './../../hooks/Orders/useOrders';

const Orders = () => {
  const {
    state,
    orders,
    onDeleteOrderHandler,
    onGetDetailsHandler,
  } = useOrders();

  let ordersResult = <Spinner />;

  if (Object.keys(orders).length === 0) {
    ordersResult = <h1 className={classes.noOrders}>No orders</h1>;
  } else if (!state.loading && Object.keys(orders).length > 0) {
    ordersResult = Object.keys(orders).map((orderId) => {
      return (
        <Order
          {...orders[orderId]}
          deleteOrder={() => onDeleteOrderHandler(orderId)}
          getDetails={() => onGetDetailsHandler(orderId)}
          deleteLoading={
            state.deletedOrderId.toString() === orderId.toString()
              ? true
              : false
          }
          isShowed={
            state.showedFullOrderId.toString() === orderId.toString()
              ? true
              : false
          }
          key={orderId}
        />
      );
    });
  }
  return <div>{ordersResult}</div>;
};

export default memo(withErrorHandler(Orders, axios));
