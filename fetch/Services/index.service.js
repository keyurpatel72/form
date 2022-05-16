module.exports = {
    Auth : require('./auth.sevices'),
    Roles :require('./roles.service'),
    Privileges : require('./privileges.service'),
    CategoriesService : require("./categories.service"),
    RatesService : require('./rates.service'),
    DashboardService : require('./dashbaord.service'),
    CompanyService: require('./company.service'),
    CountryService: require('./country.service'),
    BlockedVehicleService: require('./blockedVehicles.service')
}