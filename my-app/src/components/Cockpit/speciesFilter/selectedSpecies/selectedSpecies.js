import React from 'react';

const selectedSpecies = props =>{

    return(
        <option value = {props.pet}>{props.pet}</option>
    )
}

export default selectedSpecies;