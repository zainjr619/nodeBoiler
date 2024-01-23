/* eslint-disable no-use-before-define */
const FormData = require('form-data');
// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require('axios').default;
const fetch = require('node-fetch');
const http = require('http');
const https = require('https');
const logger = require('./logger');

const httpAgent = (parsedUrl) => {
  const options = {
    keepAlive: true,
  };

  if (parsedUrl && parsedUrl.protocol === 'https:') {
    return new https.Agent(options);
  }

  return new http.Agent(options);
};

/**
 * post request
 * @param reqBody
 * @param apiUrl
 * @param headers
 * @returns {Promise<*>}
 */
const postRequest = async (reqBody, apiUrl, headers = {}) => {
  logger.info(`POST: Remote api call: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'post',
    body: JSON.stringify(reqBody),
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...headers,
    },
    agent: httpAgent,
  });

  return responseParseAsJson(apiUrl, response);
};
const patchRequest = async (reqBody, apiUrl, headers = {}) => {
  logger.info(`PATCH: Remote api call: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'patch',
    body: JSON.stringify(reqBody),
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...headers,
    },
    agent: httpAgent,
  });
  return responseParseAsJson(apiUrl, response);
};
/**
 * put request
 * @param reqBody
 * @param apiUrl
 * @param headers
 * @returns {Promise<*>}
 */
const putRequest = async (reqBody, apiUrl, headers = {}) => {
  logger.info(`PUT: Remote api call: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'put',
    body: JSON.stringify(reqBody),
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...headers,
    },
    agent: httpAgent,
  });

  return responseParseAsJson(apiUrl, response);
};
/**
 * get request
 * @param apiUrl
 * @param headers
 * @returns {Promise<*>}
 */
const getRequest = async (apiUrl, headers = {}) => {
  logger.info(`GET: Remote api call: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'get',
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...headers,
    },
    agent: httpAgent,
  });

  return responseParseAsJson(apiUrl, response);
};

const getRequestPagination = async (apiUrl, headers = {}, query = {}) => {
  logger.info(`GET: Remote api call: ${apiUrl}`);
  apiUrl = apiUrl + '?' + new URLSearchParams(query)
  const response = await fetch(apiUrl, {
    method: 'get',
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...headers,
    },
    agent: httpAgent,
  });
  return responseParseAsJson(apiUrl, response);
};

/**
 * parse response json and handle error
 * @param apiUrl
 * @param response
 * @returns {null|*}
 */
const responseParseAsJson = async (apiUrl, response) => {
  try {
    return {
      response: await response.json(),
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    logger.log(
      'error',
      `Error occurred, apiUrl: ${apiUrl}, apiStatus: ${response.statusText}`,
      { headers: response.headers.raw(), error: error.stack },
    );
  }

  return null;
};

const postRequestSlack = async (reqBody, apiUrl, headers = {}) => {
  logger.info(`POST: Remote api call: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'post',
    body: JSON.stringify(reqBody),
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...headers,
    },
    agent: httpAgent,
  });

  return response.text();
};

const postActiveCampaign = async (reqBody, apiUrl) => {
  logger.info(`POST: Remote api call: ${apiUrl}`);
  logger.info(JSON.stringify(reqBody));
  const data = new FormData();
  Object.entries(reqBody).forEach(([key, value]) => {
    data.append(key, value);
  });
  const response = await axios.post(apiUrl, data, { headers: data.getHeaders() });
  return response.data;
};

const getActiveCampaign = async (apiUrl) => {
  logger.info(`GET: Remote api call: ${apiUrl}`);
  const response = await axios.get(apiUrl);
  return response.data;
};

const getRequestReddit = async (apiUrl) => {
  logger.info(`GET: Remote api call: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'get',
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      'User-Agent': 'reddit-new-post-notifier',
    },
    agent: httpAgent,
  });
  return response.text();
};

const postAdjustRevenue = async (apiUrl) => {
  logger.info(`POST: Remote api call: ${apiUrl}`);
  const response = await fetch(apiUrl, {
    method: 'post',
    compress: true,
    agent: httpAgent,
  });
  return responseParseAsJson(apiUrl, response);
};
const deleteRequest = async (reqBody, apiUrl, headers = {}) => {
  const response = await fetch(apiUrl, {
    method: 'delete',
    body: JSON.stringify(reqBody),
    compress: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...headers,
    },
    agent: httpAgent,
  });

  return { status: response.status, responseData: await responseParseAsJson(apiUrl, response) };
};
module.exports = {
  postRequest,
  getRequest,
  getRequestPagination,
  postRequestSlack,
  postActiveCampaign,
  getActiveCampaign,
  getRequestReddit,
  putRequest,
  postAdjustRevenue,
  patchRequest,
  deleteRequest,
};
