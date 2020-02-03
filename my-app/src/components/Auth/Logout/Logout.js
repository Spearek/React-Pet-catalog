import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../../store/actions/actionCreators'

class Logout extends Component{

    componentDidMount(){
        this.props.userLogout();
    }

    render(){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        userLogout: () =>dispatch(logout())
    }
}


export default connect(null,mapDispatchToProps) (Logout);