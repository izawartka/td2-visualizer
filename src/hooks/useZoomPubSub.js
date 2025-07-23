import { useEffect } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';

const setCamera$ = new Subject();
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

export function useZoomPanSubscriber(setCamera, onAlign) {
    useEffect(() => {
        const sub = setCamera$.subscribe(({ x, y, rot, zoom }) => {
            setCamera(x, y, rot, zoom);
        });
        return () => sub.unsubscribe();
    }, [setCamera]);

    useEffect(() => {
        const sub = viewAlign$.subscribe((angleDeg) => {
            onAlign(angleDeg);
        });
        return () => sub.unsubscribe();
    }, [onAlign]);
}

export function useZoomPanEmitter() {
    return {
        setCamera: (x, y, rot = null, zoom = null) => {
            setCamera$.next({ x, y, rot, zoom });
        },
        alignView: (angleDeg) => {
            viewAlign$.next(angleDeg);
        },
    };
}
