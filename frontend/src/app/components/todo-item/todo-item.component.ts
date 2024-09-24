import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from 'src/app/todos/todo.service';
export type Todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
};

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  constructor(private todoService: TodoService) {}

  @Output()
  onDeleteTodo = new EventEmitter<string>();
  @Output()
  onUpdateTodo = new EventEmitter<string>();

  onToggle() {
    this.todoService
      .updateTodo(this.todo._id, { completed: !this.todo.completed })
      .subscribe(() => {
        this.onUpdateTodo.emit(this.todo._id);
      });
  }

  onDelete() {
    this.todoService.deleteTodo(this.todo._id).subscribe(() => {
      this.onDeleteTodo.emit(this.todo._id);
    });
  }
}
