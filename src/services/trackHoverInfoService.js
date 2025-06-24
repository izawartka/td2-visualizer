import { BehaviorSubject } from 'rxjs';

const hoveredTracksStack = [];
export const hoveredTrack$ = new BehaviorSubject(null);

export function setHoveredTrack(track) {
  hoveredTracksStack.push(track);
  hoveredTrack$.next(track);
}

export function unsetHoveredTrack(track) {
  hoveredTracksStack.splice(hoveredTracksStack.indexOf(track), 1);
  hoveredTrack$.next(hoveredTracksStack.at(-1) || null);
}

export function resetHoveredTracksStack() {
  hoveredTracksStack.length = 0;
  hoveredTrack$.next(null);
}
