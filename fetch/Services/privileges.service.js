const apiService = require('./api.service')

class PrivilegesService {
    addPrivilege = async (data) => {
        let url = '/privileges'
        return await apiService.dataPostApi(data, url);
        
    }
    fetchPrivileges = async () => {
        let url = '/privileges'
        return await apiService.dataGetApi(url)
    }
    fetchPrivilege = async (id) => {
        let url = `/privileges/${id}`
        return await apiService.dataGetApi(url);
    };
    updatePrivilege = async (data, id) => {
        let url = `/privileges/${id}`
        return await apiService.dataPatchApi(data, url);
    }
    deletePrivilege = async (id) => {
        let url = `/privileges/${id}`
        return await apiService.dataDeleteApi(url);
    }
}

module.exports = new PrivilegesService();