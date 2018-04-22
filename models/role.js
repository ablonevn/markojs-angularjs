var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Role = new keystone.List('Role');
 
Role.add({
    name: { type: Types.Text, required: true, index: true },
    // email: { type: Types.Email, initial: true, required: true, index: true },
    // password: { type: Types.Password, initial: true },
    // roles
    // canAccessKeystone: { type: Boolean, initial: true }
});

Role.register();
// var xUser = keystone.list('user');
// newPost=new xUser.model({
//     name:"tung",
//     email:"node@com.com",
//     title: 'New Post'
// });
 

 
// newPost.save(function(err) {
//     // post has been saved	
// });