const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = await Todo.create({ task });
    res.json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  try {
    const updatedTodo = await Todo.update(
      { task, completed },
      { where: { id } }
    );
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.destroy({ where: { id } });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
