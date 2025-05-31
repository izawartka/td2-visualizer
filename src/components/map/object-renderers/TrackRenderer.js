
import Constants from "../../../helpers/constants";

export default function TrackRenderer(props) {
    const { object } = props;

    switch (object.type) {
        case "StandardTrack":
        case "PointTrack":
            return <StandardTrackR {...props} />;
        case "BezierTrack":
            return <BezierTrackR {...props} />;
        default:
            console.warn(`No renderer component for track type: ${object.type}`);
            return null;
    }
}

function StandardTrackR(props) {
    const { object } = props;
    const [x1, y1] = object.points.start.toSVGCoords();
    const [x2, y2] = object.points.end.toSVGCoords();
    const ra = Math.abs(object.r);

    let d;
    if (object.r < 0) {
        d = `M${x1},${y1} A${ra} ${ra} 0 0 1 ${x2},${y2}`;
    } else if (object.r > 0) {
        d = `M${x2},${y2} A${ra} ${ra} 0 0 1 ${x1},${y1}`;
    } else {
        d = `M${x1},${y1} L${x2},${y2}`;
    }

    const color = Constants.map.useTrackColors ? (
        object.r === 0 ? "rgb(0, 255, 255)" : "rgb(0, 0, 255)" 
    ) : undefined;

    return (
        <path
            d={d}
            id={`track-${object.id}`}
            stroke={color}
            className="track"
        />
    );
}

function BezierTrackR(props) {
    const { object } = props;

    const [x1, y1] = object.points.start.toSVGCoords();
    const [cx1, cy1] = object.points.control1.toSVGCoords();
    const [x2, y2] = object.points.end.toSVGCoords();
    const [cx2, cy2] = object.points.control2.toSVGCoords();

    const d = `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
    const color = Constants.map.useTrackColors ? "rgb(0, 255, 0)" : undefined;

    return (
        <path
            d={d}
            id={`btrack-${object.id}`}
            stroke={color}
            className="track"
        />
    );
}
