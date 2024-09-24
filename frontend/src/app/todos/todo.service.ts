import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../components/todo-item/todo-item.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  createTodo(title: string, description: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { title, description });
  }

  updateTodo(id: string, updatedTodo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, updatedTodo);
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`);
  }
}
