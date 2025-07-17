import Track from "./track";
import Vector3 from "../vector3";
import TrackConnection, {TrackConnectionEnd} from "../track-connection";
import SceneryParserLog from "../scenery-parser-log";
import AngleHelper from "../../helpers/angleHelper";
import ShapeBezier from "../shape/shape-bezier";
import ShapeArc from "../shape/shape-arc";

export default class StandardTrack extends Track {
    type = "StandardTrack";

    constructor(id, rot, shape, connections, id_station, id_isolation, prefab_name, maxspeed, derailspeed) {
        super(id, rot, shape, connections, id_station, id_isolation, prefab_name, maxspeed, derailspeed);
    }

    static fromText(text) {
        const values = text.split(";");
        const trackType = values[2];
        switch (trackType) {
            case 'Track':
                return StandardTrack._fromValuesArc(values);
            case 'BTrack':
                return StandardTrack._fromValuesBezier(values);
            default:
                SceneryParserLog.warn('unknownTrackType', `Unknown track type: ${trackType}`);
                return null;
        }
    }

    static _slopesFromText(text) {
        return text.split(",", 2).map((slope) => parseFloat(slope));
    }

    static _fromValuesArc(values) {
        const connections = [];
        if (values[11]) connections.push(new TrackConnection(values[11], TrackConnectionEnd.END));
        if (values[12]) connections.push(new TrackConnection(values[12], TrackConnectionEnd.START));

        const start = Vector3.fromValuesArray(values, 3);
        const rotDeg = Vector3.fromValuesArray(values, 6);
        const length = parseFloat(values[9]);
        const radius = parseFloat(values[10]);
        const [startSlope, endSlope] = StandardTrack._slopesFromText(values[14]);

        const rotRad = AngleHelper.rotationDegToRad(rotDeg);
        const shape = new ShapeArc(rotRad, start, radius, length, startSlope, endSlope);

        return new StandardTrack(
            values[1], // id
            rotDeg,
            shape,
            connections,
            values[13], // id_station
            values[17], // id_isolation
            values[19], // prefab_name
            parseFloat(values[20]) || 0, // maxspeed
            parseFloat(values[21]) || 0 // derailspeed
        );
    }

    static _fromValuesBezier(values) {
        const connections = [];
        if (values[15]) connections.push(new TrackConnection(values[15], TrackConnectionEnd.END));
        if (values[16]) connections.push(new TrackConnection(values[16], TrackConnectionEnd.START));

        const [startSlope, endSlope] = StandardTrack._slopesFromText(values[18]);

        const start = Vector3.fromValuesArray(values, 3);
        const control1 = start.add(Vector3.fromValuesArray(values, 6));
        const end = Vector3.fromValuesArray(values, 9);
        const control2 = end.add(Vector3.fromValuesArray(values, 12));

        const shape = new ShapeBezier(
            start, control1, control2, end,
            startSlope,
            endSlope,
        );

        return new StandardTrack(
            values[1], // id
            Vector3.zero(), // rotation
            shape,
            connections,
            values[17], // id_station
            values[21], // id_isolation
            values[23], // prefab_name
            parseFloat(values[24]) || 0, // maxspeed
            parseFloat(values[25]) || 0 // derailspeed
        );
    }

    applyObject(scenery) {
        super.applyObject(scenery);
    }
}
