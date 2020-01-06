import React from 'react';

const radio = props =>{

    return(
        <label>
            <input type="radio" value={props.speciesName} name="species" onChange={props.changed} checked={props.speciesName === props.radioChecked} required/>
            {props.speciesName}
        </label>

    )
}

export default radio;
//