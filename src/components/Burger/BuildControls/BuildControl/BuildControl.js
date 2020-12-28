import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import classes from './BuildControl.module.css';

import ingContext from './../../../../context/ing-context';

const BuildControl = (props) => {
  const label = props.label.charAt(0).toUpperCase() + props.label.slice(1);

  const ingProps = useContext(ingContext);

  let decreaseBtn = null;

  if (props.ingredientQty > 0) {
    decreaseBtn = (
      <button
        className={classes.Less}
        onClick={() => ingProps.decrease(props.label)}
      >
        Less &#8722;
      </button>
    );
  }

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      {decreaseBtn}

      <button
        className={classes.More}
        onClick={() => ingProps.increase(props.label)}
      >
        More +
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  ingredientQty: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default BuildControl;
