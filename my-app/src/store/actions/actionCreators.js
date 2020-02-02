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

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSucceed = (token,userId) =>{
    return{
        type:actionTypes.AUTH_SUCCEED,
        token: token,
        userId: userId
    }
}

export const authFailed = (err)=>{
    return{
        type: actionTypes.AUTH_FAILED,
        error: err,
    }
}

export const authErrRemoved = () =>{
    return{
        type: actionTypes.AUTH_ERR_REMOVED
    }
}

export const authAsync = (email,pass,haveAcc) =>{
    return dispatch =>{
        dispatch(authStart())
        dispatch(authErrRemoved())
        const userData = {
            email:email,
            password: pass,
            returnSecureToken: true
        }
        let postURL ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-Wbo_JYo2XFL3YwJcVO_BUXmNemLE1aw'
        if(!haveAcc){
            postURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-Wbo_JYo2XFL3YwJcVO_BUXmNemLE1aw'
        } 
        axios.post(postURL,userData)
            .then(response=>{
                console.log(response);
                dispatch(authSucceed(response.data.idToken,response.data.localId))
              })
            .catch(err =>{
                console.log(err.response.data.error);
                dispatch(authFailed(err.response.data.error))
            })
        

    }
}



