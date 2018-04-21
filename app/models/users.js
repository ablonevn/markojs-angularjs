var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var User = new keystone.List('User');
 
User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true },
    // canAccessKeystone: { type: Boolean, initial: true }
});
 
User.register();
// var xUser = keystone.list('user');
// newPost=new xUser.model({
//     name:"tung",
//     email:"node@com.com",
//     title: 'New Post'
// });
 

 
// newPost.save(function(err) {
//     // post has been saved	
// });