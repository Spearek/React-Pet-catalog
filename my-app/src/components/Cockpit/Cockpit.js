import React from 'react';
import classes from './Cockpit.module.css';


const cockpit = () =>{
    return(
        <div className={classes.container}>
            <div className={classes.leftElements}>
                <p>Sortowanie</p>
                <button>WIEK</button>
                <button>IMIE</button>
            </div>
            <div className={classes.rightElements}>
                <p>Filtry</p>
                <select>
                <option value="">Gatunki</option>
                </select>
            </div>
        </div>
    )
}

export default cockpit;