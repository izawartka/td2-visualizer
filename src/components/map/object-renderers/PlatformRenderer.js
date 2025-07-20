export default function PlatformRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();
    if(!object.def) return null;

    const [centerX, centerY] = object.def.center.toSVGCoords();
    const sizeX = object.def.size.x;
    const sizeY = object.def.size.z;

    return (
        <g className="platform" transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <rect
                x={-sizeX / 2 + centerX}
                y={-sizeY / 2 + centerY}
                width={sizeX}
                height={sizeY}
            />
        </g>
    );
}
