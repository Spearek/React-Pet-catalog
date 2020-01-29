import React from 'react';

import classes from './Burger.module.css';

const burger = (props) =>{

    let burgerStyles = '';

    (props.active) ? burgerStyles=[classes.hamburger, classes.hamburgerSpin, classes.isActive].join(' ') : burgerStyles=[classes.hamburger, classes.hamburgerSpin].join(' ');
    
    return(
    <button className={burgerStyles} type="button" onClick={props.clicked}>
        <span className={classes.hamburgerBox}>
            <span className={classes.hamburgerInner}></span>
        </span>
    </button> 
)
    }

export default burger;