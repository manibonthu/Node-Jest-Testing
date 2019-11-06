const TodoController = require("../../controllers/todo.controller");
const TodoModal = require("../../models/todo.schema");
const httpMock = require("node-mocks-http");
const TodoMocks = require("../mocks/todo.mocks.json");
const allTodos = require("../mocks/all-todos.json");

let req,res,next;

beforeEach(()=> {
    TodoModal.create = jest.fn();
    TodoModal.find = jest.fn();
    TodoModal.findById = jest.fn();
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = jest.fn();
});

describe("TodoController.getTodoById", () => {
    it("should have getTodoById function", () => {
        expect(typeof TodoController.getTodoById).toBe("function");
    });
    it("should call TodoModal.findById with route params", async () => {
        req.params.todoId = "5dc251d0ce76131140d42cbe";
        await TodoController.getTodoById(req,res,next);
        expect(TodoModal.findById).toHaveBeenCalledWith("5dc251d0ce76131140d42cbe");
    });
    it("should return status code 200 and return a requested todo", async () => {
        req.params.todoId = "5dc251d0ce76131140d42cbe";
        TodoModal.findById.mockReturnValue(TodoMocks);
        await TodoController.getTodoById(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(TodoMocks)
    });
    it("should handle errors" ,async () => {
        const errorMessage = { message : "Failed to get todos"};
        const rejectionPromise = Promise.reject(errorMessage);
        req.params.todoId = "5dc251d0ce76131140d42cbe";
        TodoModal.findById.mockReturnValue(rejectionPromise);
        await TodoController.getTodoById(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);

    });
    it("should return 404 when item does not exist in db" , async () => {
        TodoModal.findById.mockReturnValue(null);
        await TodoController.getTodoById(req,res,next);
        expect(res.statusCode).toBe(404);
    })
})
describe("TodoController.getTodo",() => {
    it("should have getTodo Function", () => {
        expect(typeof TodoController.getTodo).toBe("function");
    });
    it("should call TodoModal.find", () => {
        TodoController.getTodo(req,res,next);
        expect(TodoModal.find).toHaveBeenCalledWith({});
    });
    it("should return status code 200 and all todos", async () => {
        TodoModal.find.mockReturnValue(allTodos);
        await TodoController.getTodo(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos)
    });
    it("should handle errors in getTodo",async () => {
        const errorMessage = { message : "Error Finding.."};
        const rejectionPromise = Promise.reject(errorMessage);
        TodoModal.find.mockReturnValue(rejectionPromise);
        await TodoController.getTodo(req,res,next);
        expect(next).toBeCalledWith(errorMessage);

    })
})
describe("TodoController.createTodo", () => {
    beforeEach(()=> {
        req.body = TodoMocks;
    })
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModal.create", () => {
        TodoController.createTodo(req,res,next);
        expect(TodoModal.create).toBeCalled();
    });
    it("should get todo request from body", () => {
        TodoController.createTodo(req,res,next);
        expect(req.body).toBe(TodoMocks);
    });
    it("should return 200 response", async () => {
        TodoModal.create.mockReturnValue(TodoMocks);
        await TodoController.createTodo(req,res,next);
        expect(res.statusCode).toBe(200);
    });
    it("should insert todo and send inserted todo", async () => {
        TodoModal.create.mockReturnValue(TodoMocks);
        await TodoController.createTodo(req,res,next);
        expect(res._getJSONData()).toStrictEqual(TodoMocks);

    });
    it("should handle errors", async() => {
        const errorMessage = {message :"createdBy field is Required" };
        const rejectionPromise = Promise.reject(errorMessage);
        TodoModal.create.mockReturnValue(rejectionPromise);
        await TodoController.createTodo(req,res,next);
        expect(next).toBeCalledWith(errorMessage);
    });
})