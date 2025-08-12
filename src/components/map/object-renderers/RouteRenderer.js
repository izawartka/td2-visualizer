import { ReactSVG } from "react-svg";
import AlwaysUpText from "../text/AlwaysUpText";
import AngleHelper from "../../../helpers/angleHelper";

export default function RouteRenderer(props) {
    const { object } = props;

    const [startX, startY] = object.pos.toSVGCoords();
    const startAngle = object.rot.y;

    const [endX, endY] = object.end_center.toSVGCoords();
    const endAngle = AngleHelper.radToDeg(object.end_angle_rad);

    const offY = object.track_count === 2 ? -22 : -20;
    const arrowOffset = - object.track_offset - 37.8;

    return (<>
        <g className="map-icon" transform={`translate(${endX}, ${endY}) rotate(${endAngle + 90}) translate(-80, ${arrowOffset})`}>
            <ReactSVG
                src={`${process.env.PUBLIC_URL}/assets/route.svg`}
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
                    className: "route-text"
                }}
                text={object.route_name}
            />
        </g>
    </>);
}
