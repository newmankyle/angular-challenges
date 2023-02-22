import { Pipe, PipeTransform } from '@angular/core';

const showName = (name: string, index: number) => {
  // very heavy computation
  return `${name} - ${index}`;
};

const isAllowed = (age: number, isFirst: boolean, activityAge: number) => {
  if (isFirst) {
    return 'always allowed';
  } else {
    return age > activityAge ? 'allowed' : 'declined';
  }
};

export const PersonUtils = {
  showName,
  isAllowed,
};

type PersonUtilKeys = keyof typeof PersonUtils;
type PersonUtilType = typeof PersonUtils;

@Pipe({
  name: 'person',
  standalone: true,
  pure: true,
})
export class PersonUtilPipe implements PipeTransform {
  transform<P extends PersonUtilKeys>(
    funcName: P,
    ...args: Parameters<PersonUtilType[P]>
  ) {
    return PersonUtils[funcName](...args);
  }
}
