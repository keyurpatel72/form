const apiService = require('./api.service')

class CategoriesService {
    addCategory = async (data) => {
        let url = '/categories'
        return await apiService.dataPostApi(data, url);
        
    }
    fetchCategories= async () => {
        let url = '/categories'
        return await apiService.dataGetApi(url);
    }
    fetchCategory = async (id) => {
        let url = `/categories/${id}`
        return await apiService.dataGetApi(url);
    };
    updateCategory = async (data, id) => {
        let url = `/categories/${id}`
        return await apiService.dataPatchApi(data, url);
    }
    deleteCategory = async (id) => {
        let url = `/categories/${id}`
        return await apiService.dataDeleteApi(url);
    }
}

module.exports = new CategoriesService();