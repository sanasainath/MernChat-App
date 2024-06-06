// tokenReducer.js
import { userLoginConstant,logOutConstant } from "../action/constant";

const initialState = {
  token: null,
  error: null,
  success:false
};

const tokenLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userLoginConstant.Login_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        success:true,
        error: null,
      };
    case userLoginConstant.Login_FAILED:
      return {
        ...state,
        token: null,
        error: action.payload.error,
      };
      case logOutConstant.LogOut_SUCCESS: // Add this case
      return {
        ...state,
        success: false, // Set success to false when logging out
      };
    default:
      return state;
  }
};

export default tokenLoginReducer;
