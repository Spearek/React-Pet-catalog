import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = props => <div className={classes.backdrop}>{props.children}</div>


export default backdrop;