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
            dispatch(storePetsASync())
            })
          .catch(err =>{
              let petError = err.response.data.error
              dispatch(addNewPetFailed(petError))
          });

    }
}

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

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const logoutWhenTimeExpires = (expTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expTime*1000)
    }
}


export const authAsync = (email,pass,haveAcc,err) =>{
    return dispatch =>{
        dispatch(authStart())
        if(err){
            dispatch(authErrRemoved())
        }

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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email',response.data.email);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(logoutWhenTimeExpires(response.data.expiresIn))
                dispatch(authSucceed(response.data.idToken,response.data.localId))
              })
            .catch(err =>{
                console.log(err.response.data.error);
                dispatch(authFailed(err.response.data.error))
            })
        

    }
}


export const authCheckFromToken = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        } else{
            const expirationTime = new Date(localStorage.getItem('expirationDate')).getTime();
            const currentTime = new Date().getTime();
            if(expirationTime <= currentTime){
                dispatch(logout())
            } else{
                const userId = localStorage.getItem('userId');
                const secondsTillExpire = ((expirationTime - currentTime)/1000);
                dispatch(authSucceed(token,userId));
                dispatch(logoutWhenTimeExpires(secondsTillExpire));
            }
        }

    }

}


export const fetchUserPets = (fetchedPets) =>{
    return{
        type: actionTypes.FETCH_USER_PETS,
        pets: fetchedPets
    }
}


export const fetchUserPetsAsync = (userId) =>{
    return dispatch =>{
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


