// reducers/auth.js

import { logOutConstant, userLoginConstant } from "../action/constant";

const initialState = {
    isLogout: false,
    // Other authentication-related state
  };
  
  const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case logOutConstant.LogOut_SUCCESS:
        return {
          ...state,
          isLogout: true,
          // Reset other authentication-related state
        };
        case userLoginConstant.Login_SUCCESS:
          return{
            ...state,
            isLogout:false,
          }
      // Other reducer case
      default:
        return state;
    }
  };
  
  export default logoutReducer;
  