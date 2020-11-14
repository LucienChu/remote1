import { getSavedAccessToken } from "./localStorageUtil";
import {
  getDataPointByCityUrl,
  loginUrl,
  lookupUrl,
  updateDataPointUrl,
} from "./urls";

export const API_ERROR_MESSAGES = {
  ACCESS_DENIED: "ACCESS DENIED",
  PAGE_NOT_FOUND: "PAGE NOT FOUND",
  GENERAL_SERVER_ERROR: "SERVER ERROR",
  UNDEFINED_ERROR: "UNDEFINED ERROR",
};

export const irisLogin = async (userName, password) => {
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: userName, password: password }),
  };
  const response = await fetch(loginUrl, parameters);
  const responseJson = await response.json();
  let error;
  if (response.ok) {
    return responseJson;
  } else {
    if (response.status === 401) {
      error = new Error(API_ERROR_MESSAGES.ACCESS_DENIED);
    } else if (response.status === 404) {
      error = new Error(API_ERROR_MESSAGES.PAGE_NOT_FOUND);
    } else if (response.status >= 500) {
      error = new Error(API_ERROR_MESSAGES.GENERAL_SERVER_ERROR);
    } else {
      error = new Error(API_ERROR_MESSAGES.GENERAL_SERVER_ERROR);
    }
  }
  throw error;
};

export const irisLookup = async (accessToken) => {
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(lookupUrl, params);
  const responseJson = await response.json();
  let error;
  if (response.ok) {
    return responseJson;
  } else {
    if (response.status === 401) {
      error = new Error(API_ERROR_MESSAGES.ACCESS_DENIED);
    } else if (response.status === 404) {
      error = new Error(API_ERROR_MESSAGES.PAGE_NOT_FOUND);
    } else if (response.status >= 500) {
      error = new Error(API_ERROR_MESSAGES.GENERAL_SERVER_ERROR);
    } else {
      error = new Error(API_ERROR_MESSAGES.GENERAL_SERVER_ERROR);
    }
  }
  return error;
};

export const getUserCityResources = async (accessToken, cityName) => {
  if (
    cityName !== null &&
    cityName !== undefined &&
    cityName !== "" &&
    accessToken !== null &&
    accessToken !== undefined &&
    accessToken !== ""
  ) {
    const returnedData = await irisLookup(accessToken);
    const citiesObject = returnedData.result.city;
    let foundCityResource = {
      name: "admin",
      province: "admin",
      maplink: "admin",
      logo: "admin",
    };
    for (const key in citiesObject) {
      if (citiesObject.hasOwnProperty(key)) {
        const cityObject = citiesObject[key];
        if (cityObject.name.toLowerCase() === cityName.toLowerCase()) {
          foundCityResource = cityObject;
          break;
        }
      }
    }

    return foundCityResource;
  }
};

// export const getDataByDate = async (
//   cityName,
//   startDate,
//   endDate,
//   latitude,
//   longitude
// ) => {
//   const token = localStorage.getItem(process.env.REACT_APP_IRIS_ACCESS_TOKEN);
//   const url = getUrl(cityName, startDate, endDate, latitude, longitude);
//   const params = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await fetch(url.toString(), params);
//   const data = await response.json();
//   let error;
//   if (response.ok) {
//     const { damage_type, road_issue } = (await irisLookup(token)).result;
//     console.log("damage_type", damage_type);
//     const updatedResult = getConvertedDataPoints(
//       data.results,
//       damage_type,
//       road_issue
//     );
//     console.log(
//       "in [getDataPointsByURL], got data SUCCESSFULLY, number of data points: " +
//         data.results.length
//     );
//     const { previous, next } = data;
//     const previousHTTPSUrl = getHTTPSUrl(previous);
//     const nextHTTPSUrl = getHTTPSUrl(next);
//     console.log("nextHTTPSUrl", nextHTTPSUrl);
//     const updatedData = {
//       ...data,
//       results: updatedResult,
//       previous: previousHTTPSUrl,
//       next: nextHTTPSUrl,
//     };
//     console.log("returning updated data", updatedData);
//     return updatedData;
//   } else {
//     if (response.status === 401) {
//       error = new Error("access_denied_error_message");
//     } else if (response.status === 404) {
//       error = new Error("page_not_found_error_message");
//     } else if (response.status >= 500) {
//       error = new Error("server_error_message");
//     } else {
//       error = new Error("general_error_message");
//     }
//   }
//   return error;
// };

const getHTTPSUrl = (url) => {
  if (url === null || url === undefined) {
    return null;
  }
  const httpsUrl = "https://" + url.split("://")[1];
  return httpsUrl;
};

const getUrl = (cityName, startDate, endDate, latitude, longitude) => {
  const url = new URL(getDataPointByCityUrl);

  /*================================================== prepare serach params for date ================================================== */
  // get default date string, as require, should be yesterday of the current date
  const yesterday = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
  const yesterDateDateString = `${yesterday.getFullYear()}-${
    yesterday.getMonth() + 1
  }-${yesterday.getDate()}`;

  const startDateString = isValidObj(startDate)
    ? getDateString(startDate)
    : yesterDateDateString;
  const endDateString = isValidObj(endDate)
    ? getDateString(endDate)
    : yesterDateDateString;

  url.searchParams.append("date_before", endDateString);
  url.searchParams.append("date_after", startDateString);
  // given url is not root url

  /*================================================== prepare search param for city name ================================================== */
  // if city name is defined, any is not "" and is not default city name
  if (
    cityName !== null &&
    cityName !== undefined &&
    cityName !== ""
    // &&
    // cityName !== process.env.REACT_APP_DEFAULT_CITY_NAME
  ) {
    url.searchParams.append("current_city", cityName);
  }

  if (longitude && latitude) {
    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
  }

  const urlStringValue = url.toString();
  console.log("urlStringValue", urlStringValue);
  return urlStringValue;
};

