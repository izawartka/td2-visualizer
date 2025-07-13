import { useMemo } from "react";
import { TrackConnectionEnd } from "../../../model/track-connection";

export default function IsolationEndRenderer(props) {
    const { object } = props;
    return (<>
        <IsolationEndMarker object={object} end={TrackConnectionEnd.START} />
        <IsolationEndMarker object={object} end={TrackConnectionEnd.END} />
    </>);
}

function IsolationEndMarker(props) {
    const { object, end = false } = props;

    const isShown = useMemo(() => {
        return object.connections.some((conn) => {
            const isCorrectEnd = conn.end === end;
            const isolationIdChanged = conn.otherTrack.id_isolation !== object.id_isolation;

            // Prevent the marker from showing twice for both tracks
            const isPreferred = object.id < conn.otherTrackId;

            return isCorrectEnd && isolationIdChanged && isPreferred;
        });
    }, [object, end]);

    if (!isShown) return null;

    const pos = object.shape.getEndPos(end);
    const [x, y] = pos.toSVGCoords();
    const angle = object.shape.getEndAngleXZ(end);

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return <path
        className="isolation-end-marker"
        d={`M ${x - 1.5 * cos} ${y - 1.5 * sin} L ${x + 1.5 * cos} ${y + 1.5 * sin}`}
    />
}
