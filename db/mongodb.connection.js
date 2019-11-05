const mongoose = require("mongoose");
const userName = process.env.userName;
const passWord = process.env.passWord;
const connect = async () =>{
    mongoose.connect(`mongodb://${userName}:${passWord}@ds243148.mlab.com:43148/todo-tdd-testing`);
}
module.exports = { connect };