import React, { Fragment, memo } from 'react';

import PropTypes from 'prop-types';

import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  modalClosed: PropTypes.func.isRequired,
};

export default memo(
  Modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
);
