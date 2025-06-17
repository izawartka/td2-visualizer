import { getSVGCoords } from './get-svg-coords';
import DistanceMeterText from './DistanceMeterText';

export default function DistanceMeterLine(props) {
    const { start, end, startIndex, setDistancePoints, totalDistance } = props;

    const insertPoint = (x, y) => {
        setDistancePoints(oldPoints => {
            if (!Array.isArray(oldPoints)) return oldPoints;
            const newPoints = [...oldPoints];
            newPoints.splice(startIndex + 1, 0, [x, y]);
            return newPoints;
        });
    }

    const onMouseDown = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const pos = getSVGCoords(event);
        if (!pos) return;
        insertPoint(...pos);
    }

    return (
        <g 
            className="distance-meter-line"
        >
            <DistanceMeterText start={start} end={end} totalDistance={totalDistance} />
            <line
                x1={start[0]}
                y1={start[1]}
                x2={end[0]}
                y2={end[1]}
                stroke="transparent"
                strokeWidth={3}
                onMouseDown={onMouseDown}
            />
            <line
                x1={start[0]}
                y1={start[1]}
                x2={end[0]}
                y2={end[1]}
                stroke="red"
                strokeWidth={0.5}
            />
        </g>
    );
}
