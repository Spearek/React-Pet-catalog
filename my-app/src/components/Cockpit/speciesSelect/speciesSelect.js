import React from 'react';

const speciesSelect = props =>{

    return(
        <select value ={props.selected} onChange={props.change}>
        <option value = "default">Gatunek</option>
        <option value="dog">Pies</option>
        <option value="cat">Kot</option>
        </select>
    )
}


export default speciesSelect;