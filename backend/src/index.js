const express = require('express')
const cors = require('cors')
const app = express()

const todoListRouter = require('./routes/todo-list')

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/todoLists', todoListRouter)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
