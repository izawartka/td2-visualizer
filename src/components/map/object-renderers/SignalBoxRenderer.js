import { ReactSVG } from 'react-svg';
import AlwaysUpText from '../text/AlwaysUpText';
import SimpleLabelText from '../text/SimpleLabelText';

export default function SignalBoxRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();
    const rot = object.getFinalRotation();
    
    return (
        <g className="signalbox" transform={`translate(${x}, ${y})`}>
            <g className="signalbox-icon" transform={`rotate(${rot}) translate(-4.725, -4.725)`}>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/signalboxes/${object.def.icon}`}
                    wrapper='svg'
                    
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '2.5mm');
                        svg.setAttribute('height', '2.5mm');
                    }}
                />
            </g>
            <SignalBoxText object={object} rot={rot} />
        </g>
    );
}

function SignalBoxText(props) {
    const { object, rot } = props;
    const text = object.getPrintableSignalBoxName();

    if (object.def?.empty) {
        return <SimpleLabelText
            text={text}
            textProps={{ y: 6 }}
        />;
    }

    return (
        <AlwaysUpText
            baseRot={rot - 90}
            additionalRot={180}
            additionalPreRot={rot}
            offsetY={6}
            textProps={{
                textAnchor: 'middle'
            }}
            text={text}
        />
    );
}
