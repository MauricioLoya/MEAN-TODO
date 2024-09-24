import { Component, Input } from '@angular/core';
import { Todo } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
})
export class TodoTableComponent {
  @Input() todoList: Todo[] = [];
  constructor() {}

  onDeleteTodoItem(id: string) {
    this.todoList = this.todoList.filter((todo) => todo._id !== id);
  }
  onUpdateTodoItem(id: string) {
    this.todoList = this.todoList.map((todo) => {
      if (todo._id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  }
}
