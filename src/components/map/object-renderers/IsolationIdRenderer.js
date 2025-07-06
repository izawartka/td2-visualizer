import SimpleLabelText from "../text/SimpleLabelText";

export default function IsolationIdRenderer(props) {
    const { object } = props;
    const pos = object.points.start.lerp(object.points.end, 0.5);
    const [x, y] = pos.toSVGCoords();
    const text = object.id_isolation ?? '';

    if (object.hide_isolation || !text) {
        return null;
    }

    return <SimpleLabelText
        text={text}
        className="isolation-id"
        x={x}
        y={y}
    />
}
