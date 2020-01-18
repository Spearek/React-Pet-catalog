import React from 'react';
import SelectedSpecies from './selectedSpecies/selectedSpecies';
import classes from './speciesFilter.module.css';

const speciesFilter = props =>{

    const species = props.list.map(pet=>{
        return <SelectedSpecies pet={pet} key={pet + '_key'}/>
    })

    return(
        <div className={classes.select}>
            <select value ={props.selected} onChange={props.change}>
            <option value = "default">Gatunek</option>
            {species}
            </select>
        </div>
    )
}


export default speciesFilter;