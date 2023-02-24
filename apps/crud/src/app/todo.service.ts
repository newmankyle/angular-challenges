import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, map, Observer, PartialObserver, tap } from 'rxjs';
import { Todo } from './todo.model';

interface ITodoState {
  todos: Todo[];
  error: boolean;
  loading: boolean;
}

class TodoState extends BehaviorSubject<ITodoState> {
  constructor() {
    super({ todos: [], loading: false, error: false });
  }

  override next(): void {
    throw Error('use api instead');
  }

  loading = () => {
    const state = this.getValue();
    super.next({ ...state, loading: true, error: false });
  };

  fail = () => {
    super.next({ todos: [], loading: false, error: true });
  };

  set todos(val: Todo[]) {
    if (Array.isArray(val)) {
      super.next({ todos: val, loading: false, error: false });
    } else {
      console.log('failed', val);
      this.fail();
    }
  }

  /**
   * Convenience handles since all the observers turned out the same
   */
  handle(): PartialObserver<Todo[]> {
    return {
      next: (todos: Todo[]) => (this.todos = todos),
      error: () => this.fail(),
    };
  }

  /** Maybe not all the observers... */
  handleLoading(): PartialObserver<Todo[]> {
    return {
      next: () => super.next({ ...this.getValue(), loading: false }),
      error: () => this.fail(),
    };
  }
}

@Injectable()
export class TodoService {
  private http = inject(HttpClient);

  private _state$ = new TodoState();
  state$ = this._state$.asObservable();

  constructor() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap(this._state$.loading))
      .subscribe(this._state$.handle());
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
      .pipe(
        tap(this._state$.loading),
        map((todoUpdated: Todo) =>
          this._state$.getValue().todos.map((todo) => {
            if (todo.id === todoUpdated.id) {
              return todoUpdated;
            }
            return todo;
          })
        )
      )
      .subscribe(this._state$.handle());
  }

  remove(id: number) {
    this.http
      .delete<Todo[]>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(tap(this._state$.loading))
      .subscribe(this._state$.handleLoading());
  }
}
