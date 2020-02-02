import * as actionTypes from './actions/actionTypes';

const initialState = {
    pets: null,
    speciesList: ["Cat","Dog","Rodent"],
    token: null,
    userId:null,
    authLoading: false,
    authError : '',
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.STORE_PETS:
            return{
                ...state,
                pets:action.newPets
            }

        case actionTypes.LOCAL_PET_REMOVAL:
            const newPetArr = JSON.parse(JSON.stringify(state.pets));
            const petPosition = newPetArr.findIndex((el)=>{
                return el.id === action.petId
            });
            newPetArr.splice(petPosition,1);
            return{
                ...state,
                pets:newPetArr
            }

        case actionTypes.SORT_PETS:
            const anotherPetArr = JSON.parse(JSON.stringify(state.pets));
            anotherPetArr.sort((a, b) => (a.name > b.name) ? 1 : -1);
            if (action.property === 'birthYear'){
                anotherPetArr.sort((a, b) => (a.birthYear > b.birthYear) ? 1 : -1);
                anotherPetArr.reverse();
            } 
            return{
                ...state,
                pets:anotherPetArr
            }
        case actionTypes.AUTH_START:
            return{
                ...state,
                authLoading: true
            }

        case actionTypes.AUTH_SUCCEED:
            return{
                ...state,
                token:action.token,
                userId: action.userId,
                authLoading: false
            }
        case actionTypes.AUTH_FAILED:
            return{
                ...state,
                authLoading: false,
                authError: action.error.message
            }
        case actionTypes.AUTH_ERR_REMOVED:
            return{
                ...state,
                authError: ''
            }

        default: return state;
    }
};

export default reducer;