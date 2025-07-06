import SimpleLabelText from "../text/SimpleLabelText";

export default function TrackObjectRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();
    const text = `${object.prefab_name};${object.name}`

    return (
        <g className="track-object">
            <rect
                x={x - 1}
                y={y - 1}
                width='2px'
                height='2px'
                fill='transparent'
                stroke='none'
            ></rect>
            <circle
                cx={x}
                cy={y}
                r='0.5px'
            ></circle>
            <SimpleLabelText
                text={text}
                className="track-object-label"
                x={x}
                y={y}
                enableBackground="new 0 0 100 100"
                wrapperStyle={{pointerEvents: 'none'}}
            />
        </g>
    );
}
