import React, {useState} from 'react';
import  {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';

import classes from './Auth.module.css';

const Auth = (props) => {

    const [emailInput,setEmailInput] = useState('');
    const [passwordInput,setPasswordInput] = useState('');
    const [accountStatus, setAccountStatus] = useState(true);

    const authMethodHandler = () =>{
        if (props.err){
            props.removeErrInfo();
        }
        setAccountStatus(!accountStatus);      
    }

    const inputChangeHandler = (event, type) =>{
        let value = event.target.value;
        if (type === 'email'){
            setEmailInput(value)
        }else{
            setPasswordInput(value)
        }
    }

    const tryToAuthHandler = (event) =>{
        event.preventDefault();
        props.tryToAuth(emailInput,passwordInput,accountStatus,props.err);
    }
        
    let redirect = null;
    if(props.isAuthenticated){
        redirect = <Redirect to='/'/>
    }
    let title = 'Zaloguj się';
    let info = (
        <React.Fragment>
                <p>Nie masz jeszcze konta?</p>
                <p>Nic straconego, kliknij <span onClick={authMethodHandler}>TUTAJ</span> aby przejść do Rejestracji</p>
        </React.Fragment>);

    if (!accountStatus){
        title = 'Zarejestruj się';
        
        info = (
            <React.Fragment>
                    <p>Masz już konto?</p>
                    <p>Świetnie, przejdź <span onClick={authMethodHandler}>TUTAJ</span> aby zalogować się do aplikacji.</p>
            </React.Fragment>);
    }

    let authForm = (
        <React.Fragment>
            <h2>{title}</h2>
            <p>{title} w aplikacji aby w pełni korzystać z jej funkcjonalności.</p>
            <p>Dodawaj nowe zwierzaki, przeglądaj już dodane i twórz własną kolekcję!</p>
            <form className={classes.authForm} onSubmit={tryToAuthHandler}>
                <input type="email" placeholder="Adres email" required onChange={(event)=>inputChangeHandler(event,'email')}/>
                <input type="password" placeholder="Hasło" required onChange={(event)=>inputChangeHandler(event,'pass')}/>
                <span>{props.err}</span>
                <button type="submit">{title}</button>    
            </form>
            {info}
        </React.Fragment>
    )

    if (props.loading){
        authForm = <Spinner/>
    }

    return(
        <div className={classes.authContainer}>
            {redirect}
            {authForm}    
        </div>

    )
}

const mapStateToProps = state =>{
    return{
      err: state.authError,
      loading: state.authLoading,
      isAuthenticated: state.token !== null
    }
  };

const mapDispatchToProps = dispatch =>{
    return{
        tryToAuth:(email,pass,haveAcc,err)=>dispatch(actions.authAsync(email,pass,haveAcc,err)),
        removeErrInfo:()=>dispatch(actions.authErrRemoved())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);