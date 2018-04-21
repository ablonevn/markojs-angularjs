var  EventEmitter =require("events");
class AppState extends EventEmitter {
    constructor(){
        super();
        this.state={
            title:"Contract"
        };
    }
    setState(state) {
        this.state=Object.assign({},this.state,state);
        this.emit("change",this.state);
    }
}
var state=state||new AppState();
module.exports=function(app){
    app.service('global',function(){
        return state;
    });
    // state;
}
