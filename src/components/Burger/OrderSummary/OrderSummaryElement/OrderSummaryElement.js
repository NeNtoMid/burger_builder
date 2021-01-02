import React, { memo } from 'react';

import classes from './OrderSummaryElement.module.css';

const orderSummaryElement = (props) => (
  <li className={classes.listElement}>
    <span className={classes.ingredientName}>
      {props.ing.charAt(0).toUpperCase() + props.ing.slice(1)}:
    </span>
    <span className={classes.ingredientQty}>
      {props.ingredientQty} &#10005; {props.price}$
    </span>
    <span className={classes.ingredientPrice}>
      {' '}
      {(props.price * props.ingredientQty).toFixed(2)} $
    </span>
  </li>
);

export default memo(orderSummaryElement);
