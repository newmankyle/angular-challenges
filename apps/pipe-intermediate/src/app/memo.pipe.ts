import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoize',
  standalone: true,
  pure: true,
})
export class MemoizePipe implements PipeTransform {
  transform<A extends unknown[]>(fn: (...callArgs: A) => unknown, ...args: A) {
    return fn(...args);
  }
}
