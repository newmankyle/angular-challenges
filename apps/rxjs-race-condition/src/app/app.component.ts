import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, shareReplay, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <button (click)="openTopicModal()">Open Topic</button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics$: Observable<TopicType[]> = this.topicService
    .fakeGetHttpTopic()
    .pipe(take(1), shareReplay(1));

  openTopicModal() {
    //I wonder if take(1) is also necessary here?
    this.topics$.pipe(take(1)).subscribe((topics) => {
      this.dialog.open(TopicModalComponent, {
        data: {
          topics: topics,
        },
      });
    });
  }
}
