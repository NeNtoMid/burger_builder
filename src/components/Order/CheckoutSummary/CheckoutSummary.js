import React from 'react';

import classes from './CheckoutSummary.module.css';

import Burger from './../../Burger/Burger';

import Button from './../../UI/Button/Button';

import { connect } from 'react-redux';

import Spinner from './../../UI/Spinner/Spinner';

import { initBurgerIngredients } from './../../../store/actions/burgerBuilder';

const CheckoutSummary = (props) => {
  let burger = <Burger ingredients={props.ingredients} />;
  if (!props.ingredients) {
    burger = <Spinner />;
    (async () => {
      await props.onfetchBurgerIngredients();
    })();
  }

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>

      <div style={{ width: '100%', margin: 'auto' }}>{burger}</div>
      <Button btnClasses={['Danger']} click={props.prev}>
        {' '}
        CANCEL
      </Button>
      <Button btnClasses={['Success']} click={props.next}>
        {' '}
        CONTINUE
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ingredients: state.ings.ingredients };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onfetchBurgerIngredients: () => dispatch(initBurgerIngredients()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary);
