import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  private todoService = inject(TodoService);

  todos!: Todo[];

  constructor() {
    this.todoService.todos$.subscribe((todos) => (this.todos = todos));
  }

  update(todo: Todo) {
    this.todoService.update(todo);
  }
}
