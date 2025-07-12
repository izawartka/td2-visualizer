import { ReactSVG } from "react-svg";
import AlwaysUpText from "../text/AlwaysUpText";

export default function RouteRenderer(props) {
    const { object } = props;
    const [x, y] = object.end_center.toSVGCoords();
    const angle = object.end_angle_rad * 180 / Math.PI;

    const offY = object.track_count === 2 ? -22 : -20;
    const arrowOffset = - object.track_offset - 37.8;

    return (
        <g className="route" transform={`translate(${x}, ${y}) rotate(${angle})`}>
            <g transform={`rotate(90) translate(-80, ${arrowOffset})`}>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/route.svg`}
                    wrapper='svg'
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '20mm');
                        svg.setAttribute('height', '20mm');
                    }}
                />
            </g>
            <AlwaysUpText
                baseRot={angle}
                additionalRot={-90}
                offsetX={object.track_offset}
                reverseAnchor={true}
                textProps={{
                    y: offY,
                    dominantBaseline: "bottom"
                }}
                text={object.route_name}
            />
        </g>
    );
}
