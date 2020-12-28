import React from 'react';

import PropTypes from 'prop-types';

import classes from './Button.module.css';

const button = (props) => (
  <button
    className={['Button', ...props.btnClasses]
      .map((btnClass) => classes[btnClass])
      .join(' ')}
    onClick={props.click}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

button.propTypes = {
  btnClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default button;
