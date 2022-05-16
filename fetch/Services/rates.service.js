const apiService = require('./api.service')

class RatesService {
    createRate = async (data) => {
        let url = '/createRate'
        return await apiService.dataPostApi(data, url);
         
    }
    getAllRates = async () => {
        let url = '/getAllRates'
        return await apiService.dataGetApi(url)
         
    }
    getRateDetails = async (id) => {
        let url = `/getRateDetails/${id}`
        return await apiService.dataGetApi(url);
    };
    updateRate = async (data, id) => {
        let url = `/updateRate/${id}`
        return await apiService.dataPatchApi(data, url);
    }
    deleteRate = async (id) => {
        let url = `/deleteRate/${id}`
        return await apiService.dataDeleteApi(url);
    }
}

module.exports = new RatesService();