// var state=require("./appstate").state;
// var $ = require("jquery");
// var appHtml=require("./components/app/app.html");
module.exports = function (app) {

  
    app.component("home", {
      template: require("./index.html"),
      // bindings: { $router: '<' },
      controller: ['$http', '$q', 'global', function ($http, $q, global) {
        var me = this;
        this.$onInit = () => {
          $http.get("/api/contract").then((r) => {
            me.data=r.data;
            console.log(r);
          })
        }
        this.$onDestroy = () => {
            console.log("home destroy");
        }

  
  
      }]
  
  
    });
   
  
  }