const axios = require('axios');
let Util = require('../util/index')

// You can create a new instance of axios with a custom config.
const instance = axios.create({
    baseURL: process.env.PRODUCTION ? process.env.PRODUCTIONAPIURL :process.env.STAGINGAPIURL,
    timeout: 1000,
    headers: {
        'X-Custom-Header': `4GPy5TY4ysChKjxX`,
        'Authorization':``
    }
  });
//   You can intercept requests or responses before they are handled by then or catch.

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(Util.cookie.getToken()) {
      config['headers']['Authorization'] = Util.cookie.getToken();
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  module.exports = instance;  