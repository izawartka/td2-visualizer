import { ReactSVG } from 'react-svg';
import AngleHelper from '../../../helpers/angleHelper';

export default function SignalBoxRenderer(props) {
  const { object } = props;
  const [x, y] = object.pos.toSVGCoords();
  const text = object.getPrintableSignalBoxName();

  const rotDiff = object.def.undef ? Math.round(object.rot.y / 90) * (-90) : object.def.rot * 90;
  const rot = AngleHelper.normalizeDegAngle(object.rot.y + rotDiff);
  const upsideDown = rot >= 90 && rot < 270;
  const upsideDownRot = upsideDown ? 180 : 0;

  return (
    <g className="signalbox" transform={`translate(${x}, ${y}) rotate(${rot})`}>
      <g className="signalbox-icon" transform={`translate(-4.725, -4.725)`}>
          <ReactSVG
              src={`${process.env.PUBLIC_URL}/assets/signalboxes/${object.def.icon}`}
              wrapper='svg'

              beforeInjection={(svg) => {
                  svg.setAttribute('width', '2.5mm');
                  svg.setAttribute('height', '2.5mm');
              }}
          />
      </g>
      <g transform={`translate(0, 6) rotate(${upsideDownRot})`}>
          <text x="0" y="0" textAnchor="middle" dominantBaseline="middle">
              {text}
          </text>
      </g>
    </g>
  );
}
