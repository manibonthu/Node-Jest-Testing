
const app = require("../../app");
const TodoMock = require("../mocks/todo.mocks.json");
const request = require("supertest");
const endpoint = '/todos'
describe(endpoint,() => {
    it("POST" + endpoint, async () => {
        const response = await request(app).post(endpoint).send(TodoMock);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(TodoMock.title);
        expect(response.body.createdBy).toBe(TodoMock.createdBy);
    });
})
