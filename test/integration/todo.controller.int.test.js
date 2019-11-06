
const app = require("../../app");
const TodoMock = require("../mocks/todo.mocks.json");
const request = require("supertest");
const endpoint = '/todos/';
let firstTodo;
describe(endpoint,() => {
    it("POST" + endpoint, async () => {
        const response = await request(app).post(endpoint).send(TodoMock);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(TodoMock.title);
        expect(response.body.createdBy).toBe(TodoMock.createdBy);
    });
    it("Should throw 500 error if we passed malformed request" + endpoint, async () => {
        const response = await request(app).post(endpoint).send({title : 'Hello World'});
        expect(response.statusCode).toBe(500);
    });
    it("GET" + endpoint, async() => {
        const response = await request(app).get(endpoint);
        firstTodo = response.body[0];
        expect(response.statusCode).toBe(200);
        expect(response.body[0].title).toBe(TodoMock.title);
        expect(response.body[0].createdBy).toBe(TodoMock.createdBy);
    });
    it("GET" + endpoint + "/todoId", async() => {
        const todoId = firstTodo._id;
        const response = await request(app).get(endpoint+todoId);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.createdBy).toBe(firstTodo.createdBy);
    });
    it("GET" + endpoint + "/todoId does not exist in db", async() => {
        const todoId = "5dc251d0ce76131140d42cbf";
        const response = await request(app).get(endpoint+todoId);
        expect(response.statusCode).toBe(404);
    })
})
