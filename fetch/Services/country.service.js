const apiService = require('./api.service')

class CountryService {
    
    getAllCountries = async () => {
        let url = '/getAllCountries'
        return await apiService.dataGetApi(url)
    }

    getStatesBasedOnCountry = async (id) => {
        let url = `/getStatesBasedOnCountry/${id}`
        return await apiService.dataGetApi(url)
    }

    getCitiesBasedOnCountryState = async (countryId, stateId) => {
        let url = `/getCitiesBasedOnCountryState/${countryId}/${stateId}`
        return await apiService.dataGetApi(url)
    }

    getAllTimezones = async () => {
        let url = '/getAllTimezones'
        return await apiService.dataGetApi(url)
    }

    getAllCurrencies = async () => {
        let url = '/getAllCurrencies'
        return await apiService.dataGetApi(url)
    }
}

module.exports = new CountryService();