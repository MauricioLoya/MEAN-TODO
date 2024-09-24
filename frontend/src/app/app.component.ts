import { Component } from '@angular/core';
import { TodoService } from './todos/todo.service';
import { Todo } from './components/todo-item/todo-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  todoList: Todo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todoList = data;
    });
  }
}
