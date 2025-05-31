import { ReactSVG } from 'react-svg'

export default function SignalRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    return (
        <g className="signal" transform={`translate(${x}, ${y})`}>
            <g transform={`rotate(${object.rot.y}) translate(-2, -2)`}>
                <ReactSVG
                    src="/assets/signal.svg"
                    wrapper='svg'

                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '1mm');
                        svg.setAttribute('height', '1mm');
                    }}
                />
            </g>
            <text x="2.5" y="0" textAnchor="start" dominantBaseline="middle">
                {object.getPrintableSignalName()}
            </text>
        </g>
    );
}
