
const initialState={
    currentUserId:null,
}

const authReducer= (state=initialState,action)=>{
    switch (action.type){
        case "LOG_IN":
                return {
                 ...state,
                 currentUserId:action.userData.id
                }
        case "LOG_OUT":
                return {
                    ...state,
                    currentUserId:null
                }
        default:
            return state;
    }
}

export default authReducer;