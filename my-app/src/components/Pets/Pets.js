import React from 'react';
import Pet from './Pet/Pet';

import classes from './Pets.module.css';

const pets = props =>{

    const currentYear = new Date().getFullYear();

    let petListManager = props.petList.map(el =>{
        if (props.visiblity === 'default' || props.visiblity === el.species){
            return (
                <Pet 
                petName={el.name}
                petAge={currentYear - el.birthYear}
                petSpecies={el.species}
                petPhoto={el.photo}
                food={el.favFoods}
                key={el.key}
                click={props.click.bind(this,el.key)}/>)
        }
        return null;
    });

    return(
        <div className={classes.pets}>
            {petListManager}
        </div>           
    )};

export default pets;