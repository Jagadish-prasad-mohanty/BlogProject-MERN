
const initialState={
    currentUserId:null,
    currentToken:null
}

const authReducer= (state=initialState,action)=>{
    switch (action.type){
        case "LOG_IN":
                return {
                 ...state,
                 currentUserId:action.userData.id,
                 currentToken:action.userData.token,

                }
        case "LOG_OUT":
                return {
                    ...state,
                    currentUserId:null,
                    currentToken:null
                }
        default:
            return state;
    }
}

export default authReducer;