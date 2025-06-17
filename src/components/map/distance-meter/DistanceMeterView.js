import { useMemo } from 'react';
import DistanceMeterCircle from './DistanceMeterCircle';
import DistanceMeterLine from './DistanceMeterLine';

export default function DistanceMeterView(props) {
    const { distancePoints, setDistancePoints } = props;

    const Circles = useMemo(() => {
        return distancePoints.map((point, index) => (
            <DistanceMeterCircle 
                key={index} 
                point={point} 
                index={index} 
                setDistancePoints={setDistancePoints}
            />
        ));
    }, [distancePoints, setDistancePoints]);

    const Lines = useMemo(() => {
        if (distancePoints.length < 2) return null;
        let totalDistance = 0;
        return distancePoints.map((point, index) => {
            if (index === 0) return null; // Skip the first point since it has no previous point
            const start = distancePoints[index - 1];
            const end = point;
            const dx = end[0] - start[0];
            const dy = end[1] - start[1];
            const distance = Math.sqrt(dx * dx + dy * dy);
            totalDistance += distance;
            
            return <DistanceMeterLine 
                key={index} 
                start={start} 
                end={end} 
                startIndex={index - 1} 
                totalDistance={totalDistance} 
                setDistancePoints={setDistancePoints}
            />;
        });
    }, [distancePoints, setDistancePoints]);

    return (
        <g className="distance-meter-points">
            <g className="lines">
                {Lines}
            </g>
            <g className="circles">
                {Circles}
            </g>
        </g>
    );
}
