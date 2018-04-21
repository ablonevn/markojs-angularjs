
// var state=require("./appstate").state;
// var $ = require("jquery");
// var appHtml=require("./components/app/app.html");
module.exports = function (app) {


    
    app.component("headerBar", {
        template: require("./index.html"),
        controller: ['$http','$location', 'global', function ($http,$location, global) {
            var ctrl = this;
            
            ctrl.title = global.state.title;
            ctrl.print =  ()=> {
                console.log("cham",$http); 
                $location.path("/a");

            }
            this.$onInit = function () {
                console.log("on init");
              };
            this.$onDestroy=()=>{
                console.log("destroy");
            }
            
            

        }],
        


    });



}