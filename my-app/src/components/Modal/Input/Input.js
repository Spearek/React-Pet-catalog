import React from 'react';
import pawIcon from '../../../assets/modal_icons/singlePaw.svg';

const input= props =>{
    
    let youngest = new Date().getFullYear();

    let inputStyle={
        backgroundImage:`url(${pawIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        backgroundSize:"contain"

    }

    return(
    <input style={inputStyle}
    type={props.newPetData.prop} 
    value={props.newPetData.value} 
    placeholder={props.newPetData.type} 
    min={2000}
    max={youngest}
    onChange={props.changed}
    required/>
)}

export default input;