export default function SwitchNameRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();
    const text = object.id_switch;

    return (
        <text
            x={x}
            y={y}
            textAnchor='middle'
            id={`switch-${object.id}`}
            style={{ userSelect: "none" }}
            className="switch-name"
        >
            {text}
        </text>
    );
}
