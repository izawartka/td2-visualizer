import React, {useContext} from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import Constants from "../../../helpers/constants";
import {ElectrificationStatus} from "../../../model/electrification-status";
import MiscHelper from "../../../helpers/miscHelper";
import {setHoveredTrack, unsetHoveredTrack} from "../../../services/trackHoverInfoService";

export default function TrackRenderer(props) {
    const {object} = props;
    const {trackColorMode} = useContext(SettingsContext);

    return (
        <MemoizedTrackRenderer
            object={object}
            trackColorMode={trackColorMode}
        />
    );
}

const MemoizedTrackRenderer = React.memo(StatelessTrackRenderer);

function StatelessTrackRenderer(props) {
    const {object, trackColorMode} = props;

    if (object.shape.points.start.distanceSq(object.shape.points.end) < 0.001) {
        return null;
    }

    const onMouseEnter = () => {
        setHoveredTrack(object);
    };

    const onMouseLeave = () => {
        unsetHoveredTrack(null);
    };

    const path = getTrackPath(object.shape);
    const color = getTrackColor(object, trackColorMode);
    const defs = getTrackDefs(object, trackColorMode);

    return (
        <g id={`track-${object.id}`}>
            {defs}
            <path
                d={path}
                stroke={color}
                className="track-unscaled"
            />
            <path
                d={path}
                stroke={color}
                className="track"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </g>
    );
}

function getTrackPath(shape) {
    const [x1, y1] = shape.points.start.toSVGCoords();
    const [x2, y2] = shape.points.end.toSVGCoords();
    switch (shape.type) {
        case 'ShapeArc':
            const ra = Math.abs(shape.radius);
            // TODO: Fix for rotated arcs (this is not trivial)
            // TODO: Use sweep flag instead of switching start and end
            if (shape.radius < 0) {
                return `M${x1},${y1} A${ra} ${ra} 0 0 1 ${x2},${y2}`;
            } else {
                return `M${x2},${y2} A${ra} ${ra} 0 0 1 ${x1},${y1}`;
            }
        case 'ShapeStraight':
            return `M${x1},${y1} L${x2},${y2}`;
        case 'ShapeBezier':
            const [xc1, yc1] = shape.points.control1.toSVGCoords();
            const [xc2, yc2] = shape.points.control2.toSVGCoords();
            return `M${x1},${y1} C${xc1},${yc1} ${xc2},${yc2} ${x2},${y2}`;
        default:
            console.warn(`TrackRenderer: Unsupported track type: ${shape.type}`);
    }
}

function getTrackColor(object, trackColorMode) {
    const modeDef = Constants.trackColorModes[trackColorMode];

    switch (trackColorMode) {
        case "standard":
        default:
            if (object.prefab_name && object.prefab_name.includes('trans-mat'))
                return modeDef.options['invisible'][0];

            return modeDef.options[modeDef.optionDefault][0];

        case "electrification":
            switch (object.electrificationStatus) {
                case ElectrificationStatus.NOT_CHECKED:
                    return modeDef.options['not-checked'][0];
                case ElectrificationStatus.NON_ELECTRIFIED:
                    return modeDef.options['non-electrified'][0];
                case ElectrificationStatus.ELECTRIFIED:
                    return modeDef.options['electrified'][0];
                case ElectrificationStatus.CONFLICT:
                    return modeDef.options['conflict'][0];
                default:
                    return modeDef.options[modeDef.optionDefault][0];
            }

        case "type":
            switch (object.type) {
                case "StandardTrack":
                    switch (object.shape.type) {
                        case "ShapeBezier":
                            return modeDef.options['standard-track-bezier'][0];
                        case "ShapeStraight":
                            return modeDef.options['standard-track-straight'][0];
                        case "ShapeArc":
                        default:
                            return modeDef.options['standard-track-arc'][0];
                    }
                case "SwitchTrack":
                    return modeDef.options['switch-track'][0];
                case "RouteTrack":
                    switch (object.shape.type) {
                        case "ShapeStraight":
                            return modeDef.options['route-track-straight'][0];
                        case "ShapeArc":
                        default:
                            return modeDef.options['route-track-arc'][0];
                    }
                default:
                    return modeDef.options[modeDef.optionDefault][0];
            }
        case "slope":
            // do not use track gradient unless the slope is different on both ends
            if (object.start_slope === object.end_slope) {
                return MiscHelper.getTrackGradient(modeDef.gradient, Math.abs(object.start_slope));
            }

            return `url(#track-slope-${object.id})`;

        case "max-speed":
            if (!object.maxspeed) {
                if (object.type === 'RouteTrack') return modeDef.options['unknown'][0];
                return modeDef.options['derail'][0];
            }
            return MiscHelper.getTrackGradient(modeDef.gradient, object.maxspeed);
    }
}

function getTrackDefs(object, trackColorMode) {
    if (trackColorMode !== "slope") return null;
    if (object.start_slope === object.end_slope) return null;

    const [x1, y1] = object.shape.points.start.toSVGCoords();
    const [x2, y2] = object.shape.points.end.toSVGCoords();
    const gradId = `track-slope-${object.id}`;
    const startColor = MiscHelper.getTrackGradient(Constants.trackColorModes['slope'].gradient, Math.abs(object.start_slope));
    const endColor = MiscHelper.getTrackGradient(Constants.trackColorModes['slope'].gradient, Math.abs(object.end_slope));

    return (
        <defs>
            <linearGradient
                id={gradId}
                gradientUnits="userSpaceOnUse"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
            >
                <stop offset="0%" stopColor={startColor}/>
                <stop offset="100%" stopColor={endColor}/>
            </linearGradient>
        </defs>
    );
}
