import { useEffect } from 'react';
import { Subject } from 'rxjs';

const zoomCenter$ = new Subject();

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
