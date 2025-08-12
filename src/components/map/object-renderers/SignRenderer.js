import { ReactSVG } from 'react-svg'

export default function SignRenderer(props) {
    const { object } = props;
    const shouldRender = object.def?.icon && !object.attached_skip_rendering;
    if (!shouldRender) return null;

    const [x, y] = object.pos.toSVGCoords();

    const offX = -1.89 + (object.def.offsetX || 0);
    const offY = -1.89 + (object.def.offsetY || 0);
    const rot = object.rot.y + (object.def.rot || 0) * 90;
    const width = object.def.width || 1;
    const height = object.def.height || 1;

    return (
        <g transform={`translate(${x}, ${y}) rotate(${rot}) translate(${offX}, ${offY})`}>
            <g className='map-icon'>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/signs/${object.def.icon}`}
                    wrapper='svg'

                    beforeInjection={(svg) => {
                        svg.setAttribute('width', `${width}mm`);
                        svg.setAttribute('height', `${height}mm`);
                    }}
                />
            </g>
            <SignTextRenderer object={object} />
        </g>
    );
}

function SignTextRenderer(props) {
    const { object } = props;
    if(!object.text) return;

    const x = object.def.textOffsetX || 0;
    const y = object.def.textOffsetY || 0;

    return (
        <text
            className="sign-data-text"
            transform={`translate(${x}, ${y})`}
            style={{ fontSize: `${object.def.textSize}mm` }}
            textAnchor="middle"
            dominantBaseline="central"
        >
            {object.text}
        </text>
    );
}
