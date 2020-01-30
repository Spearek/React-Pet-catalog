import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItems.module.css';

const navigation = (props) =>{

    return(      
        <nav> 
            <ul className={classes.navigation}>
                <li onClick={props.modalHandler.bind(this,true)}><p>Dodaj zwierzaka</p></li>
                <li><NavLink activeClassName={classes.active} to='/' exact>Lista zwierzaków</NavLink></li> 
                <li><NavLink activeClassName={classes.active} to='/my-pets'>Moje zwierzaki</NavLink></li>
                <li><NavLink activeClassName={classes.active} to='/my-collection'>Obserwowane</NavLink></li>
            </ul>
        </nav>
    )
}

export default navigation;