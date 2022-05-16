const apiService = require('./api.service')

class CompanyService {
    addCompany = async (data) => {
        let url = '/createCompany'
        return await apiService.dataPostApi(data, url);
        
    }
    fetchCompanies = async () => {
        let url = '/getAllCompanies'
        return await apiService.dataGetApi(url)
        
    }
    fetchActiveCompanies = async () => {
        let url = '/getAllActiveCompanies'
        return await apiService.dataGetApi(url)

    }
    fetchCompany = async (id) => {
        let url = `/getCompanyDetails/${id}`
        return await apiService.dataGetApi(url);
    };
    updateCompany = async (data, id) => {
        let url = `/updateCompany/${id}`
        return await apiService.dataPatchApi(data, url);
    }
    deleteCompany = async (id) => {
        let url = `/deleteCompany/${id}`
        return await apiService.dataDeleteApi(url);
    }
}

module.exports = new CompanyService();