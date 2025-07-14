import TrackHoverInfoConsts from "./TrackHoverInfoConsts";

export default function TrackHoverInfoPopup(props) {
    const { track } = props;

    const slopeArr = Array.from(new Set([
        Math.abs(track['start_slope']),
        Math.abs(track['end_slope'])
    ]));
    const slopeOptions = {join: ' / ', subOptions: {suffix: ' ‰'}};

    return (
        <div className="track-hover-info-popup">
            <table>
                <tbody>
                    <InfoPopupItem value={track['id_station']} label="Track ID" />
                    <InfoPopupItem value={track['id_isolation']} label="Isolation ID" />
                    <InfoPopupItem value={track['derailspeed']} label="Derail speed" options={{suffix: ' km/h'}} />
                    <InfoPopupItem value={track['maxspeed']} label="Max. speed" options={{suffix: ' km/h'}} />
                    <InfoPopupItem value={slopeArr} label="Slope" options={slopeOptions} />
                    <InfoPopupItem value={track['electrificationStatus']} label="Electrification" options={{translationConstKey: 'electrification'}} />
                    <InfoPopupItem value={track['type']} label="Type" options={{translationConstKey: 'type'}} />
                    <InfoPopupItem value={track.shape.type} label="Shape" options={{translationConstKey: 'shape'}} />
                    <InfoPopupItem value={track.shape.length} label="Length" options={{suffix: ' m', precision: 2}} />
                    <InfoPopupShapeItems shape={track.shape} />
                    <InfoPopupSwitchItems track={track} />
                </tbody>
            </table>
        </div>
    );
}

function InfoPopupShapeItems(props) {
    const { shape } = props;

    if (shape.type === 'ShapeArc') {
        return <>
            <InfoPopupItem value={Math.abs(shape.radius)} label="Radius" options={{suffix: ' m', precision: 0}} />
        </>
    }

    return null;
}

function InfoPopupSwitchItems(props) {
    const { track } = props;
    if (!track.switch) return null;

    return <>
        <InfoPopupItem value={track.switch.id_switch} label="Switch ID" />
        <InfoPopupItem value={track.switch.bare_model} label="Switch model" />
    </>
}

function processItemValue(value, options) {
    const { translationConstKey, join, subOptions, suffix } = options || {};

    if (Array.isArray(value)) {
        return value.map(item => processItemValue(item, subOptions)).join(join || ", ");
    }

    if (translationConstKey) {
        return TrackHoverInfoConsts[translationConstKey]?.[value] || value;
    }

    if (value === undefined || value === null || value === '') {
        return "N/A";
    }

    if (typeof value === 'number' && 'precision' in options) {
        value = value.toFixed(options.precision);
    }

    return `${value}${suffix || ''}`.trim();
}

function InfoPopupItem({ label, value, options = {} }) {
    const textValue = processItemValue(value, options);

    return (
        <tr>
            <th>{label}</th>
            <td>{textValue}</td>
        </tr>
    );
}
