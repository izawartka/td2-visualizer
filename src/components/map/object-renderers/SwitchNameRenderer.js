export default function SwitchNameRenderer(props) {
    const { object } = props;

    const x = object.x;
    const z = -object.z;
    const text = object.id_switch;

    return (
        <text
            x={x}
            y={z}
            textAnchor='middle'
            id={`switch-${object.id}`}
            style={{ userSelect: "none" }}
            className="switch-name"
        >
            {text}
        </text>
    );
}
