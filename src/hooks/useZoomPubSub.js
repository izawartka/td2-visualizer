import { useEffect } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';

const zoomCenter$ = new Subject();

// BehaviorSubjects to store current viewBox, clientRect and camera transform
export const viewBox$ = new BehaviorSubject(null);
export const clientRect$ = new BehaviorSubject(null);
export const camera$ = new BehaviorSubject(0);

/**
 * Returns the current viewBox value synchronously.
 */
export function getCurrentViewBox() {
    return viewBox$.getValue();
}

/**
 * Returns the current clientRect value synchronously.
 */
export function getCurrentClientRect() {
    return clientRect$.getValue();
}

/**
 * Returns the current camera transform value synchronously.
 */
export function getCurrentCamera() {
    return camera$.getValue();
}

/**
* useZoomPanSubscriber
*
* Registers a callback (onCenter) that will be invoked whenever
* someone calls `center(x, y)` via the emitter. You should pass
* a function that takes (x, y) and recenters your viewBox accordingly.
*/
export function useZoomPanSubscriber(onCenter) {
    useEffect(() => {
        const sub = zoomCenter$.subscribe(({ x, y }) => {
            onCenter(x, y);
        });
        return () => sub.unsubscribe();
    }, [onCenter]);
}

/**
* useZoomPanEmitter
*
* Returns an object with a `.center(x, y)` method. Calling
* `center(x, y)` here will notify all subscribers registered
* via useZoomPanSubscriber.
*/
export function useZoomPanEmitter() {
    return {
        center: (x, y) => {
            zoomCenter$.next({ x, y });
        },
    };
}
