const mongoose = require("mongoose");
const userName = process.env.uname;
const passWord = process.env.pwd;

const connect = async () =>{
    try {
        mongoose.connect(`mongodb://${userName}:${passWord}@ds243148.mlab.com:43148/todo-tdd-testing`,
        { useNewUrlParser: true });
    } catch(err){
        console.log("Error connecting to Database");
    }
   
}
module.exports = { connect };