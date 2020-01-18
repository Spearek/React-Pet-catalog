import React from 'react';

const selectedSpecies = props =>{

    let polishSpecies=['Kot','Pies','Gryzoń']

    return(
        <option value = {props.pet}>{polishSpecies[props.position]}</option>
    )
}

export default selectedSpecies;