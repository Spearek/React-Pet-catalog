import React, {Component} from 'react';
import axios from 'axios';
import  {connect} from 'react-redux';

import classes from './Auth.module.css';

class Auth extends Component {

    state={
        haveAccout:true
    }

    authMethodHandler = () =>{
        this.setState((prevState)=>{
            return{haveAccout:!prevState.haveAccout}
        })
        
    }

    tryToAuthHandler = (event) =>{
        event.preventDefault();
        console.log('Sent!');
    }
    
    render(){

        let title = 'Zaloguj się';
        let info = (
            <React.Fragment>
                    <p>Nie masz jeszcze konta?</p>
                    <p>Nic straconego, kliknij <span onClick={this.authMethodHandler}>TUTAJ</span> aby przejść do Rejestracji</p>
            </React.Fragment>);

        if (!this.state.haveAccout){
            title = 'Zarejestruj się';
            info = (
                <React.Fragment>
                        <p>Masz już konto?</p>
                        <p>Świetnie, przejdź <span onClick={this.authMethodHandler}>TUTAJ</span> aby zalogować się do aplikacji.</p>
                </React.Fragment>);
        }

        


        return(
            <div className={classes.authContainer}>
                <h2>{title}</h2>
                <p>{title} w aplikacji aby w pełni korzystać z jej funkcjonalności.</p>
                <p>Dodawaj nowe zwierzaki, przeglądaj już dodane i twórz własną kolekcję!</p>
                <form className={classes.authForm} onSubmit={this.tryToAuthHandler}>
                    <input type="email" placeholder="Adres email" required/>
                    <input type="password" placeholder="Hasło" required/>
                    <button type="submit">{title}</button>    
                </form>
                {info}

            </div>

        )

    }
}


export default Auth;