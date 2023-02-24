import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todoService.todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  providers: [TodoService],
})
export class AppComponent {
  todoService = inject(TodoService);

  todos$ = this.todoService.todos$;

  update(todo: Todo) {
    this.todoService.update(todo);
  }
}
