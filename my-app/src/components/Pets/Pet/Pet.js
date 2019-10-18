import React from 'react';
import classes from './Pet.module.css';


const pet = props =>{

    return(
        
        <div className={classes.petContainer}>
            <div className={classes.petAvatar}>
                <img src={props.petPhoto} alt={props.petSpecies + ' photography'}/>
            </div>
            <div className={classes.petInfo}>
                <p>Imię: {props.petName}</p>
                <p>Wiek: {props.petAge}</p>
                <p>Gatunek: {props.petSpecies}</p>
                <img className={classes.remove} onClick={props.click} src={require('../../../assets/photoshop slices/delete.png')} alt='delete button' />            
            </div>
        </div>
    )
}

export default pet;