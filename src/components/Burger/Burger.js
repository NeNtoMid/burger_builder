import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformedKeys = Object.keys(props.ingredients);

  let ingredients = null;

  if (transformedKeys.every((key) => props.ingredients[key] === 0)) {
    ingredients = (
      <Fragment>
        <BurgerIngredient type='bread-top' />
        <h1>Please , add some ingredient!</h1>
        <BurgerIngredient type='bread-bottom' />
      </Fragment>
    );
  } else {
    ingredients = (
      <Fragment>
        <BurgerIngredient type='bread-top' />
        {transformedKeys.map((ing) =>
          [...Array(props.ingredients[ing])].map((el, i) => (
            <BurgerIngredient type={ing} key={ing + i} />
          ))
        )}
        <BurgerIngredient type='bread-bottom' />
      </Fragment>
    );
  }

  return <div className={classes.Burger}>{ingredients}</div>;
};

burger.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default burger;
