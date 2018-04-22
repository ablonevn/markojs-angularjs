
var fs = require('fs');
var minify = require('html-minifier').minify;

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
module.exports = function (lasso, pluginConfig) {
    // lasso.addTransform({
    //     contentType: 'html',

    //     name: module.id,

    //     stream: false,

    //     transform: function(code, lassoContext) {
            
    //         var rs= minify(code, {
    //             // removeAttributeQuotes: true
    //           });
    //         //   result; 
    //             // Skip minification when we are not minifying inline code
    //             return rs;
            

    //     } 
    // });
    lasso.dependencies.registerRequireExtension('html', function(path, context, callback) {
        // console.log(path,"plugin================");
        var text=require(path);
        var min=minify(text,{
            removeEmptyElements:false,
            keepClosingSlash:true,
            collapseWhitespace:true,
            preserveLineBreaks:false,
            removeComments:true,
        });
        // console.log(min);
        var js=JSON.stringify(min);
        callback(null, `module.exports=${js};`);
    });
};
