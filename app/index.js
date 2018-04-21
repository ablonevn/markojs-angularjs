// require()
require("angular");
require("angular-route");
// require("@angular/router/angular1/angular_1_router.js");
require("../node_modules/bootstrap/dist/js/bootstrap.bundle.js");
var app = angular.module("app", [
    'ngRoute'
    // ,'ngComponentRouter'
]);
// app.value('$routerRootComponent', 'app');
// require("./templates");
[
    require('./appstate'),
    require('./routes'),
    require('./components/app'),
    require('./components/side-bar'),
    require('./components/header-bar'),
   
].map(fn => fn(app));

//$(function () {
angular.bootstrap(document, [app.name])
//})
// console.log(app);
