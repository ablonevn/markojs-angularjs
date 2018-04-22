var  EventEmitter =require("events");
class AppState extends EventEmitter {
    constructor(){
        super();
        this.state={
            title:"Contract",
            showNav:true,
            login:false,
            user:{
                
            }
        };
    }
    setState(state) {
        this.state=Object.assign({},this.state,state);
        this.emit("change",this.state);
    }
    // register(cb){

    // }
}
var state=state||new AppState();
module.exports=function(app){
    app.value('global', state);
    // state;
}
