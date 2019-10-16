import React from 'react';
import Pet from './Pet/Pet';

const pets = props =>{

    const currentYear = new Date().getFullYear();

    let petListManager = props.petList.map(el =>{
        return (
        <Pet 
        petName={el.name}
        petAge={currentYear - el.birthYear}
        petSpecies={el.species}
        petPhoto={el.photo}/>)
    });



    return(

        <React.Fragment>
          {petListManager}
        </React.Fragment>
    )};

export default pets;