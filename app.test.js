const request = require('supertest')
const app = require('./app')

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
                        id: expect.any(Number),
                        name: expect.any(String),
                        completed: expect.any(Boolean)
                    })
                ])
            )
        })
    })
    it('GET /todos --> should validate req body', () => { 
        //nothing here - passing 
    })

    it('GET /todos/id --> return specific todo if id exists', () => { 
        return request(app)
        .get('/todos/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=> {
            expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        completed: expect.any(Boolean)
                    })
            )
        })
    })
    it('GET /todos/id --> return 404 not found if id DOES NOT exist', () => { 
        return request(app)
        .get('/todos/999')
        .expect(404)
    })

    it('POST /todos --> create todo', () => { 
        return request(app)
        .post('/todos')
        .send({
            name: 'do dishes'
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response)=> {
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'do dishes',
                    completed: false
                })
        )
        })
    })
    

})
