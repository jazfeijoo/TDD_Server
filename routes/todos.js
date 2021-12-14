const express = require('express');
const router = express.Router();
//WORKING WITH JSON DATA FILE:
const fs = require('fs');
const data = fs.readFile('data.json')
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

router.post('/todos', function (req, res, next){
    const { body } = req
    const newTodo = {
        id: todos.length + 1,
        name: String(req.body.name),
        completed: false
    }

    async () => {
        // const file = await fs.readFile('data.json')
        todos.push(newTodo)
        await fs.writeFile('data.json', JSON.stringify(todos, null, 4))
    }
    
    res.status(201).json(newTodo)
})

module.exports = router;
