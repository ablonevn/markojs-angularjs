module.exports = function (app) {



    app.component("login", {
        template: require("./login.html"),
        controller: ['$http','$location', 'global', function ($http,$location, global) {
            this.$onInit=()=>{
                global.setState({login:true}); 
                // console.log("login");
            };
            if (global.state.user) {
                $location.path("/");
            }
            this.$onDestroy = () => {
                global.setState({login:false}); 
            }
            this.login=()=>{
                global.setState({user:{name:"tung bui"}});
                $location.path("/");
                // var path=localStorage["ret"];
                // delete localStorage["ret"];
            }
    



        }]

    });




}