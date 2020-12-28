import React, { Component } from 'react';

import classes from './Orders.module.css';

import axios from '../../axios-orders';

import Order from './../../components/Order/Order';

import Spinner from './../../components/UI/Spinner/Spinner';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import { initOrders, deleteOrder } from './../../store/actions/index';

import { connect } from 'react-redux';

class Orders extends Component {
  state = { loading: true, deletedOrderId: '', showedFullOrderId: '' };

  async componentDidMount() {
    await this.props.onInitializeOrders(this.props.authToken);
    this.setState({ loading: false });
  }

  onDeleteOrderHandler = async (_id) => {
    this.setState({ deletedOrderId: _id });
    await this.props.onDeleteOrder(_id, this.props.authToken);
    this.setState({ deletedOrderId: '' });
  };

  onGetDetailsHandler = (_id) => {
    this.setState({ showedFullOrderId: _id });
  };

  render() {
    let orders = <Spinner />;

    if (this.props.orders && Object.keys(this.props.orders).length === 0) {
      orders = <h1 className={classes.noOrders}>No orders</h1>;
    } else if (this.props.orders && !this.state.loading) {
      orders = Object.keys(this.props.orders).map((orderId) => {
        return (
          <Order
            {...this.props.orders[orderId]}
            deleteOrder={() => this.onDeleteOrderHandler(orderId)}
            getDetails={() => this.onGetDetailsHandler(orderId)}
            deleteLoading={
              this.state.deletedOrderId.toString() === orderId.toString()
                ? true
                : false
            }
            isShowed={
              this.state.showedFullOrderId.toString() === orderId.toString()
                ? true
                : false
            }
            key={orderId}
          />
        );
      });
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.ords.orders,
    authToken: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitializeOrders: (authToken) => dispatch(initOrders(authToken)),
    onDeleteOrder: (_id, authToken) => dispatch(deleteOrder(_id, authToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
