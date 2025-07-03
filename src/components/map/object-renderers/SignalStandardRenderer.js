import { ReactSVG } from "react-svg";
import AngleHelper from "../../../helpers/angleHelper";

export default function SignalStandardRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    const rot = AngleHelper.normalizeDegAngle(object.rot.y);
    const upsideDown = rot >= 180;
    const upsideDownRot = upsideDown ? 90 : -90;
    const anchor = upsideDown ? "end" : "start";

    return (
        <g className="signal" transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <g className="signal-icon" transform={`translate(-1.89, -1.89)`}>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/signal.svg`}
                    wrapper='svg'

                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '1mm');
                        svg.setAttribute('height', '1mm');
                    }}
                />
            </g>
            <g transform={`translate(0, -2) rotate(${upsideDownRot})`}>
                <text x="0" y="0" textAnchor={anchor} dominantBaseline="middle">
                    {object.getPrintableSignalName()}
                </text>
            </g>
        </g>
    );
}
