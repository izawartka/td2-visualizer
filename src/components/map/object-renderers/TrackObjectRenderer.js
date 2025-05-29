export default function TrackObjectRenderer(props) {
    const { object } = props;

    const x = object.x;
    const z = -object.z;
    const text = `${object.prefab_name};${object.name}`

    return (
        <g className="track-object">
            <circle
                cx={x}
                cy={z}
                r='1px'
            ></circle>
            <text
                x={x}
                y={z}
                id={`track-object-${object.id}`}
                style={{ userSelect: "none" }}
                enableBackground="new 0 0 100 100"
            >
                {text}
            </text>
        </g>
    );
}
