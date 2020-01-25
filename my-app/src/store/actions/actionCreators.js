import * as actionTypes from './actionTypes';
import axios from '../../axios-pets';


export const storePets =(newPets)=>{
    return{
        type: actionTypes.STORE_PETS,
        newPets: newPets
    }
}

export const storePetsASync =()=>{
    return dispatch =>{
        axios.get('/pets.json')
            .then(response=>{    
                let newPets = [];
                for (let key in response.data){
                    newPets.push({
                        ...response.data[key],
                        id: key
                        });
                }
            dispatch(storePets(newPets))
            })
    }
};

export const localPetRemoval = (id)=>{
    return{
        type: actionTypes.LOCAL_PET_REMOVAL,
        petId: id
    }
}

export const sortPets = (prop) =>{
    return{
        type:actionTypes.SORT_PETS,
        property: prop
    }
}



