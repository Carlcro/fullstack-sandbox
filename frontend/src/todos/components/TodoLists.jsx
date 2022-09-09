import React, { Fragment, useState, useEffect, useMemo } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  TextField,
  CardActions,
  Button,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import AddIcon from '@mui/icons-material/Add'
import { TodoListForm } from './TodoListForm'
import {
  addTodoItem,
  addTodoList,
  deleteTodoItem,
  getTodoLists,
  updateTodoItem,
  updateTodoItemCompleted,
} from '../../services/todoListServices'

export const TodoLists = ({ style }) => {
  const [loading, setLoading] = useState(true)
  const [todoLists, setTodoLists] = useState([])
  const [activeListId, setActiveListId] = useState(null)
  const [newTodoListName, setNewTodoListName] = useState('')

  useEffect(() => {
    const fetchTodoLists = async () => {
      const newTodoLists = await getTodoLists()
      setTodoLists(newTodoLists)
      setLoading(false)
    }
    fetchTodoLists()
  }, [])

  const currentActiveList = useMemo(
    () => todoLists.find((list) => list.id === activeListId),
    [todoLists, activeListId]
  )

  const handleOnChangeTodoItem = async (event, todoItemId) => {
    const newTodoLists = await updateTodoItem(activeListId, todoItemId, event.target.value)
    setTodoLists(newTodoLists)
  }

  const handleDeleteTodoItem = async (todoItemId) => {
    const newTodoLists = await deleteTodoItem(activeListId, todoItemId)
    setTodoLists(newTodoLists)
  }

  const handleAddTodoItem = async (newTodoItem, completionDate) => {
    const newTodoLists = await addTodoItem(activeListId, newTodoItem, completionDate)
    setTodoLists(newTodoLists)
  }

  const handleAddTodoList = async (e) => {
    e.preventDefault()
    if (newTodoListName) {
      try {
        const newTodoLists = await addTodoList(newTodoListName)
        setTodoLists(newTodoLists)
        setNewTodoListName('')
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const handleCompleteTodoItem = async (event, todoItemId) => {
    const newTodoLists = await updateTodoItemCompleted(
      activeListId,
      todoItemId,
      event.target.checked
    )

    setTodoLists(newTodoLists)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (todoLists.length === 0)
    return (
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>No Todo</Typography>
        </CardContent>
      </Card>
    )
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {todoLists.map((list) => (
              <ListItem key={list.id} button onClick={() => setActiveListId(list.id)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  style={list.allTodosCompleted ? { textDecoration: 'line-through' } : {}}
                  primary={list.title}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <form>
          <TextField
            sx={{ flexGrow: 1, marginTop: '1rem', marginLeft: '1rem' }}
            label='Title'
            value={newTodoListName}
            onChange={(event) => setNewTodoListName(event.target.value)}
          />
          <CardActions>
            <Button type='submit' color='primary' onClick={handleAddTodoList}>
              Add Todo List <AddIcon />
            </Button>
          </CardActions>
        </form>
      </Card>
      {activeListId && (
        <TodoListForm
          key={currentActiveList.id}
          todoList={currentActiveList}
          handleOnChangeTodoItem={handleOnChangeTodoItem}
          handleDeleteTodoItem={handleDeleteTodoItem}
          handleAddTodoItem={handleAddTodoItem}
          handleCompleteTodoItem={handleCompleteTodoItem}
        />
      )}
    </Fragment>
  )
}
