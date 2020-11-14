const postUrl = new URL("https://post.api.irisradgroup.com");

const loginUrl = `${postUrl}api/token/`;
const lookupUrl = `${postUrl}api/lookup/v1/`;
const getDataPointByCityUrl = `${postUrl}api/datapoint/`;
const getDistanceReport = `${postUrl}api/report/distance/`;
const getViewReport = `${postUrl}api/report/view/`;
const postDataPointUrl = `${postUrl}api/geo_info/`;
const updateDataPointUrl = `${postUrl}api/datapoint`;

const postDataPointBoundingBoxesUrl = `${postUrl}api/add_label/`;
const updateDataPointBoundingBoxUrl = `${postUrl}api/label`;
export {
  loginUrl,
  lookupUrl,
  getDataPointByCityUrl,
  postDataPointUrl,
  updateDataPointUrl,
  getDistanceReport,
  getViewReport,
  postDataPointBoundingBoxesUrl,
  updateDataPointBoundingBoxUrl,
};
