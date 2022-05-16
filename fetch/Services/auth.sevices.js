const apiService = require('./api.service')

class AuthService {
    auth = async (data) => {
        let url = '/auth/login'
        return await apiService.dataPostApi(data, url);
    }
    fetchprofile = async () => {
        let url = '/profile'
        return await apiService.dataGetApi(url);
    }
    updateProfile = async (data) => {
        let url = '/profile'
        return await apiService.dataPatchApi(data, url);
    };
    changePassword = async (data) => {
        let url = "/change-password"
        return await apiService.dataPatchApi(data, url);
    };
    forgotPassword = async (data) => {
        let url = "/forgot-password"
        return await apiService.dataPostApi(data, url);
    };
    verifyOtp = async (data) => {
        let url = "/verify-otp"
        return await apiService.dataPostApi(data, url);
    };
    resetPassword = async (data, id) => {
        let url = `/reset-password/${id}`
        return await apiService.dataPatchApi(data, url);
    };
}

module.exports = new AuthService();