import React, {useEffect, useCallback, useContext} from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import Constants from "../../../helpers/constants";
import {ElectrificationStatus} from "../../../model/electrification-status";
import MiscHelper from "../../../helpers/miscHelper";
import {setHoveredTrack, unsetHoveredTrack} from "../../../services/trackHoverInfoService";
import GradientsContext from "../../../contexts/GradientsContext";
import { TrackShape, TrackSource } from "../../../model/tracks/track";
import {useZoomPanEmitter} from "../../../hooks/useZoomPubSub";
import { mapZoomTrackDetails$ } from "../../../services/mapZoomService";

export default function TrackRenderer(props) {
    const { object } = props;
    const { trackColorMode } = useContext(SettingsContext);
    const { gradientDefs } = useContext(GradientsContext);
    const { alignView } = useZoomPanEmitter();

    const onAlign = () => {
        alignView(object.rot.y);
    };

    return (
        <MemoizedTrackRenderer
            object={object}
            trackColorMode={trackColorMode}
            gradientDef={gradientDefs[trackColorMode] ?? null}
            onAlign={onAlign}
        />
    );
}

const MemoizedTrackRenderer = React.memo(StatelessTrackRenderer);

function StatelessTrackRenderer(props) {
    const {object, trackColorMode, gradientDef, onAlign} = props;
    const unscaledPathRef = React.useRef(null);
    const scaledPathRef = React.useRef(null);

    const onMouseEnter = useCallback(() => {
        setHoveredTrack(object);
    }, [object]);

    const onMouseLeave = useCallback(() => {
        unsetHoveredTrack(null);
    }, []);

    const onClick = useCallback((event) => {
        if (object.shape === TrackShape.STRAIGHT && event.detail === 2) {
            event.preventDefault();
            onAlign(event);
        }
    }, [object, onAlign]);

    const handleDetailsUpdate = useCallback((details) => {
        if (!unscaledPathRef.current || !scaledPathRef.current) return;

        if(details) {
            unscaledPathRef.current.style.display = 'none';
            scaledPathRef.current.style.display = 'block';
        } else {
            unscaledPathRef.current.style.display = 'block';
            scaledPathRef.current.style.display = 'none';
        }
    }, []);

    useEffect(() => {
        const subscription = mapZoomTrackDetails$.subscribe(details => {
            handleDetailsUpdate(details);
        });

        return () => subscription.unsubscribe();
    }, [handleDetailsUpdate]);
    
    if (object.points.start.distanceSq(object.points.end) < 0.001) {
        return null;
    }

    const path = getTrackPath(object);
    const color = getTrackColor(object, trackColorMode, gradientDef);
    const defs = getTrackDefs(object, trackColorMode, gradientDef);

    return (
        <g id={`track-${object.id}`}>
            {defs}
            <path
                ref={unscaledPathRef}
                d={path}
                stroke={color}
                className="track-unscaled"
            />
            <path
                ref={scaledPathRef}
                d={path}
                stroke={color}
                className="track"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}/>
        </g>
    );
}

function getTrackPath(object) {
    switch (object.type) {
        case "StandardTrack":
        case "PointTrack":
        case "RouteTrack":
            const [x1, y1] = object.points.start.toSVGCoords();
            const [x2, y2] = object.points.end.toSVGCoords();
            const ra = Math.abs(object.r);
            if (object.r < 0) {
                return `M${x1},${y1} A${ra} ${ra} 0 0 1 ${x2},${y2}`;
            } else if (object.r > 0) {
                return `M${x2},${y2} A${ra} ${ra} 0 0 1 ${x1},${y1}`;
            } else {
                return `M${x1},${y1} L${x2},${y2}`;
            }
        case "BezierTrack":
            const [bx1, by1] = object.points.start.toSVGCoords();
            const [bcx1, bcy1] = object.points.control1.toSVGCoords();
            const [bx2, by2] = object.points.end.toSVGCoords();
            const [bcx2, bcy2] = object.points.control2.toSVGCoords();
            return `M${bx1},${by1} C${bcx1},${bcy1} ${bcx2},${bcy2} ${bx2},${by2}`;
        default:
            console.warn(`TrackRenderer: Unsupported track type: ${object.type}`);
    }
}

function getGradientValues(object, trackColorMode) {
    switch (trackColorMode) {
        case 'slope':
            return [Math.abs(object.start_slope), Math.abs(object.end_slope)];
        case 'elevation':
            return [object.points.start.y, object.points.end.y];
        default:
            return null;
    }
}

function getTrackColor(object, trackColorMode, gradientDef) {
    const modeDef = Constants.trackColorModes[trackColorMode];

    switch (trackColorMode) {
        case "standard":
        default:
            if (object.hasNoMaterials()) {
                return modeDef.options['invisible'][0];
            }

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
            switch (object.source) {
                case TrackSource.STANDARD:
                    if (object.type === 'BezierTrack') {
                        return modeDef.options['bezier-track'][0];
                    }
                    return modeDef.options['standard-track'][0];
                case TrackSource.SWITCH:
                    return modeDef.options['point-track'][0];
                case TrackSource.ROUTE:
                    return modeDef.options['route-track'][0];
                default:
                    return modeDef.options[modeDef.optionDefault][0];
            }

        case "max-speed":
            if (!object.maxspeed) {
                if (object.type === 'RouteTrack') return modeDef.options['unknown'][0];
                return modeDef.options['derail'][0];
            }
            return MiscHelper.getTrackGradientColor(gradientDef, object.maxspeed);

        case "elevation":
        case "slope":
            const [startValue, endValue] = getGradientValues(object, trackColorMode);
            if (startValue === endValue) return MiscHelper.getTrackGradientColor(gradientDef, startValue);
            return `url(#track-${trackColorMode}-${object.id})`;
    }
}

function getGradientDefs(object, trackColorMode, gradientDef, startValue, endValue) {
    if (startValue === endValue) return null;
    const [x1, y1] = object.points.start.toSVGCoords();
    const [x2, y2] = object.points.end.toSVGCoords();
    const gradId = `track-${trackColorMode}-${object.id}`;
    const startColor = MiscHelper.getTrackGradientColor(gradientDef, startValue);
    const endColor = MiscHelper.getTrackGradientColor(gradientDef, endValue);

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

function getTrackDefs(object, trackColorMode, gradientDef) {
    const gradientVals = getGradientValues(object, trackColorMode);
    if (gradientVals === null) return null;
    const [startValue, endValue] = gradientVals;
    return getGradientDefs(object, trackColorMode, gradientDef, startValue, endValue);
}
