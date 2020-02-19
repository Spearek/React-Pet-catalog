import * as actionTypes from './actionTypes';
import axios from 'axios';

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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email',response.data.email);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(logoutWhenTimeExpires(response.data.expiresIn))
                dispatch(authSucceed(response.data.idToken,response.data.localId))
              })
            .catch(err =>{
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


