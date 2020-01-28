import React from 'react';
import classes from './FavFood.module.css';

const favFood = props => {


    return <p className={classes.container}>{props.favorite}</p>
    
}

export default favFood;