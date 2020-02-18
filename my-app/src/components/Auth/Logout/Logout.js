import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const Logout = props =>{

    const {userLogout} = props;

    useEffect(()=>{
        userLogout();
    },[userLogout])

    return <Redirect to='/'/>
     
    
}

const mapDispatchToProps = dispatch =>{
    return{
        userLogout: () =>dispatch(actions.logout())
    }
}


export default connect(null,mapDispatchToProps) (Logout);