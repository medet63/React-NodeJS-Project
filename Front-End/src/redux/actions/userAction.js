import axios from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstans"

export const signinAction = (email,password) => async(dispatch) => {
    
    dispatch(
        { type: USER_SIGNIN_REQUEST, payload: { email, password } })
    try {
        const { data } = await axios.post(`http://localhost:5000/api/users/signin`, { email, password });
        dispatch(
           { type: USER_SIGNIN_SUCCESS, payload: data}
        )
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
        
            type: USER_SIGNIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
        
   
}
export const signOut = () => async (dispatch) => {
    
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    dispatch({type:USER_SIGNOUT})
}