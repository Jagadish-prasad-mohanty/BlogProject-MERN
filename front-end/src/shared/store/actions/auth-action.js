export const LOG_IN="LOG_IN";
export const SIGN_UP="SIGN_UP";
export const LOG_OUT="LOG_OUT";

export const logInHandler= (userData)=>{
    return {type:LOG_IN,userData:userData}
}
export const signUpHandler= (user)=>{
    return {type:SIGN_UP,userData:user}
}
export const logOutHandler= ()=>{
    localStorage.removeItem('userData');
    return {type:LOG_OUT}
}