const TodoController = require("../../controllers/todo.controller");
const TodoModal = require("../../models/todo.schema");
const httpMock = require("node-mocks-http");
const TodoMocks = require("../mocks/todo.mocks.json");

let req,response,next;

beforeEach(()=> {
    TodoModal.create = jest.fn();
    req = httpMock.createRequest();
    response = httpMock.createResponse();
    next = null;
})

describe("TodoController.createTodo", () => {
    beforeEach(()=> {
        req.body = TodoMocks;
    })
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });
    it("should call TodoModal.create", () => {
        TodoController.createTodo(req,response,next);
        expect(TodoModal.create).toBeCalled();
    });
    it("should get todo request from body", () => {
        TodoController.createTodo(req,response,next);
        expect(req.body).toBe(TodoMocks);
    });
    it("should return 200 response", async () => {
        TodoModal.create.mockReturnValue(TodoMocks);
        await TodoController.createTodo(req,response,next);
        expect(response.statusCode).toBe(200);
    });
    it("should insert todo and send inserted todo", async () => {
        TodoModal.create.mockReturnValue(TodoMocks);
        await TodoController.createTodo(req,response,next);
        expect(response._getJSONData()).toStrictEqual(TodoMocks);

    })
})