export default function IsolationIdRenderer(props) {
    const { object } = props;

    const x1 = object.points?.x1;
    const z1 = -object.points?.z1;
    const x2 = object.points?.x2 ?? x1;
    const z2 = -object.points?.z2 ?? z1;
    const x = (x1 + x2) / 2;
    const z = (z1 + z2) / 2;
    const text = object.id_isolation ?? '';

    return (
        <text
            x={x}
            y={z}
            textAnchor='middle'
            id={`isolation-id-${object.id}`}
            style={{ userSelect: "none" }}
            className="isolation-id"
        >
            {text}
        </text>
    );
}
