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
            <SignTextRenderer object={object} />
        </g>
    );
}

function SignTextRenderer(props) {
    const { object } = props;

    const textSources = !!object.def.text ? Array.isArray(object.def.text) ? object.def.text : [object.def.text] : [];
    let text = null;
    for(const source of textSources) {
        text = getSignText(object, source);
        if(text) break;
    }

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
            {text}
        </text>
    );
}

function getSignText(object, source) {
    switch(source) {
        case "fun":
            return object.def.textFun ? object.def.textFun(object) : null;
        case "data":
            return object.data ?? null;
        case "static":
            return object.def.staticText ?? null;
        default:
            console.warn(`Unknown sign ${object.id} text source: ${source}`);
            return null;
    }
}
