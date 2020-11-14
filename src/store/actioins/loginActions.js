import { irisLogin, irisLookup } from "../../utils/backendUtils";
import {
  clearLocalStorage,
  saveUserLocally,
} from "../../utils/localStorageUtil";
import { loginActions } from "../reducers/loginReducer";
const TAG = "loginActions.js";
export const loginStarted = () => ({
  type: loginActions.loginStarted,
  payload: true,
});
export const loginSucceeded = (userData) => ({
  type: loginActions.loginSucceeded,
  payload: userData,
});
export const loginFailed = (error) => ({
  type: loginActions.loginFailed,
  payload: error,
});
export const loginReset = () => ({ type: loginActions.loginReset });

export const startLogin = (userName, password, accessToken = "") => {
  return async (dispatch) => {
    let token = accessToken;
    let refresh;
    dispatch(loginStarted());
    try {
      if (token === "") {
        const data = await irisLogin(userName, password);
        token = data.access;
        refresh = data.refresh;
      }
      const lookupResult = await irisLookup(token);
      let foundUser = lookupResult.result.user.find(
        (user) => user.username === userName
      );

      // find user's city from user group
      let userCityName = foundUser.groups[0].name;

      // find city object from look up table
      const cityKey = Object.keys(lookupResult.result.city).find(
        (key) => lookupResult.result.city[key].name === userCityName
      );
      const userCityObj = lookupResult.result.city[cityKey];

      foundUser = Object.assign(foundUser, { city: userCityObj });
      foundUser.access = token;
      foundUser.refresh = refresh;

      // save mms and rri to store
      const mms = lookupResult.result.damage_type
        .map((type) => type.name)
        .sort();
      const rri = lookupResult.result.road_issue
        .map((issue) => issue.issue)
        .sort();

      //   dispatch(setAallMMS(mms));
      //   dispatch(setAllRRI(rri));

      saveUserLocally(userName, foundUser);
      // save user data to store
      dispatch(loginSucceeded(foundUser));
    } catch (error) {
      console.log(TAG, "error.message", error.message);
      clearLocalStorage();
      if (token !== "") {
        console.log(TAG, "in error blog dispatching session expired: ");
        dispatch(
          loginFailed({
            title: "Session expired",
            message: "Your session has been expired, please login again",
          })
        );
      } else {
        dispatch(
          loginFailed({
            title: "Login error",
            message: "Please check your network, user name and password",
          })
        );
      }
    }
  };
};
