import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'easy',
  pure: true,
  standalone: true,
})
export class EasyPipe implements PipeTransform {
  transform(name: string, index: number) {
    return `${name} - ${index}`;
  }
}
