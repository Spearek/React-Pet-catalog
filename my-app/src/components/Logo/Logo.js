import React from 'react';

import petLogo from '../../assets/logo/logo-cat.svg';
import classes from './Logo.module.css';

const logo = (props) =>(
    <div className={classes.logoContainer}>
        <img src={petLogo} alt="Cat logo"/>
    </div>
)


export default logo;
