import { useEffect } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';

const zoomCenter$ = new Subject();
const viewAlign$ = new Subject();

// BehaviorSubjects to store current viewBox, clientRect and camera transform
export const viewBox$ = new BehaviorSubject(null);
export const clientRect$ = new BehaviorSubject(null);
export const camera$ = new BehaviorSubject(0);

export function getCurrentViewBox() {
    return viewBox$.getValue();
}

export function getCurrentClientRect() {
    return clientRect$.getValue();
}

export function getCurrentCamera() {
    return camera$.getValue();
}

export function useZoomPanSubscriber(onCenter, onAlign) {
    useEffect(() => {
        const sub = zoomCenter$.subscribe(({ x, y }) => {
            onCenter(x, y);
        });
        return () => sub.unsubscribe();
    }, [onCenter]);

    useEffect(() => {
        const sub = viewAlign$.subscribe((angleDeg) => {
            onAlign(angleDeg);
        });
        return () => sub.unsubscribe();
    }, [onAlign]);
}

export function useZoomPanEmitter() {
    return {
        center: (x, y) => {
            zoomCenter$.next({ x, y });
        },
        alignView: (angleDeg) => {
            viewAlign$.next(angleDeg);
        },
    };
}
