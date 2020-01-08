import React from 'react';

const radio = props =>{

    let polishSpecies=['Kot','Pies','Gryzoń']

    return(
        <label>
            <input type="radio" value={props.speciesName} name="species" onChange={props.changed} checked={props.speciesName === props.radioChecked} required/>
            {polishSpecies[props.position]}
        </label>

    )
}

export default radio;
//