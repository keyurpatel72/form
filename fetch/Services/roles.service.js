const apiService = require('./api.service')

class RolesService {
    addRole = async (data) => {
        let url = '/roles'
        return await apiService.dataPostApi(data, url);
        
    }
    fetchRoles = async () => {
        let url = '/roles'
        return await apiService.dataGetApi(url)
        
    }
    fetchRole = async (id) => {
        let url = `/roles/${id}`
        return await apiService.dataGetApi(url);
    };
    updateRole = async (data, id) => {
        let url = `/roles/${id}`
        return await apiService.dataPatchApi(data, url);
    }
    deleteRole = async (id) => {
        let url = `/roles/${id}`
        return await apiService.dataDeleteApi(url);
    }
}

module.exports = new RolesService();