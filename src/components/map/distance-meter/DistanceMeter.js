import { useContext } from "react";
import MainContext from "../../../contexts/MainContext";
import DistanceMeterContext from "../../../contexts/DistanceMeterContext";
import { getSVGCoords } from "./get-svg-coords";
import DistanceMeterView from "./DistanceMeterView";

export default function DistanceMeter(props) {
    const { distancePoints, setDistancePoints } = useContext(DistanceMeterContext);
    const { scenery } = useContext(MainContext);

    const onClick = (event) => {
        setDistancePoints(oldDistancePoints => {
            if(!Array.isArray(oldDistancePoints)) return oldDistancePoints;
            const pos = getSVGCoords(event);
            if(!pos) return oldDistancePoints;

            return [...oldDistancePoints, pos];
        });
    }

    if(!scenery || !Array.isArray(distancePoints)) return null;

    return (
        <g className="distance-meter">
            <rect 
                fill="transparent"
                x={scenery.bounds.minX}
                y={-scenery.bounds.maxZ}
                width={scenery.bounds.maxX - scenery.bounds.minX}
                height={scenery.bounds.maxZ - scenery.bounds.minZ}
                onClick={onClick}
            />
            <DistanceMeterView distancePoints={distancePoints} setDistancePoints={setDistancePoints} />
        </g>
    );
}
