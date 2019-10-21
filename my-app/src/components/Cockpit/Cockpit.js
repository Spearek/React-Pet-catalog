import React from 'react';
import classes from './Cockpit.module.css';
import SpeciesSelect from './speciesSelect/speciesSelect';


const cockpit = props =>{
    return(
        <div className={classes.container}>
            <div className={classes.leftElements}>
                <p>Sortowanie</p>
                <button>WIEK</button>
                <button>IMIE</button>
            </div>
            <div className={classes.rightElements}>
                <p>Filtry</p>
                <SpeciesSelect
                selected={props.selected}
                change={props.change}/>
                
            </div>
        </div>
    )
}

export default cockpit;