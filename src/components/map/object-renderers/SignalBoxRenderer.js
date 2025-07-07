import { ReactSVG } from 'react-svg';
import AlwaysUpText from '../text/AlwaysUpText';

export default function SignalBoxRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();
    const text = object.getPrintableSignalBoxName();
    
    const rotDiff = object.def.undef ? Math.round(object.rot.y / 90) * (-90) : object.def.rot * 90;
    const rot = object.rot.y + rotDiff;
    
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
            <AlwaysUpText
                baseRot={rot - 90}
                additionalRot={180}
                offsetY={6}
                textProps={{
                    textAnchor: 'middle'
                }}
                text={text}
            />
        </g>
    );
}
    