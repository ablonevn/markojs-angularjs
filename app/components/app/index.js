
// var state=require("./appstate").state;
// var $ = require("jquery");
// var appHtml=require("./components/app/app.html");
module.exports = function (app) {


    app.component("app", {
        template: require("./app.html"),
        controller: ['global', function (global) {

            // global.title = "xxx";

        }],
    })
    
    


    app.component("home", {
        template: `<h1 ng-click="$ctrl.print()">Home component</h1><br><br><br><br><br><br><br><h2>test</h2>`,
        // bindings: { $router: '<' },
        controller: ['$http', function ($http) {
            var ctrl = this;
            ctrl.print = function () {
                var a = ctrl.$route;
                // debugger;
                console.log($http);

            }

        }]


    });
    app.component("test", {
        template: `<h1>Test</h1>`,
        // bindings: { $router: '<' },
        controller: ['$http', function ($http) {
            var ctrl = this;
            ctrl.print = function () {
                var a = ctrl.$route;
                // debugger;
                console.log($http);

            }

        }]


    });

}