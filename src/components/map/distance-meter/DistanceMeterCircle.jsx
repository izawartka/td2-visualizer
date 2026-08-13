import { useRef, useCallback } from 'react';
import { getSVGCoords } from './get-svg-coords';

export default function DistanceMeterCircle(props) {
    const { point, index, setDistancePoints } = props;
    const isDraggingRef = useRef(false);

    const updatePointPosition = useCallback((event) => {
        const pos = getSVGCoords(event);
        if (!pos) return;

        setDistancePoints(oldPoints => {
            if (!Array.isArray(oldPoints)) return oldPoints;
            const newPoints = [...oldPoints];
            newPoints[index] = pos;
            return newPoints;
        });
    }, [setDistancePoints, index]);

    const removePoint = useCallback(() => {
        setDistancePoints(oldPoints => {
            if (!Array.isArray(oldPoints)) return oldPoints;
            const newPoints = [...oldPoints];
            newPoints.splice(index, 1);
            return newPoints;
        });
    }, [setDistancePoints, index]);

    const onPointerDown = useCallback((event) => {
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.setPointerCapture(event.pointerId);

        isDraggingRef.current = true;
    }, []);

    const onPointerUp = useCallback((event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!isDraggingRef.current) return;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        isDraggingRef.current = false;
        updatePointPosition(event);
    }, [updatePointPosition]);

    const onPointerMove = useCallback((event) => {
        if (!isDraggingRef.current) return;

        event.stopPropagation();
        event.preventDefault();
        updatePointPosition(event);
    }, [updatePointPosition]);

    const onPointerCancel = useCallback((event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        isDraggingRef.current = false;
    }, []);

    const onContextMenu = useCallback((event) => {
        event.stopPropagation();
        event.preventDefault();

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        isDraggingRef.current = false;
        removePoint();
    }, [removePoint]);

    return (
        <g
            className="distance-meter-circle"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            onPointerCancel={onPointerCancel}
            onContextMenu={onContextMenu}
        >
            <circle
                cx={point[0]}
                cy={point[1]}
                r={3}
                fill="transparent"
            />
            <circle
                cx={point[0]}
                cy={point[1]}
                r={1}
                fill="red"
            />
        </g>
    );
}
