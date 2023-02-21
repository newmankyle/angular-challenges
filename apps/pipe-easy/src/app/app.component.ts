import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { EasyPipe } from './easy.pipe';

@Component({
  standalone: true,
  imports: [NgFor, EasyPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | easy : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
