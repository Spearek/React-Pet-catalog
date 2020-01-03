import React from 'react';

const input= props =>(

    <input 
    type={props.newPetData.prop} 
    value={props.newPetData.value} 
    placeholder={props.newPetData.type} 
    onChange={props.changed}
    required/>
)


export default input;