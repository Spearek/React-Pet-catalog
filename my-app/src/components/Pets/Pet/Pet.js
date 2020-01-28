import React from 'react';
import FavFood from './FavFood/FavFood';
import classes from './Pet.module.css';

import deleteBtn from '../../../assets/photoshop slices/delete.png'


const pet = props =>{

    let favFood = null;
     let haveFav = null;
   if (props.food !== undefined ){
       
       haveFav = <h4>Ulubione jedzenie:</h4>

        favFood = props.food.map((el,pos) => {
            return( 
                <FavFood 
                favorite = {el}
                key={el + pos}/>
                )
        });
   }

   let polishSpecies;

   switch (props.petSpecies) {
    case 'Dog':
      polishSpecies = 'Pies';
      break;
    case 'Cat':
      polishSpecies = 'Kot';
      break;
    case 'Rodent':
      polishSpecies = 'Gryzoń';
      break;
    default:
      polishSpecies = 'Nieznany';
  }


  
    return(

        <div className={classes.petContainer}>
            
            <div className={classes.leftElements}>
                <h3 className={classes.title}>{props.petName}</h3>
                <p className={classes.description}>Kilka przykładowych zdań o zwierzaku. Domyślnie będą one zaciągane z serwera. Na tą chwilę jest to placeholder. Jeśli sprawdzasz ten projekt - zerknij za jakiś czas :)</p>
                <p className={classes.petInfo}><span style={{fontWeight:600}}>Wiek:</span> {props.petAge} lat</p>
                <p className={classes.petInfo}><span style={{fontWeight:600}}>Gatunek:</span> {polishSpecies}</p>
                {haveFav}
                <div className={classes.foodContainer}>
                    {favFood}
                </div>
                
            </div>
            <div className={classes.rightElements}>
                <div className={classes.petAvatar}>
                    <img src={props.petPhoto} alt={props.petSpecies + ' photography'}/>
                </div>
            </div>
            <img className={classes.remove} onClick={props.click} src={deleteBtn} alt='delete button' />
        </div>
    )
}

export default pet;