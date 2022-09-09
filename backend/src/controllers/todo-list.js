const todoLists = [
  {
    id: 1,
    title: 'First List',
    todos: [{ id: 1, content: 'First todo of first list!', completed: false }],
    allTodosCompleted: false,
  },
  {
    id: 2,
    title: 'Second List',
    todos: [
      { id: 1, content: 'First todo of second list!', completed: false },
      { id: 2, content: 'second todo of second list!', completed: false },
    ],
    allTodosCompleted: false,
  },
  {
    id: 3,
    title: 'Third List',
    todos: [{ id: 1, content: 'First todo of third list!', completed: false }],
    allTodosCompleted: false,
  },
]

exports.getTodoLists = async (req, res) => {
  res.send(todoLists)
}

exports.createTodoList = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: 'Title missing',
    })
  }

  const newTodoList = {
    id: todoLists.length + 1,
    title: req.body.title,
    todos: [],
    allTodosCompleted: false,
  }

  todoLists.push(newTodoList)

  res.send(todoLists)
}

exports.deleteTodoList = (req, res) => {
  const index = todoLists.findIndex((todoList) => todoList.id === Number(req.params.id))
  if (index > -1) {
    // only splice array when item is found
    todoLists.splice(index, 1) // 2nd parameter means remove one item only
    res.send(todoLists)
  }

  return res.status(404).send({
    message: 'Todo list with that ID is missing',
  })
}

exports.createTodoListItem = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Content is missing',
    })
  }

  const todoList = todoLists.find((todoList) => todoList.id === Number(req.params.id))

  const newTodoItem = {
    id: todoList.todos.length + 1,
    content: req.body.content,
    completionDate: req.body.completionDate,
  }

  todoList.todos = [...todoList.todos, newTodoItem]

  res.send(todoLists)
}

exports.deleteTodoListItem = (req, res) => {
  const todoList = todoLists.find((todoList) => todoList.id === Number(req.params.todoListId))

  todoList.todos = todoList.todos.filter((item) => item.id !== Number(req.params.itemId))

  if (todoList.todos.length === 0) {
    todoList.allTodosCompleted = false
  }

  res.send(todoLists)
}

exports.updateTodoListItemContent = (req, res) => {
  const todoList = todoLists.find((todoList) => todoList.id === Number(req.params.todoListId))

  const todo = todoList.todos.find((todo) => todo.id === Number(req.params.itemId))

  todo.content = req.body.content

  res.send(todoLists)
}

exports.updateTodoListItemCompleted = (req, res) => {
  const todoList = todoLists.find((todoList) => todoList.id === Number(req.params.todoListId))

  const todo = todoList.todos.find((todo) => todo.id === Number(req.params.itemId))

  todo.completed = req.body.completed

  if (todoList.todos.every((item) => item.completed)) {
    todoList.allTodosCompleted = true
  }

  res.send(todoLists)
}
