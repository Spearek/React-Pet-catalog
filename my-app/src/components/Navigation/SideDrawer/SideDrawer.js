import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) =>{

    let attachedClasses = [classes.sideDrawer, classes.close];

    if (props.show) {
        attachedClasses = [classes.sideDrawer, classes.open];
    }
    return(
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <NavigationItems
                modalHandler={props.modalHandler}
                isAuth={props.isAuth}/>
                <Logo/>
            </div>
        </React.Fragment>

    )
}

export default sideDrawer;