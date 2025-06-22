import { ReactSVG } from 'react-svg'
import AngleHelper from '../../../helpers/angleHelper';

export default function SpawnPointRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    const rot = AngleHelper.normalizeDegAngle(object.rot.y);
    const upsideDown = rot >= 180;
    const upsideDownRot = upsideDown ? 90 : -90;
    const anchor = upsideDown ? "start" : "end";

    return (
        <g className="spawn-point" transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <g className="signal-icon" transform={`rotate(180) translate(-2.835, -2.835)`}>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/spawn.svg`}
                    wrapper='svg'

                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '1.5mm');
                        svg.setAttribute('height', '1.5mm');
                    }}
                />
            </g>
            <g transform={`translate(0, 3) rotate(${upsideDownRot})`}>
                <text x="0" y="0" textAnchor={anchor} dominantBaseline="middle">
                    {object.getPrintableSpawnPointName()}
                </text>
            </g>
        </g>
    );
}
