import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from 'src/app/todos/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  title: string = '';
  description: string = '';

  constructor(private todoService: TodoService) {}

  @Output()
  onCreateTodo = new EventEmitter();

  onSubmit() {
    this.todoService.createTodo(this.title, this.description).subscribe(() => {
      this.title = '';
      this.description = '';
      this.onCreateTodo.emit();
    });
  }
}
