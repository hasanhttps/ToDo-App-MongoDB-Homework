const express = require("express");
const Todo = require('../models/todoModel');

const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});
  
router.post('/add', async (req, res) => {
    const todo = new Todo({
      ...req.body
    });
    await todo.save();
    res.status(201).json(todo);
});
  
router.get('/:id', async (req, res) => {
    try {
      req.todo = await Todo.findById(req.params.id)
      res.json(req.todo);
    } catch {
      res.status(400).json({ message: 'Invalid todo ID' });
    }
});
  
router.put('/:id', async (req, res) => {
    try {
      const updateSuccessful = await Todo.findByIdAndUpdate(req.params.id, req.body, { new:true });
      updateSuccessful ? res.status(201).json(updateSuccessful) : res.status(400).json({message: "Error while updating todo"})
    }
    catch {
      res.status(400).json({ message: 'Invalid todo ID' });
    }
});
  
router.delete('/:id', async (req, res) => {
    try {
      const todoDeleted = await Todo.findByIdAndDelete(req.params.id);
      todoDeleted ? res.status(204).json({ message: 'Todo deleted' }) : res.status(400).json({ message: 'Error while deleting todo' })
    } catch {
      res.status(400).json({ message: 'Invalid todo ID' });
    }
});
  
module.exports = router;