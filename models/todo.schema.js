const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    createdBy : {
        type : String,
        required : true
    }
});

const TodoModal = new mongoose.model("todo", TodoSchema);
module.exports = TodoModal;