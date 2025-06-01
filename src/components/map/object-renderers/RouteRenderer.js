import { ReactSVG } from "react-svg";
import AngleHelper from "../../../helpers/angleHelper";

export default function RouteRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    const rot = AngleHelper.normalizeDegAngle(object.rot.y);
    const upsideDown = rot >= 180;
    const upsideDownRot = upsideDown ? 90 : -90;
    const offY = object.track_count === 2 ? -22 : -20;
    const anchor = upsideDown ? "start" : "end";
    const arrowOffset = - object.track_offset - 37.8;

    return (
        <g className="route" transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <g transform={`rotate(90) translate(-80, ${arrowOffset})`}>
                <ReactSVG
                    src="/assets/route.svg"
                    wrapper='svg'
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '20mm');
                        svg.setAttribute('height', '20mm');
                    }}
                />
            </g>
            <g transform={`translate(${object.track_offset}, 0) rotate(${upsideDownRot})`}>
                <text x='0' y={offY} textAnchor={anchor} dominantBaseline="bottom">
                    {object.route_name}
                </text>
            </g>
        </g>
    );
}
