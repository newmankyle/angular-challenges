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
    <ng-container *ngIf="vm$ | async as state" [ngSwitch]="state">
      <ng-container *ngSwitchCase="state.loading">
        <p>LOADING</p>
      </ng-container>
      <ng-container *ngSwitchCase="state.error">
        <p>Unable to load due to errors</p>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <div *ngFor="let todo of state.todos">
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
          <button (click)="remove(todo.id)">Delete</button>
        </div>
      </ng-container>
    </ng-container>

    <ng-template #error>Unable to load due to errors</ng-template>
  `,
  providers: [TodoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todoService = inject(TodoService);

  vm$ = this.todoService.state$;

  sub = this.vm$.subscribe((state) => console.log(state));

  update(todo: Todo) {
    this.todoService.update(todo);
  }

  remove(id: number) {
    this.todoService.remove(id);
  }
}
