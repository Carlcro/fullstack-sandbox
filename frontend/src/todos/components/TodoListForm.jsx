import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({
  todoList,
  handleOnChangeTodoItem,
  handleDeleteTodoItem,
  handleAddTodoItem,
  handleCompleteTodoItem,
}) => {
  const [newTodoItem, setNewTodoItem] = useState('')

  const addTodo = async (e) => {
    e.preventDefault()
    if (newTodoItem.length) {
      handleAddTodoItem(newTodoItem)
      setNewTodoItem('')
    }
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todoList.todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.content}
                onChange={(event) => handleOnChangeTodoItem(event, todo.id)}
                style={todo.completed ? { textDecoration: 'line-through' } : {}}
              />
              <input onChange={(event) => handleCompleteTodoItem(event, todo.id)} type='checkbox' />

              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => handleDeleteTodoItem(todo.id)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <TextField
            sx={{ flexGrow: 1, marginTop: '1rem' }}
            label='Add new todo'
            value={newTodoItem}
            onChange={(event) => setNewTodoItem(event.target.value)}
          />
          <CardActions>
            <Button type='submit' color='primary' onClick={addTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
