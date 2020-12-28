import React from 'react';

import burgerLogo from './../../assets/images/logo.png';

import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo} style={props.styles}>
    <img src={burgerLogo} alt='BurgerKing'></img>
  </div>
);

export default logo;
