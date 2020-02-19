import React,{Component} from 'react';
import  {connect} from 'react-redux';

import emptyLike from '../../../../assets/like_icons/love_gray.svg';
import like from '../../../../assets/like_icons/love.svg';
import * as actions from '../../../../store/actions/index';

const Favorites = props => {

    const clickHandler = () =>{

        props.likeClicked(props.token,props.petId,props.userId,props.petArr);
    }

        let iconStatus = emptyLike;

        if(props.isLiked){
            iconStatus = like;
        }

        const iconStyles = {
            height: '30px',
            width:'30px',
            position: 'absolute',
            bottom: '15px',
            right: '20px',
            cursor: 'pointer'
        }

        let likeImage = <img src={iconStatus} style={iconStyles} alt='heart icon' onClick={clickHandler}/>

        if(!props.isAuthenticated || props.myPetsSection){
          likeImage = null;
        }


        return(
          <React.Fragment>
            {likeImage} 
          </React.Fragment>         

        )
}

const mapStateToProps = state =>{
    return{
      token: state.token,
      isAuthenticated: state.token !== null,
      petArr: state.pets,
      userId: state.userId
    }
  };
  
  const mapDispatchToProps = dispatch =>{
    return{
      likeClicked:(token,petId,userId,pets)=>dispatch(actions.likePetAsync(token,petId,userId,pets)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (Favorites);
