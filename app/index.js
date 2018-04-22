// require()
require("bootstrap/dist/css/bootstrap.min.css");
require("font-awesome/css/font-awesome.min.css");
require("./../style.scss");
require("angular/angular.min.js");
require("angular-route/angular-route.min.js");
// require("@angular/router/angular1/angular_1_router.js");
require("bootstrap/dist/js/bootstrap.bundle.min.js");
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
    require('./components/home'),
    require('./components/login'),
   
].map(fn => fn(app));

app.run(['$rootScope','global','$location',function($rootScope,global,$location) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        // handle route changes     
        // console.log(next)
        var isLogin=next.indexOf("/login")!=-1;
        if (!global.state.user.name) {
            if (!isLogin) {
                // if (!localStorage["ret"]) {
                //     localStorage["ret"]=current;
                // }
                // debugger;
                event.preventDefault();
                $location.path("/login");
                return;
            }
            
        }
        // global.setState({login:isLogin});
        // console.log("init check user login")
    });
}]);

//$(function () {
angular.bootstrap(document, [app.name])
//})
// console.log(app);
