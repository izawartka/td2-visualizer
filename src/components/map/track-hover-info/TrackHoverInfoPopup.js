import Constants from "../../../helpers/constants";
import { QuestionMarkIcon, SlopeIcon, SpeedIcon, HashIcon, LightningIcon, RadiusIcon } from "../../../icons";
import { TrackShape } from "../../../model/tracks/track";
import TrackHoverInfoConsts from "./TrackHoverInfoConsts";

export default function TrackHoverInfoPopup(props) {
    const { track } = props;

    const slopeValue = Array.from(new Set([
        Math.abs(track.start_slope).toFixed(1),
        Math.abs(track.end_slope).toFixed(1),
    ]));
    const slopeOptions = {join: ' / ', subOptions: {suffix: ' ‰'}};
    const showAlignHint = track.shape === TrackShape.STRAIGHT;

    return (
        <div className="track-hover-info-popup">
            <table>
                <tbody>
                    {Constants.map.showDebugTrackIds && (
                        <InfoPopupItem icon={HashIcon} value={track.id} label="Track ID" />
                    )}
                    <InfoPopupItem icon={HashIcon} value={track['id_isolation']} label="Isolation ID" />
                    <InfoPopupItem icon={SpeedIcon} value={track['derailspeed']} label="Derail speed" options={{suffix: ' km/h'}} />
                    <InfoPopupItem icon={SpeedIcon} value={track['maxspeed']} label="Max. speed" options={{suffix: ' km/h'}} />
                    <InfoPopupItem icon={LightningIcon} value={track['electrificationStatus']} label="Electrification" options={{translationConstKey: 'electrification'}} />
                    <InfoPopupItem icon={QuestionMarkIcon} value={track.shape} label="Type" options={{join: ' / ', translationConstKey: 'shape'}} />
                    <InfoPopupItem icon={SlopeIcon} value={slopeValue} label="Slope" options={slopeOptions} />
                    <InfoPopupSwitchItems track={track} />
                    <InfoPopupShapeItems track={track} />
                </tbody>
            </table>
            {showAlignHint && (
                <div className="track-hover-info-popup__align">
                    Double click to align the view
                </div>
            )}
        </div>
    );
}

function InfoPopupSwitchItems(props) {
    const { track } = props;
    if (!track.switch) return null;

    return <>
        <InfoPopupItem icon={HashIcon} value={track.switch.id_switch} label="Switch ID" />
        <InfoPopupItem icon={QuestionMarkIcon} value={track.switch.bare_model} label="Switch model" />
    </>
}

function InfoPopupShapeItems(props) {
    const { track } = props;
    if (track.r === 0) return null;

    return <InfoPopupItem icon={RadiusIcon} value={Math.abs(track.r)} label="Radius" options={{suffix: ' m', precision: 0}} />
}

function processItemValue(value, options) {
    const { translationConstKey, join, subOptions, suffix } = options || {};

    if (Array.isArray(value)) {
        return value.map(item => processItemValue(item, subOptions)).join(join || ", ");
    }

    if (translationConstKey) {
        return TrackHoverInfoConsts[translationConstKey]?.[value] || value;
    }

    if (typeof value === 'number' && 'precision' in options) {
        value = value.toFixed(options.precision);
    }

    if (value === undefined || value === null || value === '') {
        return "N/A";
    }

    return `${value}${suffix || ''}`.trim();
}

function InfoPopupItem({ icon: Icon, label, value, options = {} }) {
    const textValue = processItemValue(value, options);

    return (
        <tr>
            <th>
                <div className="track-hover-info-popup-label">
                    {Icon ? <Icon width={15} height={15} color="#888" strokeWidth={3} /> : null}
                    {label}
                </div>
            </th>
            <td>{textValue}</td>
        </tr>
    );
}
