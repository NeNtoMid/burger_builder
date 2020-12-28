import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import classes from './OrderSummary.module.css';

import Button from './../../UI/Button/Button';

import OrderSummaryElement from './OrderSummaryElement/OrderSummaryElement';

import Spinner from './../../UI/Spinner/Spinner';

const orderSummary = (props) => {
  const ingredientsList = Object.keys(props.ingredients).map((ing, i) => (
    <OrderSummaryElement
      ing={ing}
      key={ing + i}
      ingredientQty={props.ingredients[ing]}
      price={props.prices[ing]}
    />
  ));

  let orderSummary = <Spinner />;

  if (!props.loading) {
    orderSummary = (
      <Fragment>
        <h2>Your order</h2>
        <p>A delicious burger with following ingredients:</p>
        <ul className={classes.unorderedList}>{ingredientsList}</ul>

        <p className={classes.ingredientPrice}>
          <strong> Total: {props.totalPrice.toFixed(2)} $</strong>
        </p>
        <p className={classes.checkoutParagraph}>Continue to checkout ?</p>
        <Button click={props.cancelOrder} btnClasses={['Danger']}>
          CANCEL
        </Button>

        <Button click={props.continueOrder} btnClasses={['Success']}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
  return orderSummary;
};

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  prices: PropTypes.objectOf(PropTypes.number).isRequired,
  totalPrice: PropTypes.number.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  continueOrder: PropTypes.func.isRequired,
};

export default orderSummary;
