import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

interface TodoState {
  todos: Todo[];
  error?: boolean;
}

@Injectable()
export class TodoService {
  private http = inject(HttpClient);

  private _state$ = new BehaviorSubject<TodoState>({ todos: [] });
  state$ = this._state$.asObservable();

  constructor() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (todos) => {
          this._state$.next({ todos });
        },
        error: () => this._state$.next({ todos: [], error: true }),
      });
  }

  update(todo: Todo) {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          completed: todo.completed,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe((todoUpdated: Todo) => {
        const todos = this._state$.getValue().todos.map((todo) => {
          if (todo.id === todoUpdated.id) {
            return todoUpdated;
          }
          return todo;
        });
        this._state$.next({ todos });
      });
  }

  remove(id: number) {
    this.http
      .delete<Todo[]>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe((todos) => this._state$.next({ todos }));
  }
}
