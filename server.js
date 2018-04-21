var lasso = require('lasso');
var marko=require('marko');
require('marko/node-require');
var template = marko.load('./index.marko');
var express=require("express");

var isProduction=process.env.NODE_ENV=="production";
var port=8080;
var app = express();

var mongoose = require('mongoose'),
keystone = require('keystone');

keystone.set('app', app);
keystone.set('mongoose', mongoose);
keystone.set('mongo',"mongodb://localhost/contract");
keystone.set("headless",true);

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


require("./app/models");


var config = {
    plugins: [
        // "lasso-minify-js"
        // require('./minify'),


        // require("lasso-imagemin")
        // "lasso-minify-css"
        //'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
        require("./lasso-html"),'lasso-sass'

    ],
    

    // "resolveCssUrls": true,
    outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
    bundlingEnabled: isProduction, // Only enable bundling in production
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
}
var presets=[];
if (isProduction) {
    // config.plugins.push( require("lasso-minify-css"));
    // config.plugins.push(require("lasso-minify-js"));
    presets=presets.concat(["es2015", ["minify",{
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

var lsz=lasso.configure(config);
// lasso.addTransform(require('./lasso-html'));
// require("lasso-minify-js")(lasso);


app.use(require('lasso/middleware').serveStatic());

app.get("*",(req,res)=>{
    
    template.render({}, res);
});

// app.listen(port, function () {
//     console.log('Server started on:\nhttp://localhost:' + port + '/');

//     if (process.send) {
//         process.send({ event: 'online', url: `http://localhost:${port}/` });
//     }
// });
// var builds=routes.map((t) => {

    var builds= new Promise(resolve => {
        var view = require("./index.marko");
        var out = view.createOut();
        view.render({}, out);
        out.on('finish', () => {
            resolve();
        });
        out.end();
    }).catch(console.log);
// });
Promise.all([builds]).then(()=>{
    keystone.start();
}).catch(console.log)


