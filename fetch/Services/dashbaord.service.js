const apiService = require('./api.service')

class DashboardService {

    fetchDashboards = async () => {
        let url = '/dashboard'
        return await apiService.dataGetApi(url);
    }
}

module.exports = new DashboardService();