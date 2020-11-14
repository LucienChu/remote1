export const localStorageKeys = {
  USER_NAME: "userName",
  PASSWORD: "password",
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  TOKEN_LIFE_SPAN: "tokenLifeSpan",
};

export const clearLocalStorage = () => {
  const userName = localStorage.getItem(localStorageKeys.USER_NAME);
  localStorage.clear();
  localStorage.setItem(localStorageKeys.USER_NAME, userName);
};

const getLocalPreference = (userName, storageKey, allMMS, allRRI) => {
  const updatedReference = null;
  const preferenceString = localStorage.getItem(storageKey);

  console.log("preferenceString", preferenceString);
  if (
    preferenceString === null ||
    preferenceString === undefined ||
    preferenceString === "undefined" ||
    preferenceString === "null"
  ) {
    return updatedReference;
  }

  const preferenceObject = JSON.parse(preferenceString);
  const userPreference = preferenceObject[userName];
  if (userPreference === undefined) {
    return updatedReference;
  }
  const userPreferredMMS = userPreference.mms;
  const userPreferredRRI = userPreference.rri;

  let updatedMMS = [];
  let updatedRRI = [];
  if (userPreferredMMS && userPreferredMMS.length) {
    for (const element of userPreferredMMS) {
      if (allMMS.indexOf(element) > -1) {
        updatedMMS.push(element);
      }
    }
  } else {
    updatedMMS = [updatedMMS];
  }
  if (userPreferredRRI && userPreferredRRI.length) {
    for (const element of userPreferredRRI) {
      if (allRRI.indexOf(element) > -1) {
        updatedRRI.push(element);
      }
    }
  } else {
    updatedRRI = [updatedRRI];
  }
  return { mms: updatedMMS, rri: updatedRRI };
};

export const saveUserLocally = (userName, data) => {
  localStorage.setItem(localStorageKeys.USER_NAME, userName);
  localStorage.setItem(localStorageKeys.TOKEN, data.access);
  localStorage.setItem(localStorageKeys.REFRESH_TOKEN, data.refresh);
};

export const getSavedAccessToken = () => {
  return localStorage.getItem(localStorageKeys.TOKEN);
};

/**
 * @summary get saved user name and access token from local storage if there is any
 */
export const getLocalIrisUser = () => {
  const userName = localStorage.getItem(localStorageKeys.USER_NAME);
  const accessToken = localStorage.getItem(localStorageKeys.TOKEN);
  return { userName, accessToken };
};
