
import { backendUrl } from '../helpers/axios';
import {logOutConstant, userLoginConstant, userSignUpConstant} from './constant';

export const SignUp = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userSignUpConstant.SignUp_REQUEST });
      console.log('Signup request dispatched:', ...user);
      
      const res = await backendUrl.post('/signup', user,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("this is the response man fromf rontend0",res);

      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem('tokenauth', JSON.stringify(res.data.token));
        dispatch({ type: userSignUpConstant.SignUp_SUCCESS, payload: res.data.user});
      } else {
        dispatch({
          type: userSignUpConstant.SignUp_FAILED,
          payload: { error: res.data.error }
        });
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      dispatch({
        type: userSignUpConstant.SignUp_FAILED,
        payload: { error: 'An error occurred during login' }
      });
    }
  };
};

export const login = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userLoginConstant.Login_REQUEST});
      console.log('Login request dispatched:', values);
      
      const res = await backendUrl.post('/signin', values);
      console.log("this is the response man fromf rontend0",res);
      // console.log("res data posssible ",res.data);
      
      if (res.status >= 200 && res.status < 300) {
        const {token}=res.data;
        // console.log("structure token checking",token);
        localStorage.setItem('tokenauth', JSON.stringify(token));
        dispatch({ type: userLoginConstant.Login_SUCCESS, payload: {token}});
      } else {
        dispatch({
          type:userLoginConstant.Login_FAILED,
          payload: { error: res.data.error }
        });
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      dispatch({
        type: userLoginConstant.Login_FAILED,
        payload: { error: 'An error occurred during login' }
      });
    }
  };
};
export const LogOut=()=>{

  return (dispatch)=>{
    localStorage.removeItem('tokenauth');
    localStorage.removeItem('userData');
    localStorage.clear();
    dispatch({
      type:logOutConstant.LogOut_SUCCESS,
    })
  }
}