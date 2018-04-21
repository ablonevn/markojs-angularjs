module.exports = function (app) {

    app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(true);
        // debugger;
        $routeProvider.when('/', {
            template: '<home/>'
        }).when('/a', {
            template: '<test/>'
        });
    }]);
}