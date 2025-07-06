import { useEffect, useState } from "react";
import AngleHelper from "../../../helpers/angleHelper";
import { mapRotation$ } from "../../../services/mapRotationService";

export default function AlwaysUpText(props) {
    const [mapRotation, setMapRotation] = useState(0);
    const { baseRot, additionalRot, text, reverseAnchor, offsetX, offsetY } = props;
    
    const adjustedRot = AngleHelper.normalizeDegAngle(baseRot + mapRotation);
    const upsideDown = adjustedRot >= 180;
    const upsideDownRot = upsideDown ? 180 : 0;
    const anchor = (upsideDown !== !!reverseAnchor) ? "end" : "start";

    useEffect(() => {
        const subscription = mapRotation$.subscribe(rotation => {
            setMapRotation(rotation);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <g transform={`translate(${offsetX || 0}, ${offsetY || 0}) rotate(${upsideDownRot + additionalRot})`}>
            <text textAnchor={anchor} dominantBaseline='middle' {...props}>
                {text}
            </text>
        </g>
    );
}