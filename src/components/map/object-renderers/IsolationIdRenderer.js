import { useMemo } from "react";
import SimpleLabelText from "../text/SimpleLabelText";
import { TrackConnectionType } from "../../../model/track-connection";

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
        <IsolationEndMarker object={object} isStart={true} />
        <IsolationEndMarker object={object} />
    </>);
}

function IsolationEndMarker(props) {
    const { object, isStart = false } = props;

    const isShown = useMemo(() => {
        return object.connections.some(conn =>
            (isStart ? conn.type === TrackConnectionType.START : conn.type === TrackConnectionType.END) &&
            conn.otherTrack.id_isolation !== object.id_isolation
        );
    }, [object, isStart]);

    if (!isShown) return null;

    const pos = isStart ? object.points.start : object.points.end;
    const [x, y] = pos.toSVGCoords();
    const angle = isStart ? object.getStartAngleXZ() : object.getEndAngleXZ();

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return <path
        className="isolation-end-marker"
        d={`M ${x - 1.5 * cos} ${y - 1.5 * sin} L ${x + 1.5 * cos} ${y + 1.5 * sin}`}
    />          
}
