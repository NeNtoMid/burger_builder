import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import {
  addBurgerIngredient,
  removeBurgerIngredient,
  initBurgerIngredients,
} from './../../store/actions/index';

import INGREDIENT_PRICES from './../../assets/prices';

import Burger from './../../components/Burger/Burger';

import BuildControls from './../../components/Burger/BuildControls/BuildControls';

import ingContext from './../../context/ing-context';

import Modal from './../../components/UI/Modal/Modal';

import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

import Spinner from './../../components/UI/Spinner/Spinner';

import axios from './../../axios-orders';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  async componentDidMount() {
    await this.props.onInitializeBurgerIngredients();
  }

  onChangePurchaseStatusHandler = () => {
    if (this.props.isAuth) {
      this.setState((prevState) => {
        return { purchasing: !prevState.purchasing };
      });
    } else {
      this.props.history.push('/auth?login=true');
    }
  };

  onContinueOrderHandler = async () => {
    try {
      this.setState({ loading: true });
      await axios.put('/ingredients.json', { ...this.props.ings });
      this.props.history.push('/checkout');
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  render() {
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings && !this.props.error) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />

          <ingContext.Provider
            value={{
              increase: this.props.onAddBurgerIngredient,
              decrease: this.props.onRemoveBurgerIngredient,
            }}
          >
            <BuildControls
              totalPrice={this.props.totalPrice}
              ingredients={this.props.ings}
              purchased={this.onChangePurchaseStatusHandler}
              isAuth={this.props.isAuth}
            />
          </ingContext.Provider>
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          show={this.state.purchasing}
          ingredients={this.props.ings}
          prices={INGREDIENT_PRICES}
          totalPrice={this.props.totalPrice}
          cancelOrder={this.onChangePurchaseStatusHandler}
          continueOrder={this.onContinueOrderHandler}
          loading={this.state.loading}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.onChangePurchaseStatusHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ings.ingredients,
    totalPrice: state.ings.totalPrice,
    error: state.ings.error,
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitializeBurgerIngredients: () => dispatch(initBurgerIngredients()),

    onAddBurgerIngredient: (ingredientType) =>
      dispatch(addBurgerIngredient(ingredientType)),

    onRemoveBurgerIngredient: (ingredientType) =>
      dispatch(removeBurgerIngredient(ingredientType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
