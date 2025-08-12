import SimpleLabelText from "../text/SimpleLabelText";

export default function SwitchNameRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();
    const text = object.id_switch;

    return <SimpleLabelText
        text={text}
        x={x}
        y={y}
        textProps={{
            className: "switch-name-text"
        }}
    />;
}
