import React from 'react';

import classes from './Input.module.css';

import clsx from 'clsx';

const input = (props) => {
  let inputElement = null;

  const inputClasses = clsx({
    [classes.InputElement]: true,
    [classes.Invalid]: props.error ? true : false,
  });

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p className={classes.ErrorMessage}>{props.error.message}</p>
    );
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          ref={props.register(props.validation)}
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          ref={props.register(props.validation)}
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          name={props.elementConfig.name}
          ref={props.register(props.validation)}
        >
          {props.elementConfig.options.map((option) => (
            <option
              key={option.value + option.displayValue}
              value={option.value}
            >
              {option.displayValue}
            </option>
          ))}
        </select>
      );

      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          ref={props.register(props.validation)}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default input;
