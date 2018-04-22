// var state=require("./appstate").state;
// var $ = require("jquery");
// var appHtml=require("./components/app/app.html");
// var state=require("../../appstate");
module.exports = function (app) {



    app.component("headerBar", {
        template: require("./index.html"),
        controller: ['$http', '$location', 'global', function ($http, $location, global) {
            // var ctrl = this;
            // debugger;
            var me = this;
            this.title = global.state.title;
            me.showNav = global.state.showNav;
            me.username= global.state.user.name;
            this.onState=(s)=> {
                // console.log("xxxxxxxxxxxxx")
                me.showNav = s.showNav;
                me.username=s.user.name;
            };
            this.$onInit = () => {
                global.on("change", me.onState)
            };
            this.$onDestroy = () => {
                global.removeListener("change", me.onState)
            }
            this.toggleSideBar = () => {
                global.setState({
                    showNav: !global.state.showNav
                });
            }



        }],



    });



}