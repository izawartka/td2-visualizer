import { BehaviorSubject } from 'rxjs';
import Constants from '../helpers/constants';

export const mapZoom$ = new BehaviorSubject(null);
export const mapZoomTrackDetails$ = new BehaviorSubject(true);
export function setMapZoom(zoom) {
  mapZoom$.next(zoom);

  const newZoomTrackDetails = zoom > Constants.map.mapZoomTrackDetailsThreshold;
  if (mapZoomTrackDetails$.getValue() !== newZoomTrackDetails) {
    mapZoomTrackDetails$.next(newZoomTrackDetails);
  }
}
