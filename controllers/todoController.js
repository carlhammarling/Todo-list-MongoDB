const router = require('express').Router();

const todoModel = require('../models/todoModel')

/*
CRUD - Create, Read, Update, Delete
*/

router.post('/',todoModel.postTodo)
router.get('/',todoModel.getTodo)
router.put('/:id',todoModel.putTodo)
router.delete('/:id',todoModel.deleteTodo)


module.exports = router;

