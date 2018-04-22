var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Contract = new keystone.List('Contract');
 
Contract.add({
    name: { type: Types.Text, required: true, index: true },
    createdDate:{ type: Types.Datetime, default: Date.now , required: false, index: true },
    // canAccessKeystone: { type: Boolean, initial: true }
});
 
Contract.register();
// new Contract.model({
//     name:"contract 1"
// }).save();
// var xUser = keystone.list('user');
// newPost=new xUser.model({
//     name:"tung",
//     email:"node@com.com",
//     title: 'New Post'
// });
 

 
// newPost.save(function(err) {
//     // post has been saved	
// });