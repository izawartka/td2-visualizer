import SimpleLabelText from "../text/SimpleLabelText";

export default function IsolationIdRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();
    const text = object.id_isolation ?? '';
    if (!text) return null;

    return (<SimpleLabelText
        text={text}
        x={x}
        y={y}
        textProps={{
            className: "isolation-id"
        }}
    />);
}
