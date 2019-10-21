import React from 'react';
import classes from './Cockpit.module.css';
import SpeciesFilter from './speciesFilter/speciesFilter';


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
                <SpeciesFilter
                selected={props.selected}
                change={props.change}
                list={props.speciesList}/>
                
            </div>
        </div>
    )
}

export default cockpit;