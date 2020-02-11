import React from 'react';
import Pet from './Pet/Pet';
import Spinner from '../UI/Spinner/Spinner';

import classes from './Pets.module.css';

const pets = props =>{

    const currentYear = new Date().getFullYear();

    let petListManager = <Spinner/>

    if (props.petList){
        petListManager = props.petList.map(el =>{
            if (props.visiblity === 'default' || props.visiblity === el.species){
                return (
                    <Pet 
                    petName={el.name}
                    petAge={currentYear - el.birthYear}
                    petSpecies={el.species}
                    petPhoto={el.photo}
                    food={el.favFoods}
                    key={el.id}
                    petId={el.id}
                    likedArr={el.likedBy}
                    userId={props.userId}
                    //click={props.click.bind(this,el.id)}
                    myPetsSection={props.myPetsSection}
                    />)
            }
            return null;
        });
        
    }

    return(
        <div className={classes.pets}>
            {petListManager}
        </div>           
    )};

export default pets;