import React from 'react';

const input= props =>{
    
    let youngest = new Date().getFullYear();

    return(
    <input 
    type={props.newPetData.prop} 
    value={props.newPetData.value} 
    placeholder={props.newPetData.type} 
    min={2000}
    max={youngest}
    onChange={props.changed}
    required/>
)}

export default input;