import * as actionTypes from './actionTypes';
import axios from '../../axios-pets';

export const fetchUserPets = (fetchedPets) =>{
    return{
        type: actionTypes.FETCH_USER_PETS,
        pets: fetchedPets
    }
}

export const fetchUserPetsAsync = (userId,needToFetch) =>{
    return dispatch =>{
        if (needToFetch){
            const queryString = `/pets.json?orderBy="addedBy"&equalTo="${userId}"`;
            axios.get(queryString)
              .then(response=>{    
                    let newPets = [];
                    for (let key in response.data){
                        newPets.push({
                            ...response.data[key],
                            id: key
                            });
                    }
                dispatch(fetchUserPets(newPets))
                })
              .catch(err =>{
                  console.log(err.response.data.error) 
              });
        }
    }

}
