import { useRef } from 'react';
import { getSVGCoords } from './get-svg-coords';

export default function DistanceMeterCircle(props) {
    const { point, index, setDistancePoints } = props;
    const isDragged = useRef(false);

    const updatePointPosition = (event) => {
        const pos = getSVGCoords(event);
        if (!pos) return;

        setDistancePoints(oldPoints => {
            if (!Array.isArray(oldPoints)) return oldPoints;
            const newPoints = [...oldPoints];
            newPoints[index] = pos;
            return newPoints;
        });
    }

    const removePoint = () => {
        setDistancePoints(oldPoints => {
            if (!Array.isArray(oldPoints)) return oldPoints;
            const newPoints = [...oldPoints];
            newPoints.splice(index, 1);
            return newPoints;
        });
    }

    const onMouseDown = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (isDragged.current) return;
        isDragged.current = true;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
    }

    const onMouseUp = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!isDragged.current) return;
        isDragged.current = false;

        document.removeEventListener('mousemove', onMouseMove);
        updatePointPosition(event);
    }

    const onMouseMove = (event) => {
        if (!isDragged.current) return;

        event.stopPropagation();
        event.preventDefault();
        updatePointPosition(event);
    }

    const onContextMenu = (event) => {
        event.stopPropagation();
        event.preventDefault();
        removePoint();
    }

    return (
        <g 
            className="distance-meter-circle"
            onMouseDown={onMouseDown}
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