// const getConvertedDataPoints = (
//   dataPoints,
//   damageTypeObject,
//   roadIssueObject
// ) => {
//   const cd = dataPoints.map((data) =>
//     convertData(data, damageTypeObject, roadIssueObject)
//   );
//   return cd;
// };

const getDateString = (date) => {
  if (
    isValidObj(date) &&
    new Date(date).toString().toLowerCase() !== "invalid data"
  ) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return "";
};

/**
 *
 * @description update a data point to server
 *
 * @param {Number} id data point id
 * @param {Object} updateData key-value paris to be uploaded to server
 * @returns {Promise}
 */
export const updateData = (id, updateData) => {
  return new Promise(async (resolve, reject) => {
    const accessToken = getSavedAccessToken();

    console.log("[updateData]", updateData);
    const updateFormData = getFormData(updateData);
    const response = await fetch(`${updateDataPointUrl}/${id}/`, {
      method: "POST",
      body: updateFormData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      if (response.status === 401) {
        reject(new Error("ACCESS DENIED"));
      }
    } else {
      resolve(true);
    }
  });
};

/**
 * @summary transfer a regular object into a FormData object
 *
 * @param {Object} object
 *
 * @returns FormData object
 */
const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    const values = object[key];
    if (Array.isArray(values)) {
      for (const value of values) {
        formData.append(key, value);
      }
    } else {
      formData.append(key, object[key]);
    }
  });
  for (var pair of formData.entries()) {
    console.log("checking form data: " + pair[0] + ", " + pair[1]);
  }
  return formData;
};

export const getDataById = async (accessToken, id) => {
  let url = new URL(updateDataPointUrl);
  url.searchParams.append("id", id);
  debugger;
  const options = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  debugger;
  const response = await fetch(url.toString(), options);
  const responseJson = await response.json();
  let error;
  debugger;
  if (response.ok) {
    return responseJson;
  } else {
    if (response.status === 401) {
      error = new Error(API_ERROR_MESSAGES.ACCESS_DENIED);
    } else if (response.status === 404) {
      error = new Error(API_ERROR_MESSAGES.PAGE_NOT_FOUND);
    } else if (response.status >= 500) {
      error = new Error(API_ERROR_MESSAGES.GENERAL_SERVER_ERROR);
    } else {
      error = new Error(API_ERROR_MESSAGES.UNDEFINED_ERROR);
    }
  }
  throw error;
};

// export const getDataById = async (accessToken, id) => {
//     var myHeaders = new Headers();
//     myHeaders.append(
//         "Authorization",
//         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzNTg4MTMzNywianRpIjoiMTYyYzYyZjlhMTk1NDY5Mzg2ODI4Yjc4N2QyN2JjYmUiLCJ1c2VyX2lkIjoyNH0.yrs2nX5MnX6QChN9gbfeFm9Wd4ETqE9bucxJRaJTjs8"
//     );
//     myHeaders.append("Content-Type", "application/json");

//     var requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//     };

//     const response = await fetch(
//         "https://post.api.irisradgroup.com/api/datapoint?id=421235",
//         requestOptions
//     );
//     const responseJson = await response.json();
//     let error;
//     debugger;
//     if (response.ok) {
//         return responseJson;
//     } else {
//         if (response.status === 401) {
//             error = new Error(API_ERROR_MESSAGES.ACCESS_DENIED);
//         } else if (response.status === 404) {
//             error = new Error(API_ERROR_MESSAGES.PAGE_NOT_FOUND);
//         } else if (response.status >= 500) {
//             error = new Error(API_ERROR_MESSAGES.GENERAL_SERVER_ERROR);
//         } else {
//             error = new Error(API_ERROR_MESSAGES.UNDEFINED_ERROR);
//         }
//     }
//     throw error;
// };

export function isValidObj(obj) {
  return obj !== null && obj !== undefined;
}

// export function convertData(data, damageTypesArray, roadIssuesArray) {
//   // arcgis prefer strings instead of numbers
//   // when it create attributes for data
//   const idString = data.id.toString();
//   const latString = data.latitude.toString();
//   const longString = data.longitude.toString();

//   const damageTypeString = getNamesFromObjects(
//     data,
//     LAYER_FILTER_TYPES.MMS.keyName,
//     damageTypesArray,
//     "name"
//   );
//   // console.log("damageTypeString", damageTypeString);
//   const roadRelatedIssueString = getNamesFromObjects(
//     data,
//     LAYER_FILTER_TYPES.RRI.keyName,
//     roadIssuesArray,
//     "issue"
//   );
//   return {
//     ...data,
//     id: idString,
//     latitude: latString,
//     longitude: longString,
//     [LAYER_FILTER_TYPES.RRI.keyName]: roadRelatedIssueString,
//     [LAYER_FILTER_TYPES.MMS.keyName]: damageTypeString,
//   };
// }
