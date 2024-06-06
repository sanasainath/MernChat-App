import {userSignUpConstant} from '../action/constant';


// Initial state for the signup process
const initialSignupState = {
  loading: false,
  error: null,
  success: false,
  userdata:null,
};

// Reducer function for the signup process
const signupReducer = (state = initialSignupState, action) => {
  switch (action.type) {
    case userSignUpConstant.SignUp_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      
      };
    case userSignUpConstant.SignUp_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userdata:action.payload
      };
    case userSignUpConstant.SignUp_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
   
      };

    default:
      return state;
  }
};

export default signupReducer;
