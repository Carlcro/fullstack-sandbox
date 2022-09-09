const express = require('express')
const router = express.Router()
const controller = require('../controllers/todo-list')

router.get('/', controller.getTodoLists)

router.post('/', controller.createTodoList)

router.delete('/:id', controller.deleteTodoList)

router.post('/:id', controller.createTodoListItem)

router.delete('/:todoListId/:itemId', controller.deleteTodoListItem)

router.put('/:todoListId/:itemId', controller.updateTodoListItemContent)

router.put('/:todoListId/:itemId/completed', controller.updateTodoListItemCompleted)

module.exports = router
