import { useCallback, useEffect, useRef } from "react";
import AngleHelper from "../../../helpers/angleHelper";
import { mapRotation$ } from "../../../services/mapRotationService";

export default function AlwaysUpText(props) {
    const { baseRot, additionalRot, additionalPreRot, text, reverseAnchor, offsetX, offsetY, textProps } = props;
    const gRef = useRef(null);
    const textRef = useRef(null);
    
    const getTransformString = useCallback((upsideDown) => {
        const upsideDownRot = upsideDown ? 180 : 0;
        return `rotate(${additionalPreRot || 0}) translate(${offsetX || 0}, ${offsetY || 0}) rotate(${upsideDownRot + (additionalRot || 0)})`;
    }, [additionalRot, additionalPreRot, offsetX, offsetY]);

    const getTextAnchor = useCallback((upsideDown) => {
        return (upsideDown !== (reverseAnchor || false)) ? "end" : "start";
    }, [reverseAnchor]);

    const update = useCallback((mapRotation) => {
        if (!gRef.current || !textRef.current) return;

        const adjustedRot = AngleHelper.normalizeDegAngle(baseRot + mapRotation);
        const upsideDown = adjustedRot >= 180;
        gRef.current.setAttribute("transform", getTransformString(upsideDown));
        if (!textProps?.textAnchor) {
            textRef.current.setAttribute("text-anchor", getTextAnchor(upsideDown));
        }
    }, [baseRot, getTransformString, getTextAnchor, textProps]);

    useEffect(() => {
        const subscription = mapRotation$.subscribe(rotation => {
            update(rotation);
        });

        return () => subscription.unsubscribe();
    }, [update]);

    return (
        <g transform={getTransformString(false)} ref={gRef}>
            <text textAnchor={getTextAnchor(false)} dominantBaseline='middle' ref={textRef} {...textProps}>
                {text}
            </text>
        </g>
    );
}