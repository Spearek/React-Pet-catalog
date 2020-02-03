import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItems.module.css';

const navigation = (props) =>{

    let navLinks = (
        <ul className={classes.navigation}>
            <li onClick={props.modalHandler.bind(this,true)}><p>Dodaj zwierzaka</p></li>
            <li><NavLink activeClassName={classes.active} to='/' exact>Lista zwierzaków</NavLink></li> 
            <li><NavLink activeClassName={classes.active} to='/authorisation'>Zaloguj się</NavLink></li>
        </ul>
    )

    if(props.isAuth){
        navLinks = (
            <ul className={classes.navigation}>
                <li onClick={props.modalHandler.bind(this,true)}><p>Dodaj zwierzaka</p></li>
                <li><NavLink activeClassName={classes.active} to='/' exact>Lista zwierzaków</NavLink></li> 
                <li><NavLink activeClassName={classes.active} to='/my-pets'>Moje zwierzaki</NavLink></li>
                <li><NavLink activeClassName={classes.active} to='/my-collection'>Obserwowane</NavLink></li>
                <li><NavLink activeClassName={classes.active} to='/logout'>Wyloguj</NavLink></li>
            </ul>
        )

    }

    return(      
        <nav> 
            {navLinks}
        </nav>
    )
}

export default navigation;