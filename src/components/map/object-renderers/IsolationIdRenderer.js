import { useMemo } from "react";
import SimpleLabelText from "../text/SimpleLabelText";
import { TrackConnectionEnd } from "../../../model/track-connection";

export default function IsolationIdRenderer(props) {
    const { object } = props;
    const pos = object.points.start.lerp(object.points.end, 0.5);
    const [x, y] = pos.toSVGCoords();
    const text = object.id_isolation ?? '';

    const showText = (!object.hide_isolation && !!text);

    return (<>
        {showText && <SimpleLabelText
            text={text}
            x={x}
            y={y}
            textProps={{
                className: "isolation-id"
            }}
        />}
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

    const pos = object.getEndPos(end);
    const [x, y] = pos.toSVGCoords();
    const angle = object.getAngleXZForEnd(end);

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return <path
        className="isolation-end-marker"
        d={`M ${x - 1.5 * cos} ${y - 1.5 * sin} L ${x + 1.5 * cos} ${y + 1.5 * sin}`}
    />
}
