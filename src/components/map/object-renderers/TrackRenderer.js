
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

    const x1 = object.points.x1;
    const z1 = -object.points.z1;
    const x2 = object.points.x2;
    const z2 = -object.points.z2;
    const ra = Math.abs(object.r);

    let d;
    if (object.r < 0) {
        d = `M${x1},${z1} A${ra} ${ra} 0 0 1 ${x2},${z2}`;
    } else if (object.r > 0) {
        d = `M${x2},${z2} A${ra} ${ra} 0 0 1 ${x1},${z1}`;
    } else {
        d = `M${x1},${z1} L${x2},${z2}`;
    }

    const color = Constants.map.useTrackColors ? (
        object.r === 0 ? "rgb(255, 255, 255)" : "rgb(255, 0, 255)" 
    ): undefined;

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

    const x1 = object.points.x1;
    const z1 = -object.points.z1;
    const cx1 = object.points.cx1+object.points.x1;
    const cz1 = -object.points.cz1-object.points.z1;
    const cx2 = object.points.cx2+object.points.x2;
    const cz2 = -object.points.cz2-object.points.z2;
    const x2 = object.points.x2;
    const z2 = -object.points.z2;

    const d = `M${x1},${z1} C${cx1},${cz1} ${cx2},${cz2} ${x2},${z2}`;
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
