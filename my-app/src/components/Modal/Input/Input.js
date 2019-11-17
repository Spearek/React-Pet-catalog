import React from 'react';

const input= props =>(

    <input 
    type="text" 
    value={props.newPetData.value} 
    placeholder={props.newPetData.type} 
    onChange={props.changed}></input>
)


export default input;