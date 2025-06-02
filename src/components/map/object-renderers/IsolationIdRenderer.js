export default function IsolationIdRenderer(props) {
    const { object } = props;
    const pos = object.points.start.lerp(object.points.end, 0.5);
    const [x, y] = pos.toSVGCoords();
    const text = object.id_isolation ?? '';

    if (object.hide_isolation || !text) {
        return null;
    }

    return (
        <text
            x={x}
            y={y}
            textAnchor='middle'
            id={`isolation-id-${object.id}`}
            style={{ userSelect: "none" }}
            className="isolation-id"
        >
            {text}
        </text>
    );
}
