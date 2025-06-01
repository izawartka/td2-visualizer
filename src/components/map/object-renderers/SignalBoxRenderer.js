import { ReactSVG } from 'react-svg';
import AngleHelper from '../../../helpers/angleHelper';

export default function SignalBoxRenderer(props) {
  const { object } = props;
  if (!object.isSignalBox) return null;
  const [x, y] = object.pos.toSVGCoords();
  const text = `"${object.name}"`;

  const rot = AngleHelper.normalizeDegAngle(object.rot.y);
  const upsideDown = rot >= 90 && rot < 270;
  const upsideDownRot = upsideDown ? 180 : 0;

  return (
    <g className="signalbox" transform={`translate(${x}, ${y}) rotate(${object.rot.y}) `}>
      <g className="signalbox-icon" transform={`translate(-4.725, -4.725)`}>
          <ReactSVG
              src="/assets/signalbox.svg"
              wrapper='svg'

              beforeInjection={(svg) => {
                  svg.setAttribute('width', '2.5mm');
                  svg.setAttribute('height', '2.5mm');
              }}
          />
      </g>
      <g transform={`translate(0, 5) rotate(${upsideDownRot})`}>
          <text x="0" y="0" textAnchor="middle" dominantBaseline="middle">
              {text}
          </text>
      </g>
    </g>
  );
}
