import { ReactSVG } from 'react-svg'

export default function NEVPRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    return (
        <g className="map-icon" transform={`translate(${x}, ${y}) rotate(${object.rot.y}) translate(-1.89, -1.89)`}>
            <ReactSVG
                src={`${process.env.PUBLIC_URL}/assets/nevp.svg`}
                wrapper='svg'

                beforeInjection={(svg) => {
                    svg.setAttribute('width', '1mm');
                    svg.setAttribute('height', '1mm');
                }}
            />
        </g>
    );
}
