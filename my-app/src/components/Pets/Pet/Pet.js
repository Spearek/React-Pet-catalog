import React from 'react';
import FavFood from './FavFood/FavFood';
import classes from './Pet.module.css';

import deleteBtn from '../../../assets/photoshop slices/delete.png'


const pet = props =>{

    let favFood = null;
   if (props.food !== undefined ){
    favFood = props.food.map((el,pos) => {
        return( 
            <FavFood 
            favorite = {el}
            key={el + pos}/>
            )
    });
   }
  
    return(

        <div className={classes.petContainer}>
            
            <div className={classes.rightElements}>
                <h3>{props.petName}</h3>
                <p className={classes.description}>Kilka przykładowych zdań o zwierzaku. Domyślnie będą one zaciągane z serwera. Na tą chwilę jest to placeholder. Jeśli sprawdzasz ten projekt - zerknij za jakiś czas :)</p>
                <p>Wiek: {props.petAge} lat</p>
                <p>Gatunek: {props.petSpecies}</p>
                <div className={classes.foodContainer}>
                    {favFood}
                </div>
                
            </div>
            <div className={classes.leftElements}>
                <div className={classes.petAvatar}>
                    <img src={props.petPhoto} alt={props.petSpecies + ' photography'}/>
                </div>
            </div>
            <img className={classes.remove} onClick={props.click} src={deleteBtn} alt='delete button' />
        </div>
    )
}

export default pet;