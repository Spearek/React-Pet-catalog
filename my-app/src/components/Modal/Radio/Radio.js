import React from 'react';

const radio = props =>{

    return(
        <label>
            <input type="radio" value={props.speciesName} onChange={props.changed} checked={props.speciesName === props.radioChecked}/>
            {props.speciesName}
        </label>

    )
}

export default radio;
//