import React from 'react';

import PropTypes from 'prop-types';

import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
  const renderedBuildControl = Object.keys(props.ingredients).map((ing, i) => (
    <BuildControl
      ingredientQty={props.ingredients[ing]}
      label={ing}
      key={ing + i}
    />
  ));

  let isDisabled = Object.keys(props.ingredients).every(
    (ing) => props.ingredients[ing] === 0
  );

  if (!props.isAuth) isDisabled = false;

  return (
    <div className={classes.BuildControls}>
      <p>
        Price:<strong>${props.totalPrice.toFixed(2)}</strong>
      </p>
      {renderedBuildControl}
      <button
        className={classes.OrderButton}
        disabled={isDisabled}
        onClick={props.purchased}
      >
        {!props.isAuth ? `LOGIN TO ORDER` : 'ORDER NOW'}
      </button>
    </div>
  );
};

buildControls.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  ingredients: PropTypes.object.isRequired,
  purchased: PropTypes.func.isRequired,
};

export default buildControls;
