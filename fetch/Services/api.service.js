const axios = require('../Interceptors/Interceptors');

class ApiService {
    dataPostApi = async (data, url) => {
        return await axios.post(url, data);
    }
    dataGetApi = async (url) => {
        return await axios.get(url);
    };
    dataPatchApi = async (data, url) => {
        return await axios.patch(url, data);
    };
    dataDeleteApi = async (url) => {
        return await axios.delete(url);
    };
}

module.exports = new ApiService();