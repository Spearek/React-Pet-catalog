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
                        id: key,
                        addedBy: 'anonymous'
                        });
                }
            dispatch(storePets(newPets))
            })
    }
};
