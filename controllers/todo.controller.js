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
    TodoModel.find({});
}