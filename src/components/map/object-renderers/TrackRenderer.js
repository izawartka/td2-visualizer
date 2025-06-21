import React, { useContext } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import Constants from "../../../helpers/constants";
import ElectrificationStatus from "../../../model/electrification-status";

export default function TrackRenderer(props) {
  const { object } = props;
  const { trackColorMode } = useContext(SettingsContext);

  return (
    <MemoizedTrackRenderer
      object={object}
      trackColorMode={trackColorMode}
    />
  );
}

const MemoizedTrackRenderer = React.memo(StatelessTrackRenderer);

function StatelessTrackRenderer(props) {
  const { object, trackColorMode } = props;

  const path = getTrackPath(object);
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
      />
    </g>
  );
}

function getTrackPath(object) {
    switch (object.type) {
        case "StandardTrack":
        case "PointTrack": 
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

function getTrackColor(object, trackColorMode) {
  switch (trackColorMode) {
    case "none":
    default:
      return object.prefab_name.includes('trans-mat') ? "#444" : "#aaa";
    case "electrification":
      switch(object.electrificationStatus) {
        case ElectrificationStatus.NOT_CHECKED:
          return "#aa4";
        case ElectrificationStatus.NON_ELECTRIFIED:
          return "#aaa";
        case ElectrificationStatus.ELECTRIFIED:
          return "#aaf";
        case ElectrificationStatus.ERROR:
        default:
          return "#f44";
      }
    case "type":
      switch (object.type) {
        case "StandardTrack":
        default:
          return "#00a";
        case "PointTrack":
          return "#0a0";
        case "BezierTrack":
          return "#aa8";
      }
    case "slope":
      return `url(#track-slope-${object.id})`;
    case "max-speed":
      if(!object.maxspeed || !object.derailspeed) {
        return "#f22";
      }
      return `rgb(128, ${Math.min(255, Math.max(0, object.maxspeed * Constants.map.trackMaxSpeedScale))}, 128)`;
  }
}

function getTrackDefs(object, trackColorMode) {
    if (trackColorMode !== "slope") return null;
    
    const [x1, y1] = object.points.start.toSVGCoords();
    const [x2, y2] = object.points.end.toSVGCoords();
    const gradId = `track-slope-${object.id}`;
    const startColor = getSlopeColor(object.start_slope);
    const endColor = getSlopeColor(object.end_slope);
    
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
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        </defs>
    );
}

function getSlopeColor(slope) {
  const blue = Math.min(255, Math.max(0, 128 + Math.abs(slope * Constants.map.trackSlopeScale)));
  return `rgb(128, 128, ${blue})`;
}