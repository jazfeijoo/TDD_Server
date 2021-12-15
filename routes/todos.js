const express = require('express');
const router = express.Router();
//WORKING WITH JSON DATA FILE:
const fs = require('fs');
const data = fs.readFileSync('data.json')
const todos = JSON.parse(data)

const createError = require('http-errors')

/* GET todos */
router.get('/', function(req, res, next) {
  res.json(todos);
});

router.get('/:id', function(req, res, next) {
    const foundTodo = todos.find( (todo) => { if (todo.id === Number(req.params.id)) return todo })
    if (!foundTodo){
        return next(createError(404, 'Not found.'))
    }
    res.json(foundTodo)
});

// console.log('TODOS json parsed:', todos)

router.post('/', function (req, res, next){
    const { body } = req

    if (typeof body.name !== 'string'){
        return next(createError(422,'Validation error. Name should be a string'))
    }

    const newTodo = {
        id: todos.length + 1,
        name: String(body.name),
        completed: false
    }
    todos.push(newTodo)
   // console.log('BODY:', body, 'todos after: ', todos)  
    res.status(201).json(todos[todos.length-1])
})

module.exports = router;
