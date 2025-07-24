import { useEffect, useState } from "react";
import { mapRotation$ } from "../../../services/mapRotationService";
import AngleHelper from "../../../helpers/angleHelper";

export default function DistanceMeterText(props) {
    const [mapRotation, setMapRotation] = useState(0);
    const { start, end, totalDistance } = props;

    const cx = (start[0] + end[0]) / 2;
    const cy = (start[1] + end[1]) / 2;
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = AngleHelper.radToDeg(Math.atan2(dy, dx));
    const rotation = AngleHelper.normalizeDegAngle(mapRotation + angle);
    const upsideDown = rotation >= 90 && rotation <= 270;
    const x = cx + len / 2;
    const y = cy + (upsideDown ? 2 : -2);

    useEffect(() => {
        const subscription = mapRotation$.subscribe(date => {
            setMapRotation(date);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <text
            x={x}
            y={y}
            transform={`rotate(${angle}, ${cx}, ${cy}) rotate(${upsideDown ? 180 : 0}, ${x}, ${y})`}
            fill="black"
            fontSize="10"
            textAnchor={upsideDown ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ userSelect: 'none' }}
        >
            &nbsp;&nbsp;{totalDistance.toFixed(2)}&nbsp;m&nbsp;&nbsp;
        </text>
    );
}
