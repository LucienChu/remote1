export const loginActions = {
  loginStarted: "LOGIN_STARTED",
  loginSucceeded: "LOGIN_SUCCEEDED",
  loginFailed: "LOGIN_FAILED",
  loginReset: "LOGIN_RESET",
};

const initialState = {
  userData: null,
  error: null,
  isLoading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginActions.loginStarted:
      return { ...state, isLoading: action.payload };

    case loginActions.loginSucceeded:
      return { ...state, isLoading: false, userData: action.payload };

    case loginActions.loginFailed:
      return { ...state, isLoading: false, error: action.payload };

    case loginActions.loginReset:
      return { ...initialState };

    default:
      return state;
  }
};
export default loginReducer;
