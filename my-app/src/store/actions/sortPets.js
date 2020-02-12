import * as actionTypes from './actionTypes';

export const sortPets = (prop) =>{
    return{
        type:actionTypes.SORT_PETS,
        property: prop
    }
}