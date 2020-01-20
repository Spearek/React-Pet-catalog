import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Navigation.module.css';
import logo from '../../../assets/logo/logo-cat.svg'

const navigation = (props) =>{

    return(
        <header className={classes.header}>
            <div className={classes.logoContainer}>
                <img src={logo} alt='page logo'/>
            </div>
            <nav> 
                <ul className={classes.navigation}>
                    <li onClick={props.modalHandler.bind(this,true)}><p>Dodaj zwierzaka</p></li>
                    <li><NavLink activeClassName={classes.active} to='/' exact>Lista zwierzaków</NavLink></li> 
                    <li><NavLink activeClassName={classes.active} to='/my-pets'>Moje zwierzaki</NavLink></li>
                    <li><NavLink activeClassName={classes.active} to='/my-collection'>Obserwowane</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default navigation;