const apiService = require('./api.service')

class BlockedVehicleService {

    getAllBlockedVehicles = async () => {
        let url = '/getAllBlockedVehicles'
        return await apiService.dataGetApi(url)
    }

    deleteBlockedVehicle = async (id) => {
        let url = `/deleteBlockedVehicle/${id}`
        return await apiService.dataDeleteApi(url);
    }

    addBlockedVehicle = async (data) => {
        let url = '/addBlockedVehicle'
        return await apiService.dataPostApi(data, url);

    }
    
}

module.exports = new BlockedVehicleService();