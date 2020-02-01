import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {authAsync, changeAuthMethod } from '../../store/actions/actionCreators';

import classes from './Auth.module.css';

class Auth extends Component {

    state={
        email:'',
        pass:'',
        haveAccount:true
    }
    authMethodHandler = () =>{
        this.setState((prevState)=>{
            return{haveAccount:!prevState.haveAccount}
        })
        
    }

    inputChangeHandler = (event, type) =>{
        let value = event.target.value;
        if (type === 'email'){
            this.setState({email :value})
        }
        this.setState({pass :value})

    }

    tryToAuthHandler = (event) =>{
        event.preventDefault();
        this.props.tryToAuth(this.state.email,this.state.pass,this.state.haveAccount);
    }
    
    render(){

        let title = 'Zaloguj się';
        let info = (
            <React.Fragment>
                    <p>Nie masz jeszcze konta?</p>
                    <p>Nic straconego, kliknij <span onClick={this.authMethodHandler}>TUTAJ</span> aby przejść do Rejestracji</p>
            </React.Fragment>);

        if (!this.state.haveAccount){
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
                    <input type="email" placeholder="Adres email" required onChange={(event)=>this.inputChangeHandler(event,'email')}/>
                    <input type="password" placeholder="Hasło" required onChange={(event)=>this.inputChangeHandler(event,'pass')}/>
                    <button type="submit">{title}</button>    
                </form>
                {info}

            </div>

        )

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        changeMethod:()=>dispatch(changeAuthMethod()),
        tryToAuth:(email,pass,haveAcc)=>dispatch(authAsync(email,pass,haveAcc))
    }
}


export default connect(null,mapDispatchToProps)(Auth);