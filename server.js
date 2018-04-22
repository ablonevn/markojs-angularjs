var lasso = require('lasso');
var marko = require('marko');
require('marko/node-require');
// var template = marko.load('./index.marko');
var express = require("express");

var isProduction = process.env.NODE_ENV == "production";
var port = 8080;
var app = express();

// var mongoose = require('mongoose'),
//     keystone = require('keystone');

// keystone.set('app', app);
// // keystone.set('mongoose', mongoose);
// keystone.set('mongo', "mongodb://localhost/contract");
// keystone.set('user model', 'User');
// keystone.import('models');
// // require("./app/models");
// keystone.set('locals', {
//     // _: require('lodash'),
//     env: keystone.get('env'),
//     utils: keystone.utils,
//     editable: keystone.content.editable,
// });
// keystone.set('nav', {
//     // posts: ['posts', 'post-categories'],
//     contracts: 'contracts',
//     // enquiries: 'enquiries',
//     users: 'users',
// });
// keystone.init({
//     'cookie secret': 'secure string goes here',
//     'name': 'our-project',
//     'user model': 'User',
//     'auto update': true,
//     'auth': true,
// });

// keystone.init({

//     'auto update': true,
//     'mongo': 'mongodb://localhost/contract',

//     'session': false,
//     'auth': false,


//   });

// var angular_templates={
//     app:require("./components/app/app.html")
// }
// module.exports=angular_templates;





var config = {
    plugins: [
        // "lasso-minify-js"
        // require('./minify'),


        // require("lasso-imagemin")
        // "lasso-minify-css"
        //'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
        require("./lasso-html"), 'lasso-sass'

    ],


    // "resolveCssUrls": true,
    outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
    bundlingEnabled: isProduction, // Only enable bundling in production
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
}
var presets = [];
if (isProduction) {
    // config.plugins.push( require("lasso-minify-css"));
    // config.plugins.push(require("lasso-minify-js"));
    presets = presets.concat(["es2015", ["minify", {
        mangle: false


    }]]);
    config["require"] = {
        extensions: ['.js'], // Defaults to ['.js']
        transforms: [ // Browserify compatible transforms
            // {transform:"lasso-minify-js"}
            {
                transform: 'lasso-babel-transform',
                config: {
                    // directly specify babel options
                    babelOptions: {
                        presets: presets
                    }
                }
            }


        ]

    }

}


// Configure lasso to control how JS/CSS/etc. is delivered to the browser

var lsz = lasso.configure(config);
// lasso.addTransform(require('./lasso-html'));
// require("lasso-minify-js")(lasso);


app.use(require('lasso/middleware').serveStatic());

app.get("/api/contract", (req, res) => {
    // var keystone = require('keystone');
    res.json([{name:"ct1"}])

    // var Contract = keystone.list('Contract');
    // var data = Contract.model.find().limit(10).exec().then((p) => {
    //     res.json(p);
    // });
    // res.json(data);
})
// keystone.set('routes', function(app){

// }); 

// app.get("*", (req, res) => {

//     template.render({}, res);
// });

// app.listen(port, function () {
//     console.log('Server started on:\nhttp://localhost:' + port + '/');

//     if (process.send) {
//         process.send({ event: 'online', url: `http://localhost:${port}/` });
//     }
// });
var routes = [{
    name: "*",
    view: require("./index.marko")
}];
function buildRoutes() {
    return routes.map((t) => {

        app.get(t.name, (req, res) => {
    
            // res.send(t.html);
            t.view.render({}, res);
        });
        // var builds = (function () {
    
        // if (!isProduction) {
        //     return Promise.resolve();
        // }
        return new Promise(resolve => {
            // var view = require("./index.marko");
            var view = t.view;
            var out = view.createOut();
            var html="";
            out.on('data', (data)=>{
                html=html+data;
            })
            view.render({}, out);
            out.on('finish', (x,y,z) => {
            //    t.html=x.out.stream.str;
                resolve();
            });
            out.end();
        });
        // })();
    });
}
var builds = buildRoutes();
// var browserRefreshClient=require('browser-refresh-client');
// browserRefreshClient.enableSpecialReload("**/*.*", { autoRefresh: false })
//     .onFileModified(function(path) {
//         // Code to handle the file modification goes here.

//         // Now trigger a refresh when we are ready:
//         // if (isImage(path)) {
//         //     browserRefreshClient.refreshImages();
//         // } else if (isStyle(path)) {
//         //     browserRefreshClient.refreshStyles();
//         // } else {
//             Promise.all(buildRoutes()).then(()=>{
//                 console.log("file modify")
//                 process.send({
//                     type: 'browser-refresh.refreshPage'
//                 }); 
//             })
              
//         // }
//     });  
Promise.all(builds).then(() => {
    app.listen(port, function () {
        console.log('Server started on:\nhttp://localhost:' + port + '/');

        if (process.send) {
            process.send({
                event: 'online',
                url: `http://localhost:${port}/`
            });
        }
    });
}).catch(console.log)