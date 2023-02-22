import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers$ | async"
    [type]="cardType"
    (action)="onAdd()"
    class="bg-light-red">
    <img appCardImage src="assets/img/teacher.png" width="200px" />
    <ng-template #rowRef let-teacher>
      <app-list-item (delete)="onDelete(teacher.id)">{{
        teacher.firstname
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, NgTemplateOutlet, AsyncPipe],
})
export class TeacherCardComponent {
  teachers$ = this.store.teachers$;
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onAdd = () => this.store.addOne(randTeacher());
  onDelete = (id: number) => this.store.deleteOne(id);
}
