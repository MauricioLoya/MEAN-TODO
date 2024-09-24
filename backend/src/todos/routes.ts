import { Router } from 'express'
import { TodoModel } from './model/Todo'

const router = Router()

router.get('/todos', async (req, res) => {
  try {
    const todos = await TodoModel.find()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Todo' })
  }
})

router.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body
    const newTodo = new TodoModel({
      title,
      description
    })
    await newTodo.save()
    res.status(201).json(newTodo)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error creating Todo' })
  }
})

router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, completed, description } = req.body
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, completed, description },
      { new: true }
    )
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    res.json(updatedTodo)
  } catch (error) {
    res.status(400).json({ message: 'Error updating Todo' })
  }
})

router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedTodo = await TodoModel.findByIdAndDelete(id)
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    res.json(deletedTodo)
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Todo' })
  }
})

export default router
