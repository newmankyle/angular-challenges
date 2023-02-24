import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private http = inject(HttpClient);

  private _todos$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this._todos$.asObservable();

  constructor() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this._todos$.next(todos);
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
        const todos = this._todos$.getValue();
        todos[todoUpdated.id - 1] = todoUpdated;
        this._todos$.next([...todos]);
      });
  }
}
