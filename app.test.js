const request = require('supertest')
const app = require('./app')

console.log(request)

describe('Todos API', () => {
    it('GET /todos --> array of todos', () => { 
        return request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=> {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean)
                    })
                ])
            )
        })
    })
    it('GET /todos --> should validate req body', () => { })

    it('GET /todos/id --> return specific todo if id exists', () => { })
    it('GET /todos/id --> return 404 not found if id DOES NOT exist', () => { })

    it('POST /todos --> create todo', () => { })
    

})
