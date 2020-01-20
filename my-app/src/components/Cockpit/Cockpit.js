import React from 'react';
import classes from './Cockpit.module.css';
import SpeciesFilter from './speciesFilter/speciesFilter';
import Navigation from './Navigation/Navigation';


const cockpit = props =>{
    
    return(
        <div className={classes.container}>
            <Navigation
            modalHandler={props.modalHandler}/>
            <div className={classes.sorts}></div>
            <div className={classes.leftElements}>
                <p>Sortowanie</p>
                <button onClick={props.sort.bind(this,'birthYear')}>WIEK</button>
                <button onClick={props.sort.bind(this,'name')}>IMIE</button>
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