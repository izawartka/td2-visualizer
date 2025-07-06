import { useCallback, useEffect, useRef } from "react";
import { mapRotation$ } from "../../../services/mapRotationService";

export default function SimpleLabelText(props) {
    const { text, x, y, wrapperStyle } = props;
    const gRef = useRef(null);

    const getTransformString = useCallback((rot) => (
        `translate(${x || 0}, ${y || 0}) rotate(${rot})`
    ), [x, y]);

    useEffect(() => {
        const subscription = mapRotation$.subscribe(rotation => {
            if(!gRef.current) return;

            gRef.current.setAttribute("transform", getTransformString(-rotation));
        });

        return () => subscription.unsubscribe();
    }, [getTransformString]);

    return (
        <g transform={getTransformString(0)} ref={gRef} style={wrapperStyle}>
            <text textAnchor="middle" dominantBaseline="middle" {...props} x={null} y={null}>
                {text}
            </text>
        </g>
    );
}