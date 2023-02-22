import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[appCardImage]"></ng-content>

    <section>
      <ng-container *ngFor="let item of list">
        <ng-template
          [ngTemplateOutlet]="rowRef"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </ng-container>
    </section>

    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="action.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;

  @Output() action = new EventEmitter<void>();

  @ContentChild('rowRef', { read: TemplateRef })
  rowRef!: TemplateRef<ListItemComponent>;
}
