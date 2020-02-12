import * as actionTypes from './actions/actionTypes';

const initialState = {
    pets: null,
    speciesList: ["Cat","Dog","Rodent"],
    token: null,
    userId:null,
    authLoading: false,
    authError : '',
    newPetLoading: false,
    newPerError: '',
    userPets: null,
    needToFetch: true
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.STORE_PETS:
            return{
                ...state,
                pets:action.newPets,
                needToFetch:true,
            }

        case actionTypes.LOCAL_PET_REMOVAL:
            const newPetArr = JSON.parse(JSON.stringify(state.pets));
            const newUserPetArr = JSON.parse(JSON.stringify(state.userPets));
            const globalPetPosition = newPetArr.findIndex(el => el.id === action.petId);
            const userPetPosition = newUserPetArr.findIndex(el => el.id === action.petId);
            newPetArr.splice(globalPetPosition,1);
            newUserPetArr.splice(userPetPosition,1);
            return{
                ...state,
                pets:newPetArr,
                userPets: newUserPetArr
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
        case actionTypes.LIKE_PET_UPDATE:
            let whichPet = state.pets.findIndex(el => el.id === action.id);
            const petArray = JSON.parse(JSON.stringify(state.pets));
            petArray[whichPet] = action.newPetSpec;

            return{
                ...state,
                pets: petArray
                
            }
        
        case actionTypes.ADD_NEW_PET_START:
            return{
                ...state,
                newPetLoading: true
            }
        case actionTypes.ADD_NEW_PET_SUCCEED:
            return{
                ...state,
                newPetLoading: false,
                needToFetch: true,
            }
        case actionTypes.ADD_NEW_PET_FAILED:
            return{
                ...state,
                newPetLoading: false,
                newPerError: action.error
                
            }
        case actionTypes.FETCH_USER_PETS:
            return{
                ...state,
                userPets:action.pets,
                needToFetch: false,
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
                authLoading: false,
                needToFetch: true
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
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token: null,
                userId: null,
                userPets: null,
                needToFetch: true
            }

        default: return state;
    }
};

export default reducer;