import React from 'react';

import classes from './Navigation.module.css';
import logo from '../../../assets/logo/logo-cat.svg'

const navigation = () =>{

    return(
        <header className={classes.header}>
            <div className={classes.logoContainer}>
                <img src={logo} alt='page logo'/>
            </div>
            <nav> 
                <ul className={classes.navigation}>
                    <li><a href='/'>Lista zwierzaków</a></li> 
                    <li><a href='/'>Dodaj zwierzaka</a></li>
                    <li><a href='/'>Moje zwierzaki</a> </li>
                    <li><a href='/'>Obserwowane</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default navigation;