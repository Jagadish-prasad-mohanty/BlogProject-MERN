
const initialState={
    currentUserId:null,
    users : [
        {
          id: 'u1',
          name: 'Max Schwarz',
          email:"maxm@gmail.com",
          password:"123456",
          image:
            'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          places: 3
        },
        {
          id: 'u2',
          name: 'Jagadish',
          email:"mohantyjagadish123@gmail.com",
          password:"123456",
          image:
            'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          places: 3
        }
      ]
}

const authReducer= (state=initialState,action)=>{
    switch (action.type){
        case "LOG_IN":
                return {
                 ...state,
                 currentUserId:action.userData.id
                }
        case "SIGN_UP":
            console.log("SignUp",action.userData)
            const updatedUsers=[...state.users];
            updatedUsers.push(action.userData);
            return {
                ...state,
                users:updatedUsers
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