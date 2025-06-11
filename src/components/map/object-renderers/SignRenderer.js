import { ReactSVG } from 'react-svg'

export default function SignRenderer(props) {
    const { object } = props;
    if(!object.def) return null;

    const [x, y] = object.pos.toSVGCoords();

    const offX = -1.89 + (object.def.offsetX || 0);
    const offY = -1.89 + (object.def.offsetY || 0);
    const width = object.def.width || 1;
    const height = object.def.height || 1;

    return (
        <g className="sign" transform={`translate(${x}, ${y}) rotate(${object.rot.y}) translate(${offX}, ${offY})`}>
            <ReactSVG
                src={`/assets/signs/${object.def.icon}`}
                wrapper='svg'

                beforeInjection={(svg) => {
                    svg.setAttribute('width', `${width}mm`);
                    svg.setAttribute('height', `${height}mm`);
                }}
            />
        </g>
    );
}
