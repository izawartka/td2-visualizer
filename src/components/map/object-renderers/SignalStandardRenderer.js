import { ReactSVG } from "react-svg";
import AlwaysUpText from "../text/AlwaysUpText";

export default function SignalStandardRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

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
            <AlwaysUpText
                baseRot={object.rot.y}
                additionalRot={-90}
                offsetY={-2}
                text={object.getPrintableSignalName()}
            />
        </g>
    );
}
