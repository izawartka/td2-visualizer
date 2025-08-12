import SimpleLabelText from "../text/SimpleLabelText";

export default function IsolationIdRenderer(props) {
    const { object } = props;

    const text = object.id_isolation ?? '';
    if (!text) return null;

    let pos = (object.type === 'Switch' ? object.isolation_id_pos : object.points.middle) ?? object.pos;
    const [x, y] = pos.toSVGCoords();

    return (<SimpleLabelText
        text={text}
        x={x}
        y={y}
        textProps={{
            className: "isolation-id-text"
        }}
    />);
}
