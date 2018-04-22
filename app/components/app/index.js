// var state=require("./appstate").state;
// var $ = require("jquery");
// var appHtml=require("./components/app/app.html");
module.exports = function (app) {

  app.component("title", {
    template: `{{$ctrl.title}}`,
    controller: ['global', function (global) {
      this.title=global.state.title;
    }]
  })
  app.component("app", {
    template: require("./app.html"),
    controller: ['global', function (global) {
      var me = this;
      // me.login=false;
      console.log("app start");
      this.$onInit = () => {
        me.showNav = global.state.showNav;
      
       
        global.on("change", (state) => {
          me.login=state.login;
          // me.username=state.username;

          me.showNav = state.showNav;

        });
      }
      // global.title = "xxx";

    }],
  })




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