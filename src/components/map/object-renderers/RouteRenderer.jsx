import { useRef, useCallback, useEffect } from 'react';
import { ReactSVG } from "react-svg";
import AlwaysUpText from "../text/AlwaysUpText";
import AngleHelper from "../../../helpers/angleHelper";
import { useCameraSubscriber } from '../../../hooks/useZoomPubSub';
import Constants from '../../../helpers/constants';

export default function RouteRenderer(props) {
    const { object } = props;
    const textRef = useRef(null);

    const [startX, startY] = object.pos.toSVGCoords();
    const startAngle = object.rot.y;

    const [endX, endY] = object.end_center.toSVGCoords();
    const endAngle = AngleHelper.radToDeg(object.end_angle_rad);

    const offY = object.track_count === 2 ? -22 : -20;
    const arrowOffset = - object.track_offset - 37.8;

    const handleZoomTransparrency = useCallback((camera) => {
        if (!textRef.current?.style || !camera) return;

        const min = Constants.map.routeTextMinZoom;
        const max = Constants.map.routeTextMaxZoom;
        const value = (max - camera.zoom) / (max - min);
        const opacity = Math.pow(Math.min(Math.max(value, 0), 1), 2);
        textRef.current.style.opacity = opacity;
    }, [textRef]);

    useCameraSubscriber(handleZoomTransparrency);

    return (<>
        <g className="map-icon" transform={`translate(${endX}, ${endY}) rotate(${endAngle + 90}) translate(-80, ${arrowOffset})`}>
            <ReactSVG
                src={`${import.meta.env.BASE_URL}assets/route.svg`}
                wrapper='svg'
                beforeInjection={(svg) => {
                    svg.setAttribute('width', '20mm');
                    svg.setAttribute('height', '20mm');
                }}
            />
        </g>
        <g transform={`translate(${startX}, ${startY}) rotate(${startAngle})`}>
            <AlwaysUpText
                baseRot={startAngle}
                additionalRot={-90}
                offsetX={object.track_offset}
                reverseAnchor={true}
                textProps={{
                    y: offY,
                    dominantBaseline: "bottom",
                    className: "route-text",
                }}
                textRef={textRef}
                text={object.route_name}
            />
        </g>
    </>);
}
