import React from 'react';

const radio = props =>{


    return(
        <label>
            <input type="radio" value={props.speciesName} name="species"/>
            {props.speciesName}
        </label>

        

    )
}

export default radio;
