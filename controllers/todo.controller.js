const TodoModel = require("../models/todo.schema");
exports.createTodo = async (req,res,next) => {
    try {
        const result = await TodoModel.create(req.body);
        res.json(result);
    } catch(err) {
        next(err);
    }
}

exports.getTodo = async (req,res,next) => {
    try {
        const result = await TodoModel.find({});
        res.status(200).json(result);
    } catch(err) {
        next(err);
    }
}
exports.getTodoById = async (req,res,next) => {
    try {
        const result = await TodoModel.findById(req.params.todoId);
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).send()
        }
        
    } catch(err) {
        next(err);
    }
    
    
}