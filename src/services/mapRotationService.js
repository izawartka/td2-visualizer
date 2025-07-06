import { BehaviorSubject } from 'rxjs';

export const mapRotation$ = new BehaviorSubject(null);

export function setMapRotation(rotation) {
  mapRotation$.next(rotation);
}
