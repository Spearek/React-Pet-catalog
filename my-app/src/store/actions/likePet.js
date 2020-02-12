import * as actionTypes from './actionTypes';
import axios from '../../axios-pets';

export const likePetUpdate = (petId,userId,pets,userPets) =>{

    let petSpecification = pets.filter(el => el.id === petId)[0];

    if(petSpecification.likedBy){
        let isLiked = petSpecification.likedBy.some(el=>el===userId);
        if(isLiked){
            const whichPosition = petSpecification.likedBy.findIndex(el => el === userId);
            petSpecification.likedBy.splice(whichPosition,1);
        }else{
            petSpecification.likedBy.push(userId)
        }
        
    }else{
        petSpecification.likedBy = [userId];
    }
    return{
        type: actionTypes.LIKE_PET_UPDATE,
        newPetSpec: petSpecification,
        id: petId
    }
}

export const likePetAsync = (token,petId,userId,pets) =>{
    return dispatch =>{
        axios.get(`/pets/${petId}/likedBy.json`)
        .then(response=>{
            if(response.data){
                let alreadyLiked = response.data.some(el => el===userId);
                if (alreadyLiked){
                    const userPosition = response.data.findIndex( el => el===userId);
                    axios.delete(`/pets/${petId}/likedBy/${userPosition}.json?auth=` + token)
                    .then(response=>{
                        dispatch(likePetUpdate(petId,userId,pets));
                        console.log(response.data)
                    })
                    .catch(err =>{
                        console.log(err.response.data)

                    })
                }else{
                    let likedPosition = response.data.length;
                    axios.patch(`/pets/${petId}/likedBy.json?auth=` + token,{[likedPosition]: userId})
                    .then(response=>{
                        dispatch(likePetUpdate(petId,userId,pets))
                        console.log(response.data)
                    })
                    .catch(err =>{
                        console.log(err.response.data)
                    })
                }
            } else{
                axios.patch(`/pets/${petId}/likedBy.json?auth=` + token,{'0': userId})
                .then(response=>{
                    dispatch(likePetUpdate(petId,userId,pets))
                })
                .catch(err =>{
                    console.log(err.response.data)
                })

            } 
            })
        .catch(err =>{
            console.log(err.response.data)
          })
    }
}
