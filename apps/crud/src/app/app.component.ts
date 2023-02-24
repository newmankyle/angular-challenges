import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <ng-container *ngIf="show$ | async; else error">
      <div *ngFor="let todo of todos$ | async">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="remove(todo.id)">Delete</button>
      </div>
    </ng-container>

    <ng-template #error>Unable to load due to errors</ng-template>
  `,
  providers: [TodoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todoService = inject(TodoService);

  todos$ = this.todoService.state$.pipe(map((state) => state.todos));
  show$ = this.todoService.state$.pipe(map((state) => !state.error));

  update(todo: Todo) {
    this.todoService.update(todo);
  }

  remove(id: number) {
    this.todoService.remove(id);
  }
}
