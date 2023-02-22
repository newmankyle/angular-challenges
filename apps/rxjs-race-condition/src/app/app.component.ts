import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable, Subject, switchMap, take } from 'rxjs';
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
    .pipe(take(1));

  private topicClicker$ = new Subject<void>();

  private handleDialog = this.topicClicker$
    .pipe(
      switchMap(() => this.topics$),
      take(1)
    )
    .subscribe((topics) => {
      this.dialog.open(TopicModalComponent, {
        data: {
          topics: topics,
        },
      });
    });

  openTopicModal() {
    this.topicClicker$.next();
  }
}

// faire une app qui fonctionne mais pas dans les tests e2e à cause du délai de la requete http.
