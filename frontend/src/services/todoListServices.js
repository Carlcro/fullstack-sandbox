export const getTodoLists = async () => {
  const response = await fetch('http://localhost:3001/api/todoLists')
  return response.json()
}

export const addTodoList = async (title) => {
  const response = await fetch(`http://localhost:3001/api/todoLists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })

  return response.json()
}

export const addTodoItem = async (todoListId, content) => {
  const response = await fetch(`http://localhost:3001/api/todoLists/${todoListId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  return response.json()
}

export const updateTodoItem = async (todoListId, todoItemId, content) => {
  const response = await fetch(`http://localhost:3001/api/todoLists/${todoListId}/${todoItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  return response.json()
}

export const updateTodoItemCompleted = async (todoListId, todoItemId, completed) => {
  const response = await fetch(
    `http://localhost:3001/api/todoLists/${todoListId}/${todoItemId}/completed`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    }
  )

  return response.json()
}

export const deleteTodoItem = async (todoListId, todoItemId) => {
  const response = await fetch(`http://localhost:3001/api/todoLists/${todoListId}/${todoItemId}`, {
    method: 'DELETE',
  })

  return response.json()
}
