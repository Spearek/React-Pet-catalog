import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';

import classes from './Auth.module.css';

class Auth extends Component {

    state={
        email:'',
        pass:'',
        haveAccount:true
    }
    authMethodHandler = () =>{
        if (this.props.err){
            this.props.removeErrInfo();
        }

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
        this.props.tryToAuth(this.state.email,this.state.pass,this.state.haveAccount,this.props.err);
    }
    
    render(){
        
        let redirect = null;
        if(this.props.isAuthenticated){
            redirect = <Redirect to='/'/>
        }
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

        let authForm = (
            <React.Fragment>
                <h2>{title}</h2>
                <p>{title} w aplikacji aby w pełni korzystać z jej funkcjonalności.</p>
                <p>Dodawaj nowe zwierzaki, przeglądaj już dodane i twórz własną kolekcję!</p>
                <form className={classes.authForm} onSubmit={this.tryToAuthHandler}>
                    <input type="email" placeholder="Adres email" required onChange={(event)=>this.inputChangeHandler(event,'email')}/>
                    <input type="password" placeholder="Hasło" required onChange={(event)=>this.inputChangeHandler(event,'pass')}/>
                    <span>{this.props.err}</span>
                    <button type="submit">{title}</button>    
                </form>
                {info}
            </React.Fragment>
        )

        if (this.props.loading){
            authForm = <Spinner/>
        }

        


        return(
            <div className={classes.authContainer}>
                {redirect}
                {authForm}    
            </div>

        )

    }
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