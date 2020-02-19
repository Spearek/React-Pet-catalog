import * as actionTypes from './actionTypes';
import axios from '../../axios-pets';



export const localPetRemoval = (id)=>{
    return{
        type: actionTypes.LOCAL_PET_REMOVAL,
        petId: id
    }
}

export const petRemovalAsync = (petId,userId,userPets,token) =>{
    return dispatch =>{
        let clickedPet = userPets.filter(el => el.id === petId)[0]; 
        if (clickedPet.addedBy === userId){
            axios.delete(`/pets/${petId}.json?auth=` + token)
                    .then(response=>{
                        dispatch(localPetRemoval(petId))
                    })
                    .catch(err =>{
                        console.log(err.response.data)
                    })
                }

        }
    }
