import React from 'react';

import classes from './Order.module.css';

import Button from './../UI/Button/Button';

import Spinner from './../UI/Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';

const order = (props) => {
  let order = <Spinner />;

  let orderDetails = null;

  let detailsBtn = (
    <Button click={props.getDetails} btnClasses={['Success']}>
      <FontAwesomeIcon icon={faInfo} className={classes.InfoIcon} />
      MORE INFO
    </Button>
  );

  if (props.isShowed) {
    orderDetails = (
      <Fragment>
        <h3>Customer details:</h3>
        <ul className={classes.detailsList}>
          {Object.keys(props.customer).map((el) => (
            <li key={el}>
              <strong> {el}</strong> : {props.customer[el]}
            </li>
          ))}
        </ul>
      </Fragment>
    );

    detailsBtn = null;
  }
  if (!props.deleteLoading) {
    order = (
      <div className={classes.Order}>
        <p>Ingriedients:</p>
        <ul>
          {Object.keys(props.ingredients).map((ing) => (
            <li key={`${ing}-${props.ingredients[ing]}`}>
              {ing}
              <strong> ({props.ingredients[ing]}) </strong>
            </li>
          ))}
          {orderDetails}
          <Button click={props.deleteOrder} btnClasses={['Danger']}>
            {' '}
            DELETE
          </Button>
          {detailsBtn}
        </ul>

        <p>
          Price:&nbsp;<strong>{props.price.toFixed(2)}$</strong>
        </p>
      </div>
    );
  }
  return order;
};

export default order;
