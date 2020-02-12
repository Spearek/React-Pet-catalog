import * as actionTypes from './actionTypes';
import axios from '../../axios-pets';
import * as actions from './index';

export const addNewPetStart = () =>{
    return{
        type: actionTypes.ADD_NEW_PET_START,
    }
}

export const addNewPetSucced = () =>{
    return{
        type: actionTypes.ADD_NEW_PET_SUCCEED,
    }
}
export const addNewPetFailed = (err) =>{
    return{
        type: actionTypes.ADD_NEW_PET_FAILED,
        error: err
    }
}

export const addNewPetAsync = (adopted,token,err) =>{
    return dispatch =>{
        dispatch(addNewPetStart());
        axios.post('/pets.json?auth=' + token,adopted)
          .then(response=>{
            dispatch(addNewPetSucced());
            dispatch(actions.storePetsASync())
            })
          .catch(err =>{
              let petError = err.response.data.error
              dispatch(addNewPetFailed(petError))
          });

    }
}
