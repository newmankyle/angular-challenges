import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    class="bg-light-green"
    [list]="students$ | async"
    [type]="cardType"
    (action)="onAdd()">
    <img appCardImage src="assets/img/student.webp" width="200px" />
    <ng-template #rowRef let-student>
      <app-list-item (delete)="onDelete(student.id)">{{
        student.firstname
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class StudentCardComponent {
  students$ = this.store.students$;
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onAdd = () => this.store.addOne(randStudent());
  onDelete = (id: number) => this.store.deleteOne(id);
}
