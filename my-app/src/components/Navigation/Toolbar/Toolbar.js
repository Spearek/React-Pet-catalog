import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Burger from '../SideDrawer/Burger/Burger';


const toolbar = (props) =>{

    let showLogo = null;

    if(!props.isDrawerOpen)  showLogo = <Logo/>

    return(
        <header className={classes.toolbar}>
            <Burger 
            active={props.isDrawerOpen}
            clicked={props.burgerClicked}/>
            {showLogo}
            <div className={classes.desktopOnly}>
                <NavigationItems
                modalHandler={props.modalHandler}
                isAuth={props.isAuth}/>
            </div>
        </header>

    )
}


export default toolbar;