const TodoController = require("../../controllers/todo.controller");
const TodoModal = require("../../models/todo.schema");
const httpMock = require("node-mocks-http");
const TodoMocks = require("../mocks/todo.mocks.json");

let req,res,next;

beforeEach(()=> {
    TodoModal.create = jest.fn();
    TodoModal.find = jest.fn();
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = jest.fn();
})
describe("TodoController.getTodo",() => {
    it("should have getTodo Function", () => {
        expect(typeof TodoController.getTodo).toBe("function");
    });
    it("should call TodoModal.find", () => {
        TodoController.getTodo(req,res,next);
        expect(TodoModal.find).toBeCalled();
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
    })
})