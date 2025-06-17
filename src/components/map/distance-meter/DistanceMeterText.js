export default function DistanceMeterText(props) {
    const { start, end, totalDistance } = props;

    const cx = (start[0] + end[0]) / 2;
    const cy = (start[1] + end[1]) / 2;
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const upsideDown = angle >= 90 || angle <= -90;
    const x = cx + len / 2;
    const y = cy + (upsideDown ? 2 : -2);

    return (
        <text
            x={x}
            y={y}
            transform={`rotate(${angle}, ${cx}, ${cy}) rotate(${upsideDown ? 180 : 0}, ${x}, ${y})`}
            fill="black"
            fontSize="10"
            textAnchor={upsideDown ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ userSelect: 'none' }}
        >
            &nbsp;&nbsp;{totalDistance.toFixed(2)}&nbsp;m&nbsp;&nbsp;
        </text>
    );
}
