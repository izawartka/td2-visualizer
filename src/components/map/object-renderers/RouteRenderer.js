import { useMemo } from "react";
import { ReactSVG } from "react-svg";

export default function RouteRenderer(props) {
    const { object } = props;

    const x = object.x;
    const z = -object.z;

    const upsideDown = useMemo(() => {
        let rot = object.ry;
        if (rot < 0) {
            rot += 360 * Math.ceil(Math.abs(rot) / 360);
        } else if (rot >= 360) {
            rot -= 360 * Math.floor(rot / 360);
        }

        return rot > 180;
    }, [object.ry]);

    const upsideDownRot = upsideDown ? 90 : -90;
    const offY = object.track_count === 2 ? -22 : -20;
    const anchor = upsideDown ? "start" : "end";
    const arrowOffset = - object.track_offset - 37.8;

    return (
        <g className="route" transform={`translate(${x}, ${z}) rotate(${object.ry})`}>
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
