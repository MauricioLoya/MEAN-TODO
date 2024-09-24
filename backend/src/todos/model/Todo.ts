import { Schema, model } from 'mongoose'

interface Todo {
  title: string
  description: string
  completed: boolean
  date: Date
}

const todoSchema = new Schema<Todo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

export const TodoModel = model<Todo>('Todo', todoSchema)
