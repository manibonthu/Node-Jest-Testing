const TodoModel = require("../models/todo.schema");
exports.createTodo = async (req,res,next) => {
    const result = await TodoModel.create(req.body);
    res.json(result);
}