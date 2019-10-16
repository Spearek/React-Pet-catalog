import React from 'react';
import Pet from './Pet/Pet';

const pets = props =>{

    let petListManager = props.petList.map(el =>{
        return <Pet petName={el.name}/>
    });
    console.log(petListManager) 


    return(

        <React.Fragment>
          {petListManager}
        </React.Fragment>
    )};

export default pets;