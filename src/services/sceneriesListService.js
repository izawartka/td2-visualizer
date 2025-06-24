import { BehaviorSubject } from 'rxjs';

export const sceneriesListVersionDate$ = new BehaviorSubject(null);

export function setSceneriesListVersionDate(versionDate) {
  sceneriesListVersionDate$.next(versionDate);
}
