import React from 'react';
import SelectedSpecies from './selectedSpecies/selectedSpecies';

const speciesFilter = props =>{

    const species = props.list.map(pet=>{
        return <SelectedSpecies pet={pet} key={pet + '_key'}/>
    })

    return(
        
        <select value ={props.selected} onChange={props.change}>
        <option value = "default">Gatunek</option>
        {species}
        </select>
    )
}


export default speciesFilter;