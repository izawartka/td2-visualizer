import { useContext, useEffect, useRef, useCallback } from "react";
import Constants from '../../../helpers/constants';
import SceneryContext from "../../../contexts/SceneryContext";
import DistanceMeterContext from "../../../contexts/DistanceMeterContext";
import { getSVGCoords } from "./get-svg-coords";
import DistanceMeterView from "./DistanceMeterView";

export default function DistanceMeter() {
    const { distancePoints, setDistancePoints } = useContext(DistanceMeterContext);
    const { scenery } = useContext(SceneryContext);
    const pointersRef = useRef(new Set());
    const mainPointerIdRef = useRef(null);
    const pointerDownPosRef = useRef(null);
    
    const onPointerUp = useCallback((event) => {
        const dx = pointerDownPosRef.current?.x - event.clientX;
        const dy = pointerDownPosRef.current?.y - event.clientY;

        pointersRef.current.delete(event.pointerId);
        if (mainPointerIdRef.current !== event.pointerId) return;
        mainPointerIdRef.current = null;
        pointerDownPosRef.current = null;

        if (pointersRef.current.size > 0) return;

        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > Constants.map.distanceMeterMaxMovePx) return;
        
        setDistancePoints(oldDistancePoints => {
            if(!Array.isArray(oldDistancePoints)) return oldDistancePoints;
            const pos = getSVGCoords(event);
            if(!pos) return oldDistancePoints;

            return [...oldDistancePoints, pos];
        });
    }, [setDistancePoints]);

    const onPointerDown = useCallback((event) => {
        pointersRef.current.add(event.pointerId);
        if(mainPointerIdRef.current !== null) return;

        mainPointerIdRef.current = event.pointerId;
        pointerDownPosRef.current = {
            x: event.clientX,
            y: event.clientY
        };
    }, []);

    const onPointerLeave = useCallback((event) => {
        pointersRef.current.delete(event.pointerId);
        if (mainPointerIdRef.current !== event.pointerId) 

        mainPointerIdRef.current = null;
        pointerDownPosRef.current = null;
    }, []);

    useEffect(() => {
        setDistancePoints([]);
    }, [setDistancePoints]);

    if(!scenery || !Array.isArray(distancePoints)) return null;

    return (
        <g className="distance-meter">
            <rect 
                fill="transparent"
                x={scenery.bounds.minX}
                y={-scenery.bounds.maxZ}
                width={scenery.bounds.maxX - scenery.bounds.minX}
                height={scenery.bounds.maxZ - scenery.bounds.minZ}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerLeave}
                onPointerLeave={onPointerLeave}
                no-export="true"
            />
            <DistanceMeterView distancePoints={distancePoints} setDistancePoints={setDistancePoints} />
        </g>
    );
}
