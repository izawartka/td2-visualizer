import { ReactSVG } from 'react-svg'
import AngleHelper from '../../../helpers/angleHelper';

export default function DerailerRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    const rot = AngleHelper.normalizeDegAngle(object.rot.y);
    const upsideDown = rot >= 180;
    const upsideDownRot = upsideDown ? 90 : -90;
    const anchor = upsideDown ? "end" : "start";

    return (
        <g className="derailer" transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <g className="derailer-icon" transform={`translate(-2.835, -2.835)`}>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/derailer.svg`}
                    wrapper='svg'

                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '1.5mm');
                        svg.setAttribute('height', '1.5mm');
                    }}
                />
            </g>
            <g transform={`translate(0, -2) rotate(${upsideDownRot})`}>
                <text x="0" y="0" textAnchor={anchor} dominantBaseline="middle">
                    {object.getPrintableDerailerName()}
                </text>
            </g>
        </g>
    );
}
