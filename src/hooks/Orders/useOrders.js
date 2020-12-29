import { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { initOrders, deleteOrder } from './../../store/actions/index';

const initializeOrders = async (dispatch, authToken, setState) => {
  await dispatch(initOrders(authToken));

  setState((prevState) => ({ ...prevState, loading: false }));
};

const handleDeleteOrder = async (_id, setState, dispatch, authToken) => {
  setState((prevState) => ({ ...prevState, deletedOrderId: _id }));

  await dispatch(deleteOrder(_id, authToken));

  setState((prevState) => ({ ...prevState, deletedOrderId: '' }));
};

const handleGetDetails = (_id, setState) => {
  setState((prevState) => ({ ...prevState, showedFullOrderId: _id }));
};

const useOrders = () => {
  const [state, setState] = useState({
    loading: true,
    deletedOrderId: '',
    showedFullOrderId: '',
  });

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.isAuth);

  const orders = useSelector((state) => state.ords.orders);

  useEffect(() => {
    initializeOrders(dispatch, authToken, setState);
  }, [dispatch, authToken]);

  const onDeleteOrderHandler = useCallback(
    (_id) => handleDeleteOrder(_id, setState, dispatch, authToken),
    [dispatch, authToken]
  );

  const onGetDetailsHandler = useCallback(
    (_id) => handleGetDetails(_id, setState),
    []
  );

  return {
    state,
    orders,
    onDeleteOrderHandler,
    onGetDetailsHandler,
  };
};

export default useOrders;
